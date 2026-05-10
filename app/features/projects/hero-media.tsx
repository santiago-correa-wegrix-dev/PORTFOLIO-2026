import type { Project } from "~/data/projects";

export function HeroMedia({ project }: { project: Project }) {
  if (project.imageUrl) {
    return (
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-full object-cover"
        decoding="async"
        fetchPriority="high"
      />
    );
  }

  if (project.comingSoon) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-card">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
          Under Construction
        </span>
        <div className="flex gap-1.5">
          {Array.from({ length: 8 }).map((_item, idx) => (
            <div key={idx} className="w-8 h-1.5 rounded-full bg-foreground/10" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full flex items-center justify-center text-4xl md:text-6xl font-display font-bold tracking-tighter opacity-40"
      style={{ backgroundColor: project.imageColor }}
    >
      {project.title}
    </div>
  );
}
