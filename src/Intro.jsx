import { useEffect, useState } from 'react'

const STAGES = ['Load booked', 'In transit', 'Delivered']

function reducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

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
    const t = [
      setTimeout(() => setStage(1), 700),
      setTimeout(() => setStage(2), 2900),
      setTimeout(finish, 3800),
    ]
    return () => {
      t.forEach(clearTimeout)
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
        <div className="intro-brand">Transportation Management System</div>

        <div className="route">
          <div className="stop origin">
            <span className="pin" />
            <span className="stop-label">Pickup</span>
          </div>

          <div className="road">
            <div className="road-line" />
            <div className="road-progress" />
            <div className="truck">
              <svg viewBox="0 0 120 64" aria-hidden="true">
                <rect x="2" y="8" width="70" height="40" rx="5" fill="#f5a524" />
                <rect x="10" y="16" width="54" height="5" rx="2.5" fill="#0b1b2e" opacity=".22" />
                <rect x="10" y="26" width="38" height="5" rx="2.5" fill="#0b1b2e" opacity=".22" />
                <path d="M76 20h20l14 14v14H76z" fill="#ffffff" />
                <path d="M82 25h12l8 9H82z" fill="#0b1b2e" opacity=".75" />
                <rect x="2" y="46" width="108" height="5" rx="2" fill="#0b1b2e" />
                <g className="wheel w1"><circle cx="24" cy="54" r="8" fill="#0b1b2e" stroke="#fff" strokeWidth="2" /><path d="M24 48v12M18 54h12" stroke="#fff" strokeWidth="2" /></g>
                <g className="wheel w2"><circle cx="52" cy="54" r="8" fill="#0b1b2e" stroke="#fff" strokeWidth="2" /><path d="M52 48v12M46 54h12" stroke="#fff" strokeWidth="2" /></g>
                <g className="wheel w3"><circle cx="94" cy="54" r="8" fill="#0b1b2e" stroke="#fff" strokeWidth="2" /><path d="M94 48v12M88 54h12" stroke="#fff" strokeWidth="2" /></g>
              </svg>
            </div>
          </div>

          <div className={`stop dest ${stage === 2 ? 'arrived' : ''}`}>
            <span className="pin">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="stop-label">Delivery</span>
          </div>
        </div>

        <div className="intro-status">
          <span className="status-dots">
            {STAGES.map((s, i) => (
              <i key={s} className={i <= stage ? 'on' : ''} />
            ))}
          </span>
          <span key={stage} className="status-text">{STAGES[stage]}</span>
        </div>

        <button className="intro-skip" onClick={finish}>Skip</button>
      </div>
    </div>
  )
}
