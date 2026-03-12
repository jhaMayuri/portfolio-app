export default function ExperienceCard({ item, delay }) {
  return (
    <article className="content-card experience-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="experience-grid">
        <p className="meta-text">{item.period}</p>
        <div>
          <h3 className="content-title">
            {item.role} <span className="content-subtitle">· {item.company}</span>
          </h3>
          <p className="content-body mt-3">{item.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.stack.map((tech) => (
              <span key={tech} className="tag-chip">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
