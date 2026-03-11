import { useEffect, useState } from 'react'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'blogs', label: 'Blogs' },
]

const experiences = [
  {
    period: '2023 — Present',
    role: 'Staff Software Engineer',
    company: 'CrowdANALYTIX',
    summary:
      'Leading frontend architecture for large-scale Angular applications, driving modern web standards, and mentoring engineers across teams.',
    stack: ['Angular', 'React', 'TypeScript', 'Web Architecture', 'Performance Optimization'],
  },
  {
    period: '2020 — 2023',
    role: 'Lead Frontend Engineer',
    company: 'CrowdANALYTIX',
    summary:
      'Built scalable UI platforms, improved developer productivity with reusable patterns, and delivered cloud-integrated frontend systems.',
    stack: ['JavaScript', 'UI Engineering', 'REST APIs', 'Google Cloud'],
  },
  {
    period: '2017 — 2020',
    role: 'Frontend Engineer',
    company: 'CrowdANALYTIX',
    summary:
      'Developed robust product interfaces with a focus on clean UX, responsive design, and maintainable component architecture.',
    stack: ['Angular', 'Git', 'Cloud Integrations'],
  },
]

const blogPosts = [
  {
    year: '2026',
    title: 'RxJS Subjects in the Angular Signals Era: Obsolete or Still Powerful?',
    excerpt:
      'Sharing some thoughts on how Signals and Subjects might coexist in modern Angular applications.',
    href: 'https://dev.to/mayuri_jha_bc0b497f737276/rxjs-subjects-in-the-angular-signals-era-obsolete-or-still-powerful-2dh',
    image: '/blogs/signals-vs-subject.png',
  },
  {
    year: '2025',
    title: 'Angular Performance Tuning Checklist',
    excerpt:
      'A field-tested checklist for reducing bundle size, improving runtime speed, and making UI interactions smoother.',
    href: '#',
    image: '',
  },
  {
    year: '2024',
    title: 'Mentoring Engineers Through Architecture Reviews',
    excerpt:
      'How structured code reviews and architecture discussions can accelerate engineering maturity.',
    href: '#',
    image: '',
  },
]

function normalizeImagePath(path) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/')) return path
  return `/${path}`
}

const links = {
  github: 'https://github.com/jhaMayuri',
  linkedin: 'https://www.linkedin.com/in/mayurijha/',
  email: 'mailto:mayuri.jha01@gmail.com',
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="section">
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  )
}

