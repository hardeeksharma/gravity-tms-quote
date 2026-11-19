import { useEffect, useState } from 'react'
import Intro from './Intro.jsx'
import ScrollTruck from './ScrollTruck.jsx'
import Logo from './Logo.jsx'
import {
  project, stats, modules, integrations, months, stack,
  approach, assumptions, commitment, phases, pricing,
} from './data.js'

const TOTAL = months.length
const price = new Intl.NumberFormat('en-IN', { style: 'currency', currency: pricing.currency, maximumFractionDigits: 0 }).format(pricing.amount)
const phaseKey = (name) => (name === 'Development' ? 'dev' : 'test')

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'scope', label: 'Scope' },
  { id: 'stack', label: 'Tech Stack' },
  { id: 'approach', label: 'Approach' },
  { id: 'investment', label: 'Investment' },
  { id: 'assumptions', label: 'Assumptions' },
]

function useActiveSection() {
  const [active, setActive] = useState(SECTIONS[0].id)
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])
  return active
}

/* ---------- small pieces ---------- */
function Check() {
  return (
    <svg className="check" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function Chevron({ open }) {
  return (
    <svg className={`chev ${open ? 'open' : ''}`} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function SectionHead({ eyebrow, title, children }) {
  return (
    <div className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {children && <p className="lede">{children}</p>}
    </div>
  )
}

/* ---------- nav ---------- */
function Nav() {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#overview" className="brand" onClick={() => setOpen(false)}>
          <Logo height={32} />
          <span className="brand-text">TMS Proposal</span>
        </a>
        <nav className={`nav-links ${open ? 'show' : ''}`}>
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'active' : ''} onClick={() => setOpen(false)}>
              {s.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="btn ghost small" onClick={() => window.print()}>Print / PDF</button>
          <button className="menu-btn" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}

/* ---------- hero ---------- */
function Hero() {
  return (
    <section id="overview" className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="pill">Project Proposal</span>
          <h1>{project.title}</h1>
          <p className="hero-sub">{project.subtitle}</p>
          <p className="hero-text">{project.objective}</p>
          <p className="hero-text muted">{project.scope}</p>
          <div className="hero-cta">
            <a className="btn primary" href="#timeline">Explore the plan</a>
            <a className="btn ghost-light" href="#scope">What's included</a>
          </div>
        </div>
        <aside className="kickoff-card">
          <div className="kc-label">Plan at a glance</div>
          <div className="kc-golive">
            <span>Production go-live</span>
            <strong>End of Month {TOTAL}</strong>
          </div>
          <a href="#investment" className="kc-price">
            <span>{pricing.label}</span>
            <strong>{price}</strong>
          </a>
          <ol className="kc-steps">
            {months.map((m) => (
              <li key={m.n} className={phaseKey(m.phase)}>
                <span className="kc-dot">{m.n}</span>
                <span className="kc-name">{m.short}</span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
      <div className="stats">
        {stats.map((s) => (
          <div key={s.label} className="stat">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------- timeline ---------- */
function Timeline({ selected, setSelected }) {
  const month = months[selected - 1]
  const [openGroups, setOpenGroups] = useState({})

  useEffect(() => {
    // Open every group whenever the month changes.
    const all = {}
    month.groups.forEach((g) => (all[g.name] = true))
    setOpenGroups(all)
  }, [selected])

  const total = month.groups.reduce((a, g) => a + g.items.length, 0)
  return (
    <section id="timeline" className="section">
      <SectionHead eyebrow="Delivery plan" title="Six months, two phases">
        Four months of development followed by two months of testing and fixes. Pick a month to see its
        activities and milestone.
      </SectionHead>

      <div className="phases" role="tablist">
        {phases.map((ph) => {
          const first = ph.months[0]
          const last = ph.months[ph.months.length - 1]
          return (
            <div key={ph.name} className={`phase ${phaseKey(ph.name)}`} style={{ flexGrow: ph.months.length }}>
              <div className="phase-head">
                <span className="phase-name">{ph.name}</span>
                <span className="phase-meta">
                  {ph.months.length} months · Months {first}–{last}
                </span>
              </div>
              <div className="track" style={{ '--cols': ph.months.length }}>
        {months.filter((m) => m.phase === ph.name).map((m) => {
          const isActive = m.n === selected
          const isDone = m.n < selected
          return (
            <button
              key={m.n}
              role="tab"
              aria-selected={isActive}
              className={`track-step ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
              onClick={() => setSelected(m.n)}
            >
              <span className="ts-bar" />
              <span className="ts-month">Month {m.n}</span>
              <span className="ts-title">{m.short}</span>
            </button>
          )
        })}
              </div>
            </div>
          )
        })}
      </div>

        <div className="panel" key={selected}>
          <div className="panel-head">
            <div>
              <span className="eyebrow">Month {month.n} <span className={`phase-tag ${phaseKey(month.phase)}`}>{month.phase}</span></span>
              <h3>{month.title}</h3>
              <p className="objective"><strong>Objective:</strong> {month.objective}</p>
            </div>
            <div className="panel-meta">
              <span className="count">{total}</span>
              <span>activities</span>
            </div>
          </div>

          <div className={`groups ${month.groups.length > 1 ? 'multi' : ''}`}>
            {month.groups.map((g) => {
              const isOpen = !!openGroups[g.name]
              return (
                <div key={g.name} className={`group ${isOpen ? 'open' : ''} ${g.devops ? 'devops' : ''}`}>
                  <button
                    className="group-head"
                    aria-expanded={isOpen}
                    onClick={() => setOpenGroups((o) => ({ ...o, [g.name]: !o[g.name] }))}
                  >
                    <span>{g.name}{g.devops && <span className="devops-badge">DevOps · AWS</span>}</span>
                    <span className="group-count">{g.items.length}</span>
                    <Chevron open={isOpen} />
                  </button>
                  {isOpen && (
                    <ul className={`items ${g.items.length >= 8 ? 'two-col' : ''}`}>
                      {g.items.map((it) => (
                        <li key={it}><Check />{it}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </div>

          <div className="milestone">
            <span className="flag" aria-hidden="true">
              <svg viewBox="0 0 20 20"><path d="M5 18V3m0 1h9l-2 3.5L14 11H5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" /></svg>
            </span>
            <div>
              <span className="ms-label">Milestone · end of Month {month.n}</span>
              <p>{month.milestone}</p>
            </div>
          </div>

          <div className="panel-nav">
            <button className="btn ghost small" disabled={selected === 1} onClick={() => setSelected(selected - 1)}>← Previous month</button>
            <button className="btn ghost small" disabled={selected === TOTAL} onClick={() => setSelected(selected + 1)}>Next month →</button>
          </div>
        </div>

      <div className="summary">
        <h3>Timeline summary</h3>
        <div className="summary-table">
          {months.map((m) => (
            <button key={m.n} className={`summary-row ${m.n === selected ? 'active' : ''}`} onClick={() => setSelected(m.n)}>
              <span className="sr-month">Month {m.n}<span className={`sr-phase ${phaseKey(m.phase)}`}>{m.phase}</span></span>
              <span className="sr-del">{m.deliverable}</span>
            </button>
          ))}
        </div>
        <p className="muted small-text">Total estimated duration: <strong>6 months</strong> (4 months development + 2 months testing and fixes).</p>
      </div>
    </section>
  )
}

/* ---------- scope ---------- */
function Scope({ onPickMonth }) {
  const [hover, setHover] = useState(null)
  return (
    <section id="scope" className="section alt">
      <SectionHead eyebrow="Scope" title="What the system covers">
        Six business modules and two integrations. Select a module to jump to the month it is built.
      </SectionHead>

      <div className="modules">
        {modules.map((m) => (
          <button
            key={m.name}
            className={`module ${hover && hover !== m.month ? 'dim' : ''}`}
            onMouseEnter={() => setHover(m.month)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(m.month)}
            onBlur={() => setHover(null)}
            onClick={() => onPickMonth(m.month)}
          >
            <span className="module-month">Month {m.month}</span>
            <h4>{m.name}</h4>
            <p>{m.desc}</p>
            <span className="module-link">View in timeline →</span>
          </button>
        ))}
      </div>

      <div className="integrations">
        {integrations.map((i) => (
          <div key={i.name} className="integration">
            <span className="int-badge">Integration</span>
            <h4>{i.name}</h4>
            <p>{i.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------- stack ---------- */
function Stack() {
  return (
    <section id="stack" className="section">
      <SectionHead eyebrow="Technology" title="Technology stack">
        A modern, typed JavaScript stack on managed cloud infrastructure.
      </SectionHead>
      <div className="stack">
        {stack.map((s) => (
          <div key={s.layer} className="stack-item">
            <span className="stack-layer">{s.layer}</span>
            <span className="stack-tech">{s.tech}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------- approach ---------- */
function Approach() {
  return (
    <section id="approach" className="section alt">
      <SectionHead eyebrow="How we work" title="Development & delivery approach" />
      <div className="approach">
        {approach.map((a, i) => (
          <div key={a.title} className="approach-item">
            <span className="approach-n">{String(i + 1).padStart(2, '0')}</span>
            <h4>{a.title}</h4>
            <p>{a.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------- investment ---------- */
function Investment() {
  return (
    <section id="investment" className="section">
      <SectionHead eyebrow="Investment" title="Project cost" />
      <div className="invest">
        <div className="invest-price">
          <span className="ip-label">{pricing.label}</span>
          <strong className="ip-amount">{price}</strong>
          <span className="ip-cur">{pricing.currency} · {TOTAL} months, kickoff to go-live</span>
          <p>{pricing.summary}</p>
        </div>
        <div className="invest-covers">
          <h3 className="sub-h">What's included</h3>
          <ul className="items">
            {pricing.covers.map((c) => <li key={c}><Check />{c}</li>)}
          </ul>
          <p className="invest-note">{pricing.note}</p>
        </div>
      </div>
    </section>
  )
}

/* ---------- assumptions ---------- */
function Assumptions() {
  const [open, setOpen] = useState(0)
  return (
    <section id="assumptions" className="section alt">
      <SectionHead eyebrow="Fine print" title="Project assumptions & dependencies" />
      <div className="accordion">
        {assumptions.map((a, i) => {
          const isOpen = open === i
          return (
            <div key={i} className={`acc ${isOpen ? 'open' : ''}`}>
              <button className="acc-head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span className="acc-n">{i + 1}</span>
                <span className="acc-title">{a.title}</span>
                <Chevron open={isOpen} />
              </button>
              <p className="acc-body">{a.text}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ---------- commitment ---------- */
function Commitment() {
  return (
    <section className="commit">
      <div className="commit-inner">
        <span className="eyebrow light">Delivery commitment</span>
        <h2>{commitment.headline}</h2>
        <p className="commit-cond">{commitment.condition}</p>
        <div className="commit-dates">
          <div><span>Development</span><strong>Months 1–4</strong></div>
          <div className="arrow" aria-hidden="true">→</div>
          <div><span>Testing &amp; Fixes</span><strong>Months 5–6</strong></div>
          <div className="arrow" aria-hidden="true">→</div>
          <div><span>Go-live</span><strong>End of Month {TOTAL}</strong></div>
        </div>
        <p className="commit-close">{commitment.closing}</p>
      </div>
    </section>
  )
}

/* ---------- print-only full plan ---------- */
function PrintPlan() {
  return (
    <section className="print-only">
      <h2>Detailed monthly plan</h2>
      {months.map((m) => (
        <div key={m.n} className="print-month">
          <h3>Month {m.n}: {m.title}</h3>
          <p><strong>Objective:</strong> {m.objective}</p>
          {m.groups.map((g) => (
            <div key={g.name}>
              <h4>{g.name}</h4>
              <ul>{g.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </div>
          ))}
          <p><strong>Milestone:</strong> {m.milestone}</p>
        </div>
      ))}
    </section>
  )
}

export default function App() {
  const [selected, setSelected] = useState(1)

  const pickMonth = (n) => {
    setSelected(n)
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Intro />
      <ScrollTruck />
      <Nav />
      <main>
        <Hero />
        <Timeline selected={selected} setSelected={setSelected} />
        <PrintPlan />
        <Scope onPickMonth={pickMonth} />
        <Stack />
        <Approach />
        <Investment />
        <Assumptions />
        <Commitment />
      </main>
      <footer className="footer">
        <span className="footer-brand">
          <Logo height={24} />
          <span>{project.title} · {project.subtitle}</span>
        </span>
        <span>Timeline is measured from project kickoff.</span>
      </footer>
    </>
  )
}
