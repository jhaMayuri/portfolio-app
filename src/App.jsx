import { useEffect, useRef, useState } from 'react'
import BlogCard from './components/BlogCard'
import ExperienceCard from './components/ExperienceCard'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'writing', label: 'Writing' },
]

const experiences = [
  {
    period: '2024 — Present',
    role: 'Staff Software Engineer',
    company: 'dataX',
    companyUrl: 'https://dataX.ai',
    summary:
      'Leading frontend architecture for large-scale Angular applications, driving modern web standards, and mentoring engineers across teams.',
    stack: ['Angular', 'React', 'TypeScript', 'Web Architecture', 'Performance Optimization'],
  },
  {
    period: '2022 — 2024',
    role: 'Lead Software Engineer',
    company: 'dataX',
    companyUrl: 'https://dataX.ai',
    summary:
      'Built scalable UI platforms, improved developer productivity with reusable patterns, and delivered cloud-integrated frontend systems.',
    stack: ['JavaScript', 'UI Engineering', 'REST APIs', 'Google Cloud'],
  },
  {
    period: '2020 — 2022',
    role: 'Senior Software Engineer',
    company: 'dataX',
    companyUrl: 'https://dataX.ai',
    summary:
      'Developed robust product interfaces with a focus on clean UX, responsive design, and maintainable component architecture.',
    stack: ['Angular', 'Git', 'Cloud Integrations'],
  },
  {
    period: '2017 — 2020',
    role: 'Software Engineer',
    company: 'dataX',
    companyUrl: 'https://dataX.ai',
    summary:
      'Delivered enterprise web features, collaborated with cross-functional teams, and strengthened frontend engineering quality across releases.',
    stack: ['JavaScript', 'REST APIs', 'Git'],
  },
  {
    period: '2016 — 2017',
    role: 'Programmer Analyst',
    company: 'Cognizant Technology Solutions',
    companyUrl: 'https://www.cognizant.com',
    summary:
      'Started engineering journey by building production UI modules, improving reliability, and supporting client-facing web solutions.',
    stack: ['Web Architecture', 'UI Engineering', 'Performance Optimization'],
  },
]

const blogPosts = [
  {
    title: 'RxJS Subjects in the Angular Signals Era: Obsolete or Still Powerful?',
    excerpt:
      'Sharing some thoughts on how Signals and Subjects might coexist in modern Angular applications.',
    href: 'https://dev.to/mayuri_jha_bc0b497f737276/rxjs-subjects-in-the-angular-signals-era-obsolete-or-still-powerful-2dh',
    image: '/blogs/signals-vs-subject.png',
  },
  {
    title: 'Are We Over-Engineering Frontend Applications?',
    excerpt:
      'A reflection on the balance between robust architecture and simplicity in frontend development.',
    href: 'https://dev.to/mayuri_jha_bc0b497f737276/are-we-over-engineering-frontend-applications-3dmi',
    image: '/blogs/over-engineering.png',
  },
  {
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

function Section({ id, title, children, isActive }) {
  return (
    <section id={id} className={`section ${isActive ? 'section-active' : ''}`}>
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
  const mainRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)
  const [theme, setTheme] = useState('dark')
  const [activeSection, setActiveSection] = useState('about')
  const [showAllExperience, setShowAllExperience] = useState(false)

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('portfolio-theme')
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme)
    }
  }, [])

  useEffect(() => {
    const updateScrollY = () => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches
      const next = isDesktop && mainRef.current ? mainRef.current.scrollTop : window.scrollY
      setScrollY(next)
    }

    const mainEl = mainRef.current
    updateScrollY()

    window.addEventListener('scroll', updateScrollY, { passive: true })
    window.addEventListener('resize', updateScrollY)
    if (mainEl) mainEl.addEventListener('scroll', updateScrollY, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateScrollY)
      window.removeEventListener('resize', updateScrollY)
      if (mainEl) mainEl.removeEventListener('scroll', updateScrollY)
    }
  }, [])

  useEffect(() => {
    const updateActiveSection = () => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches
      const mainEl = mainRef.current
      const scrollPos = isDesktop && mainEl ? mainEl.scrollTop : window.scrollY
      const threshold = isDesktop ? 170 : 190

      let currentId = navItems[0].id

      navItems.forEach(({ id }) => {
        const section = document.getElementById(id)
        if (!section) return

        const sectionTop = isDesktop && mainEl
          ? section.offsetTop
          : section.getBoundingClientRect().top + window.scrollY

        if (scrollPos + threshold >= sectionTop) {
          currentId = id
        }
      })

      setActiveSection(currentId)
    }

    const mainEl = mainRef.current
    updateActiveSection()

    if (mainEl) mainEl.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      if (mainEl) mainEl.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [showAllExperience])

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      window.localStorage.setItem('portfolio-theme', next)
      return next
    })
  }

  const visibleExperiences = showAllExperience ? experiences : experiences.slice(0, 3)

  return (
    <div className={`app-shell ${theme === 'light' ? 'theme-light' : ''}`}>
      <ThemeToggle theme={theme} onToggleTheme={toggleTheme} />
      <div className="gradient-orb gradient-orb--left" style={{ transform: `translateY(${scrollY * 0.18}px)` }} />
      <div className="gradient-orb gradient-orb--right" style={{ transform: `translateY(${scrollY * -0.12}px)` }} />

      <div className="layout-grid">
        <SideIntro activeSection={activeSection} />

        <main ref={mainRef} className="main-column">
          <Section id="about" title="About" isActive={activeSection === 'about'}>
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

          <Section id="experience" title="Experience" isActive={activeSection === 'experience'}>
            <div className="space-y-5">
              {visibleExperiences.map((item, idx) => (
                <ExperienceCard key={`${item.role}-${item.period}`} item={item} delay={idx * 90} />
              ))}
            </div>
            {experiences.length > 3 ? (
              <button
                type="button"
                className="view-more-btn mt-5"
                onClick={() => setShowAllExperience((prev) => !prev)}
              >
                {showAllExperience ? 'View less' : 'View more'}
              </button>
            ) : null}
          </Section>

          <Section id="writing" title="Writing" isActive={activeSection === 'writing'}>
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
