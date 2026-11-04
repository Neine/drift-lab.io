import { useEffect, useState } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';
import '@lovable.dev/cloud-auth-js/styles.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { blogHead } from '@/lib/blog';

export const Route = createFileRoute('/auth')({ head: () => blogHead('Blog editor sign-in', 'Private article publishing for Neine Arora.', true), component: AuthPage });
function AuthPage() {
  const navigate = useNavigate();
  const goNext = () => { const back = sessionStorage.getItem('auth-return'); sessionStorage.removeItem('auth-return'); if (back && back.startsWith('/') && !back.startsWith('//')) { window.location.assign(back); return Promise.resolve(); } return navigate({ to: '/blog-editor' }); };
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot' | 'reset'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (window.location.hash.includes('type=recovery')) { setMode('reset'); return; }
    void supabase.auth.getUser().then(({ data }) => { if (data.user) void goNext(); });
  }, [navigate]);
  async function social(provider: 'google' | 'lovable') {
    setBusy(true); setMessage('');
    try {
      const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: `${window.location.origin}/auth` });
      if (result.error) throw result.error;
      if (!result.redirected) await goNext();
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Sign-in failed.'); }
    finally { setBusy(false); }
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setMessage('');
    try {
      if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth` });
        if (error) throw error;
        setMessage('Check your email for a password reset link.');
      } else if (mode === 'reset') {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        await goNext();
      } else if (mode === 'signup') {
        const { error, data } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth` } });
        if (error) throw error;
        if (data.session) await goNext();
        else setMessage('Check your email to confirm your account.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await goNext();
      }
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Sign-in failed.'); }
    finally { setBusy(false); }
  }
  return <main className="min-h-screen px-6 py-12 bg-background text-foreground">
    <div className="max-w-sm mx-auto">
      <Button asChild variant="link" className="px-0 mb-12"><Link to="/">← Notes & Insights</Link></Button>
      <p className="text-gold text-xs uppercase mb-3">Neine Arora / Journal</p>
      <h1 className="text-3xl mb-8">{mode === 'signup' ? 'Create an account' : mode === 'forgot' ? 'Reset password' : mode === 'reset' ? 'New password' : 'Editor sign-in'}</h1>
      {(mode === 'signin' || mode === 'signup') && <div className="space-y-3 mb-6">
        <Button className="w-full" variant="outline" disabled={busy} onClick={() => social('google')}>Continue with Google</Button>
        <Button className="lovable-auth-button w-full" disabled={busy} onClick={() => social('lovable')}>Continue with Lovable</Button>
        <div className="text-muted-foreground text-xs text-center pt-3">or with email</div>
      </div>}
      <form onSubmit={submit} className="space-y-5">
        {mode !== 'reset' && <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required /></div>}
        {mode !== 'forgot' && <div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" type="password" minLength={8} autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} value={password} onChange={e => setPassword(e.target.value)} required /></div>}
        {message && <p role="status" className="text-sm text-gold-soft">{message}</p>}
        <Button type="submit" disabled={busy} className="w-full">{busy ? 'Please wait…' : mode === 'signup' ? 'Create account' : mode === 'forgot' ? 'Send reset link' : mode === 'reset' ? 'Save password' : 'Sign in'}</Button>
      </form>
      {mode !== 'reset' && <div className="flex flex-wrap justify-between mt-5 gap-2"><Button variant="link" className="px-0" onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setMessage(''); }}>{mode === 'signin' ? 'Create account' : 'Back to sign-in'}</Button>{mode === 'signin' && <Button variant="link" className="px-0" onClick={() => setMode('forgot')}>Forgot password?</Button>}</div>}
    </div>
  </main>;
}