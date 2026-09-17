import type { PortfolioData } from "@/data/portfolio";

type ProjectPanelProps = {
  project: PortfolioData["projects"][number] | null | undefined;
  open: boolean;
  onClose: () => void;
};

export default function ProjectPanel({ project, open, onClose }: ProjectPanelProps) {
  return (
    <>
      <aside
        className={`project-panel${open ? " is-open" : ""}`}
        id="project-panel"
        aria-hidden={!open}
        aria-labelledby="panel-title"
      >
        <button type="button" className="panel-close" id="panel-close" aria-label="Close" onClick={onClose}>
          ×
        </button>
        <div className="panel-inner" id="panel-inner">
          {project ? (
            <>
              <img className="panel-hero" src={project.image} alt={project.title} />
              <p className="panel-meta">{project.category} · {project.duration}</p>
              <h2 id="panel-title">{project.title}</h2>
              {project.role ? <p className="panel-role">{project.role}</p> : null}
              {project.paragraphs.map((para) => (
                <p key={para.slice(0, 20)}>{para}</p>
              ))}
              {project.metrics?.length ? (
                <ul className="panel-metrics">
                  {project.metrics.map((m) => (
                    <li key={m.label}>
                      <strong>{m.value}</strong>
                      <span>{m.label}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </>
          ) : null}
        </div>
      </aside>
      <div
        className="panel-backdrop"
        id="panel-backdrop"
        hidden={!open}
        onClick={onClose}
        aria-hidden={!open}
      />
    </>
  );
}
