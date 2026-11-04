import { useRef, useState } from 'react';
import { ImagePlus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BLOG_MEDIA_BUCKET, validateBlogMedia, mediaMarkdown } from '@/lib/blog-media';

export function BlogMediaUpload({ disabled, onInsert, onBusyChange }: {
  disabled: boolean; onInsert: (markdown: string) => void; onBusyChange: (busy: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState('');
  const [caption, setCaption] = useState('');
  const [preview, setPreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const picker = useRef<HTMLInputElement>(null);
  function close() {
    if (uploading) return;
    setOpen(false); setFile(null); setAlt(''); setCaption('');
    setPreview('');
    if (picker.current) picker.current.value = '';
  }
  function choose(next: File | undefined) {
    if (!next) return;
    try {
      validateBlogMedia(next);
      setFile(next); setAlt(next.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '));
      const reader = new FileReader();
      reader.onload = () => { if (typeof reader.result === 'string') setPreview(reader.result); };
      reader.readAsDataURL(next);
    } catch (error) { toast.error(error instanceof Error ? error.message : 'Could not open image.'); }
  }
  async function upload() {
    if (!file || !alt.trim()) return;
    setUploading(true); onBusyChange(true);
    let path: string | undefined;
    try {
      const extension = validateBlogMedia(file);
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error('Sign in before uploading.');
      path = `${user.id}/${crypto.randomUUID()}.${extension}`;
      const { error } = await supabase.storage.from(BLOG_MEDIA_BUCKET).upload(path, file, { contentType: file.type, upsert: false });
      if (error) throw error;
      onInsert(mediaMarkdown(path, alt, caption));
      setOpen(false); setFile(null); setPreview(''); setAlt(''); setCaption('');
      if (picker.current) picker.current.value = '';
      toast.success('Image inserted into your article.');
    } catch (error) { toast.error(error instanceof Error ? error.message : 'Could not upload image.'); }
    finally { setUploading(false); onBusyChange(false); }
  }
  return <>
    <Button type="button" size="sm" variant="outline" disabled={disabled} onClick={() => setOpen(true)}><ImagePlus />Add media</Button>
    <Dialog open={open} onOpenChange={value => { if (!value) close(); else setOpen(true); }}>
      <DialogContent className="max-w-lg max-h-[90dvh] overflow-y-auto" aria-describedby={undefined}>
        <DialogHeader><DialogTitle>Add image, GIF or infographic</DialogTitle></DialogHeader>
        <div className="space-y-5">
          <div className="space-y-2"><Label htmlFor="blog-image-file">Image file</Label><Input ref={picker} id="blog-image-file" type="file" accept="image/jpeg,image/png,image/gif,image/webp" disabled={uploading} onChange={e => choose(e.target.files?.[0])} /></div>
          {preview && <img src={preview} alt="Selected media preview" className="w-full max-h-56 object-contain bg-muted rounded-md" />}
          <div className="space-y-2"><Label htmlFor="image-alt">Image description</Label><Input id="image-alt" value={alt} onChange={e => setAlt(e.target.value)} maxLength={300} disabled={uploading} /></div>
          <div className="space-y-2"><Label htmlFor="image-caption">Caption (optional)</Label><Input id="image-caption" value={caption} onChange={e => setCaption(e.target.value)} maxLength={300} disabled={uploading} /></div>
          <div className="flex justify-end gap-2"><Button variant="outline" disabled={uploading} onClick={close}>Cancel</Button><Button disabled={!file || !alt.trim() || uploading} onClick={upload}>{uploading ? <Loader2 className="animate-spin" /> : <ImagePlus />}{uploading ? 'Uploading…' : 'Insert image'}</Button></div>
        </div>
      </DialogContent>
    </Dialog>
  </>;
}