function ExperienceCard({ item, delay }) {
  return (
    <article className="content-card lift" style={{ animationDelay: `${delay}ms` }}>
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

function BlogCard({ post, delay }) {
  const [hasImageError, setHasImageError] = useState(false)
  const imageSrc = normalizeImagePath(post.image)

  return (
    <a href={post.href} className="content-card lift block" style={{ animationDelay: `${delay}ms` }}>
      <div className="blog-layout">
        {imageSrc && !hasImageError ? (
          <img
            src={imageSrc}
            alt={post.title}
            className="blog-image"
            loading="lazy"
            onError={() => setHasImageError(true)}
          />
        ) : (
          <div className="blog-image blog-image--placeholder">
            <span className="meta-text">Add blog image</span>
          </div>
        )}

        <div>
          <p className="meta-text">{post.year}</p>
          <h3 className="content-title mt-2">{post.title}</h3>
          <p className="content-body mt-3">{post.excerpt}</p>
        </div>
      </div>
    </a>
  )
}

function SideIntro() {
  return (
    <aside className="intro-column">
      <div>
        <p className="eyebrow">Portfolio</p>
        <h1 className="hero-name">Mayuri Jha</h1>
        <p className="hero-role">Staff Software Engineer</p>
        <p className="hero-summary">
          I build reliable, scalable frontend systems with a strong focus on architecture, performance, and developer experience.
        </p>

        <nav className="intro-nav">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="social-row">
        <a
          href={links.github}
          target="_blank"
          rel="noreferrer"
          className="link-chip"
          aria-label="GitHub"
          title="GitHub"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
            <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.2c-3.34.73-4.04-1.42-4.04-1.42-.55-1.37-1.33-1.73-1.33-1.73-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.2 1.84 1.2 1.08 1.8 2.83 1.28 3.52.97.11-.76.42-1.28.77-1.58-2.66-.3-5.46-1.3-5.46-5.8 0-1.29.47-2.34 1.23-3.16-.12-.3-.53-1.52.12-3.17 0 0 1.01-.32 3.3 1.2a11.7 11.7 0 0 1 6 0c2.29-1.52 3.3-1.2 3.3-1.2.65 1.65.24 2.87.12 3.17.77.82 1.23 1.87 1.23 3.16 0 4.5-2.8 5.5-5.47 5.8.43.37.81 1.1.81 2.23v3.3c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
          </svg>
        </a>
        <a
          href={links.linkedin}
          target="_blank"
          rel="noreferrer"
          className="link-chip"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
            <path d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46a2.48 2.48 0 0 0-.02-4.96ZM3 9.75h4v11.25H3V9.75Zm7.5 0h3.83v1.54h.05c.53-1 1.83-2.04 3.77-2.04 4.03 0 4.78 2.56 4.78 5.9V21h-4v-5.1c0-1.22-.03-2.8-1.75-2.8-1.75 0-2.01 1.31-2.01 2.7V21h-4V9.75Z" />
          </svg>
        </a>
        <a href={links.email} className="link-chip" aria-label="Email" title="Email">
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
            <path d="M3 6.75A2.75 2.75 0 0 1 5.75 4h12.5A2.75 2.75 0 0 1 21 6.75v10.5A2.75 2.75 0 0 1 18.25 20H5.75A2.75 2.75 0 0 1 3 17.25V6.75Zm2.32-.25 6.2 5.05c.28.23.68.23.96 0l6.2-5.05H5.32Zm13.18 2.57-5.1 4.15a2.25 2.25 0 0 1-2.8 0L5.5 9.07v8.18c0 .14.11.25.25.25h12.5c.14 0 .25-.11.25-.25V9.07Z" />
          </svg>
        </a>
      </div>
    </aside>
  )
}

export default function App() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="app-shell">
      <div className="gradient-orb gradient-orb--left" style={{ transform: `translateY(${scrollY * 0.18}px)` }} />
      <div className="gradient-orb gradient-orb--right" style={{ transform: `translateY(${scrollY * -0.12}px)` }} />

      <div className="layout-grid">
        <SideIntro />

        <main>
          <Section id="about" title="About">
            <div className="content-card">
              <p className="content-body content-body--strong">
                Experienced frontend engineer specializing in Angular, modern web architecture, and scalable frontend systems.
              </p>
              <p className="content-body mt-5">
                I focus on building performant, maintainable UI systems and creating engineering environments where teams can ship with confidence.
              </p>
              <p className="content-body mt-5">
              Beyond core product work, I enjoy mentoring young learners and supporting their growth through practical guidance and learning sessions.
              </p>
            </div>
          </Section>

          <Section id="experience" title="Experience">
            <div className="space-y-5">
              {experiences.map((item, idx) => (
                <ExperienceCard key={`${item.role}-${item.period}`} item={item} delay={idx * 90} />
              ))}
            </div>
          </Section>

          <Section id="blogs" title="Blogs">
            <div className="space-y-5">
              {blogPosts.map((post, idx) => (
                <BlogCard key={post.title} post={post} delay={idx * 100} />
              ))}
            </div>
          </Section>

          <footer className="site-footer">
            <p>© {new Date().getFullYear()} Mayuri Jha</p>
            <p className="mt-2">Built with React, Vite, and Tailwind CSS.</p>
          </footer>
        </main>
      </div>
    </div>
  )
}
