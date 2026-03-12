export default function ExperienceCard({ item, delay }) {
  return (
    <article className="content-card experience-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="experience-grid">
        <p className="meta-text">{item.period}</p>
        <div>
          <h3 className="content-title">
            {item.role}{' '}
            <a
              href={item.companyUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="content-subtitle company-link"
            >
              · {item.company} <span aria-hidden="true">↗</span>
            </a>
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
