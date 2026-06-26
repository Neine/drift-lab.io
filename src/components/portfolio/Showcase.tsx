94c94
< function ProjectCard({
---
> function ProjectRow({
101,102c101,106
<   const inner = (
<     <article className="group h-full bg-card/60 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-gold/50 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold/5 flex flex-col">
---
>   const rowContent = (
>     <>
>       <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] md:w-44 shrink-0">
>         <span className="text-gold/80">{p.category}</span>
>       </div>
> 
105c109
<           className="relative w-full h-40 rounded-md mb-4 border border-border overflow-hidden cursor-zoom-in"
---
>           className="relative w-full md:w-28 h-20 rounded-md border border-border overflow-hidden cursor-zoom-in shrink-0"
118c122
<             <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
---
>             <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
122,132c126,147
<       <p className="text-xs uppercase tracking-[0.2em] text-gold/80 mb-3">
<         {p.category}
<       </p>
<       <h3 className="font-display text-2xl mb-3 group-hover:text-gold transition-colors">
<         {p.title}
<       </h3>
<       <p className="text-foreground/70 leading-relaxed mb-5 flex-1">
<         {p.desc}
<       </p>
<       <div className="border-t border-border pt-4 mb-4">
<         <p className="text-sm">
---
> 
>       <div className="flex-1">
>         <h3 className="font-display text-lg leading-snug mb-1 group-hover:text-gold transition-colors">
>           {p.title}
>         </h3>
>         <p className="text-sm text-foreground/60 leading-relaxed line-clamp-3 max-w-2xl mb-2">
>           {p.desc}
>         </p>
>         <div className="flex flex-wrap gap-2">
>           {p.tags.map((t) => (
>             <span
>               key={t}
>               className="text-[10px] px-2 py-0.5 rounded-sm bg-gold/10 text-gold border border-gold/20"
>             >
>               {t}
>             </span>
>           ))}
>         </div>
>       </div>
> 
>       <div className="flex flex-col items-start md:items-end gap-2 md:w-44 shrink-0">
>         <p className="text-xs text-right">
136,143c151,153
<       </div>
<       <div className="flex flex-wrap gap-2">
<         {p.tags.map((t) => (
<           <span
<             key={t}
<             className="text-xs px-3 py-1 rounded-sm bg-gold/10 text-gold border border-gold/20"
<           >
<             {t}
---
>         {p.href && (
>           <span className="text-[10px] uppercase tracking-[0.15em] text-gold/80 group-hover:text-gold group-hover:translate-x-0.5 transition-all">
>             View on GitHub →
145c155
<         ))}
---
>         )}
147,152c157
<       {p.href && (
<         <span className="mt-4 text-xs uppercase tracking-[0.2em] text-gold/80 group-hover:text-gold transition-colors">
<           View on GitHub →
<         </span>
<       )}
<     </article>
---
>     </>
154a160,162
>   const rowClasses =
>     "group flex flex-col md:flex-row md:items-center gap-3 md:gap-6 py-5 hover:bg-card/40 transition-all px-2 -mx-2 rounded-md";
> 
161c169
<         className="block h-full"
---
>         className={`${rowClasses} cursor-pointer`}
163c171
<         {inner}
---
>         {rowContent}
167c175
<   return inner;
---
>   return <div className={rowClasses}>{rowContent}</div>;
216c224
<           <h3 className="font-display text-2xl md:text-3xl mb-6">
---
>           <h3 className="font-display text-2xl md:text-3xl mb-4">
220c228
<         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
---
>         <div className="flex flex-col divide-y divide-border mb-16">
222,223c230,231
<             <Reveal key={p.title} delay={i * 0.05}>
<               <ProjectCard
---
>             <Reveal key={p.title} delay={i * 0.04}>
>               <ProjectRow
238c246
<           <h3 className="font-display text-2xl md:text-3xl mb-6">
---
>           <h3 className="font-display text-2xl md:text-3xl mb-4">
242c250
<         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
---
>         <div className="flex flex-col divide-y divide-border">
244,245c252,253
<             <Reveal key={p.title} delay={i * 0.05}>
<               <ProjectCard p={p} />
---
>             <Reveal key={p.title} delay={i * 0.04}>
>               <ProjectRow p={p} />
