import { useEffect, useRef } from 'react'

// A truck that drives along the bottom of the screen as the page is scrolled.
export default function ScrollTruck() {
  const root = useRef(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    let raf = 0
    let stopTimer = 0

    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      el.style.setProperty('--p', p.toFixed(4))
      el.classList.add('moving')
      clearTimeout(stopTimer)
      stopTimer = setTimeout(() => el.classList.remove('moving'), 160)
      el.classList.toggle('done', p > 0.995)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    el.classList.remove('moving')
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
      clearTimeout(stopTimer)
    }
  }, [])

  return (
    <div className="scroll-truck" ref={root} aria-hidden="true">
      <div className="st-road" />
      <div className="st-progress" />
      <div className="st-flag">
        <svg viewBox="0 0 16 16"><path d="M4 14V2m0 1h8l-1.6 3L12 9H4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" /></svg>
      </div>
      <div className="st-truck">
        <svg viewBox="0 0 120 64">
          <rect x="2" y="8" width="70" height="40" rx="5" fill="#f5a524" />
          <path d="M76 20h20l14 14v14H76z" fill="#ffffff" />
          <path d="M82 25h12l8 9H82z" fill="#0b1b2e" opacity=".75" />
          <rect x="2" y="46" width="108" height="5" rx="2" fill="#0b1b2e" />
          <g className="st-wheel"><circle cx="24" cy="54" r="8" fill="#0b1b2e" stroke="#fff" strokeWidth="2.5" /><path d="M24 47v14M17 54h14" stroke="#fff" strokeWidth="2.5" /></g>
          <g className="st-wheel"><circle cx="52" cy="54" r="8" fill="#0b1b2e" stroke="#fff" strokeWidth="2.5" /><path d="M52 47v14M45 54h14" stroke="#fff" strokeWidth="2.5" /></g>
          <g className="st-wheel"><circle cx="94" cy="54" r="8" fill="#0b1b2e" stroke="#fff" strokeWidth="2.5" /><path d="M94 47v14M87 54h14" stroke="#fff" strokeWidth="2.5" /></g>
        </svg>
      </div>
    </div>
  )
}
