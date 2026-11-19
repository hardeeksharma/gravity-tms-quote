import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'

// Timeline (ms) — keep in sync with the CSS animation delays in styles.css.
const STAGES = [
  { at: 0, text: 'Loading container at the shipping yard' },
  { at: 1600, text: 'In transit' },
  { at: 2300, text: 'Arriving at the warehouse' },
  { at: 4300, text: 'Delivered to warehouse' },
]
const FINISH_AT = 5300

function reducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

const CONTAINER_COLORS = ['#2f7fd1', '#e5533d', '#1f9d6b', '#f5a524', '#6b7a8f', '#2f7fd1', '#e5533d']

export default function Intro() {
  const [show, setShow] = useState(() => !reducedMotion())
  const [leaving, setLeaving] = useState(false)
  const [stage, setStage] = useState(0)

  const finish = () => {
    setLeaving(true)
    setTimeout(() => setShow(false), 500)
  }

  useEffect(() => {
    if (!show) return
    document.body.style.overflow = 'hidden'
    const timers = STAGES.slice(1).map((s, i) => setTimeout(() => setStage(i + 1), s.at))
    timers.push(setTimeout(finish, FINISH_AT))
    return () => {
      timers.forEach(clearTimeout)
      document.body.style.overflow = ''
    }
  }, [show])

  useEffect(() => {
    if (!show) document.body.style.overflow = ''
  }, [show])

  if (!show) return null

  return (
    <div className={`intro ${leaving ? 'leaving' : ''}`} role="status" aria-label="Loading">
      <div className="intro-inner">
        <div className="intro-brand">
          <Logo height={76} className="intro-logo" />
          <span>Transportation Management System</span>
        </div>

        <svg className="scene" viewBox="0 0 800 250" aria-hidden="true">
          <defs>
            <pattern id="ribs" width="6" height="10" patternUnits="userSpaceOnUse">
              <rect width="2" height="10" fill="#000" opacity=".18" />
            </pattern>
            <pattern id="shutter" width="10" height="7" patternUnits="userSpaceOnUse">
              <rect width="10" height="1.5" fill="#0b1b2e" opacity=".35" />
            </pattern>
          </defs>

          {/* ground + road */}
          <rect x="0" y="210" width="800" height="40" fill="#0e2237" />
          <rect x="0" y="210" width="800" height="14" fill="#16304a" />
          <line x1="0" y1="217" x2="800" y2="217" stroke="rgba(255,255,255,.25)" strokeWidth="2" strokeDasharray="14 12" />

          {/* ---------- shipping yard ---------- */}
          <g className="yard">
            {[
              [8, 178], [64, 178],
              [8, 146], [64, 146],
              [36, 114],
            ].map(([x, y], i) => (
              <g key={i}>
                <rect x={x} y={y} width="54" height="31" rx="1.5" fill={CONTAINER_COLORS[i]} />
                <rect x={x} y={y} width="54" height="31" fill="url(#ribs)" />
                <rect x={x} y={y} width="54" height="31" rx="1.5" fill="none" stroke="#071322" strokeWidth="1.2" />
              </g>
            ))}
            <text x="64" y="240" className="scene-label" textAnchor="middle">SHIPPING YARD</text>
          </g>

          {/* gantry crane */}
          <g className="crane">
            <rect x="132" y="38" width="6" height="172" fill="#f5a524" />
            <rect x="330" y="38" width="6" height="172" fill="#f5a524" />
            <path d="M138 60 L160 40 M330 60 L308 40" stroke="#f5a524" strokeWidth="3" />
            <rect x="124" y="30" width="220" height="10" rx="2" fill="#f5a524" />
            <rect x="124" y="30" width="220" height="10" fill="url(#ribs)" opacity=".6" />
            <rect x="196" y="40" width="28" height="9" rx="2" fill="#d98a0b" />
            <g className="crane-cable">
              <line x1="204" y1="49" x2="204" y2="142" stroke="#c7d0db" strokeWidth="1.6" />
              <line x1="216" y1="49" x2="216" y2="142" stroke="#c7d0db" strokeWidth="1.6" />
            </g>
            <rect className="spreader" x="186" y="140" width="48" height="5" rx="1.5" fill="#d98a0b" />
          </g>

          {/* warehouse interior, seen through the open door (behind the truck) */}
          <rect x="584" y="138" width="106" height="75" fill="#050c16" />
          <rect x="584" y="138" width="106" height="6" fill="#f5a524" opacity=".18" />

          {/* ---------- truck (moves) ---------- */}
          <g className="truck-move">
            {/* container dropped by the crane */}
            <g className="cargo">
              <rect x="154" y="146" width="112" height="40" rx="2" fill="#f5a524" />
              <rect x="154" y="146" width="112" height="40" fill="url(#ribs)" />
              <rect x="154" y="146" width="112" height="40" rx="2" fill="none" stroke="#071322" strokeWidth="1.4" />
              <text x="210" y="171" textAnchor="middle" className="cargo-text">TMS</text>
            </g>
            {/* flatbed trailer */}
            <rect x="148" y="186" width="126" height="7" rx="2" fill="#c7d0db" />
            <rect x="272" y="182" width="10" height="9" fill="#8a97a8" />
            {/* cab */}
            <path d="M282 196 V164 a6 6 0 0 1 6 -6 h18 l14 16 v22 z" fill="#ffffff" />
            <path d="M291 163 h13 l10 12 h-23 z" fill="#0b1b2e" opacity=".8" />
            <rect x="282" y="190" width="40" height="6" rx="2" fill="#0b1b2e" />
            <rect x="316" y="182" width="5" height="4" rx="1" fill="#ffd27a" className="headlight" />
            <rect x="284" y="140" width="4" height="18" rx="1.5" fill="#8a97a8" />
            <g className="exhaust">
              <circle cx="286" cy="138" r="3.5" />
              <circle cx="286" cy="138" r="3.5" />
              <circle cx="286" cy="138" r="3.5" />
            </g>
            {/* wheels */}
            {[170, 194, 250, 306].map((cx) => (
              <g key={cx} className="wheel" style={{ transformOrigin: `${cx}px 201px` }}>
                <circle cx={cx} cy="201" r="9" fill="#0b1b2e" stroke="#e8edf3" strokeWidth="2.4" />
                <path d={`M${cx} 194v14M${cx - 7} 201h14`} stroke="#e8edf3" strokeWidth="2" />
              </g>
            ))}
          </g>

          {/* ---------- warehouse ---------- */}
          <g className="warehouse">
            <path d="M548 92 L664 54 L782 92 Z" fill="#1c3a59" />
            <path d="M548 92 L664 54 L782 92" fill="none" stroke="#f5a524" strokeWidth="3" strokeLinejoin="round" />
            {/* facade with a hole for the door */}
            <path
              fillRule="evenodd"
              fill="#24486d"
              d="M556 92 H774 V213 H556 Z M584 138 H690 V213 H584 Z"
            />
            <rect x="584" y="134" width="106" height="4" fill="#f5a524" />
            <text x="665" y="117" textAnchor="middle" className="wh-sign">WAREHOUSE</text>
            <rect x="712" y="146" width="40" height="26" rx="2" fill="#0b1b2e" opacity=".55" />
            <rect x="712" y="146" width="40" height="26" rx="2" fill="none" stroke="#3d6790" strokeWidth="1.5" />
            {/* roll-up door */}
            <g className="door">
              <rect x="584" y="138" width="106" height="75" fill="#c7d0db" />
              <rect x="584" y="138" width="106" height="75" fill="url(#shutter)" />
            </g>
            <text x="665" y="240" className="scene-label" textAnchor="middle">WAREHOUSE</text>
          </g>

          {/* delivered badge */}
          <g className="delivered">
            <circle cx="665" cy="26" r="16" fill="#1fc98a" />
            <path d="M657 26 l6 6 l10 -12" fill="none" stroke="#04261a" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>

        <div className="intro-bottom">
          <div className="intro-progress"><span /></div>
          <div className="intro-status">
            <span className="status-dots">
              {STAGES.map((s, i) => <i key={s.at} className={i <= stage ? 'on' : ''} />)}
            </span>
            <span key={stage} className="status-text">{STAGES[stage].text}</span>
          </div>
        </div>

        <button className="intro-skip" onClick={finish}>Skip</button>
      </div>
    </div>
  )
}
