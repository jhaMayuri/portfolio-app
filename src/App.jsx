import { useEffect, useState } from 'react'
import BlogCard from './components/BlogCard'
import ExperienceCard from './components/ExperienceCard'

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

const iconPaths = {
  github: '/icons/github.svg',
  linkedin: '/icons/linkedin.svg',
  email: '/icons/email.svg',
  sun: '/icons/sun.svg',
  moon: '/icons/moon.svg',
}

const profilePhoto = ''

function Section({ id, title, children }) {
  return (
    <section id={id} className="section">
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  )
}

function ThemeToggle({ theme, onToggleTheme }) {
  return (
    <button type="button" className="theme-toggle page-theme-toggle" onClick={onToggleTheme}>
      <img
        src={theme === 'dark' ? iconPaths.sun : iconPaths.moon}
        alt=""
        className="theme-icon"
        aria-hidden="true"
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

function SideIntro({ activeSection }) {
  const profileImageSrc = normalizeImagePath(profilePhoto)

  return (
    <aside className="intro-column">
      <div>
        <div className="profile-frame mb-6">
          {profileImageSrc ? (
            <img src={profileImageSrc} alt="Mayuri Jha" className="profile-image" />
          ) : (
            <span className="profile-fallback">MJ</span>
          )}
        </div>

        <h1 className="hero-name">Mayuri Jha</h1>
        <p className="hero-role">Staff Software Engineer</p>
        <p className="hero-location">Based in India 🇮🇳</p>
        <p className="hero-summary">
          I build reliable, scalable frontend systems with a strong focus on architecture, performance, and developer experience.
        </p>

        <nav className="intro-nav">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${activeSection === item.id ? 'nav-link-active' : ''}`}
            >
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
          <img src={iconPaths.github} alt="" className="social-icon" aria-hidden="true" />
        </a>
        <a
          href={links.linkedin}
          target="_blank"
          rel="noreferrer"
          className="link-chip"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <img src={iconPaths.linkedin} alt="" className="social-icon" aria-hidden="true" />
        </a>
        <a href={links.email} className="link-chip" aria-label="Email" title="Email">
          <img src={iconPaths.email} alt="" className="social-icon" aria-hidden="true" />
        </a>
      </div>
    </aside>
  )
}

export default function App() {
  const [scrollY, setScrollY] = useState(0)
  const [theme, setTheme] = useState('dark')
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('portfolio-theme')
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sectionEls = navItems
      .map((item) => document.getElementById(item.id))
      .filter((element) => element !== null)

    if (!sectionEls.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      { threshold: [0.3, 0.5, 0.7], rootMargin: '-15% 0px -45% 0px' },
    )

    sectionEls.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      window.localStorage.setItem('portfolio-theme', next)
      return next
    })
  }

  return (
    <div className={`app-shell ${theme === 'light' ? 'theme-light' : ''}`}>
      <ThemeToggle theme={theme} onToggleTheme={toggleTheme} />
      <div className="gradient-orb gradient-orb--left" style={{ transform: `translateY(${scrollY * 0.18}px)` }} />
      <div className="gradient-orb gradient-orb--right" style={{ transform: `translateY(${scrollY * -0.12}px)` }} />

      <div className="layout-grid">
        <SideIntro activeSection={activeSection} />

        <main>
          <Section id="about" title="About">
            <div className="content-card">
              <p className="content-body content-body--strong">
              Frontend engineer specializing in Angular architecture,
              performance optimization, and scalable UI systems.
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
