import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const dot = document.createElement('div')
    const ring = document.createElement('div')
    dot.className = 'cursor-dot'
    ring.className = 'cursor-ring'
    document.body.appendChild(dot)
    document.body.appendChild(ring)

    let tx = window.innerWidth / 2, ty = window.innerHeight / 2
    let rx = tx, ry = ty
    let raf

    const onMove = e => {
      tx = e.clientX; ty = e.clientY
      dot.style.transform = `translate(${tx}px, ${ty}px)`
    }

    const tick = () => {
      rx += (tx - rx) * 0.18
      ry += (ty - ry) * 0.18
      ring.style.transform = `translate(${rx}px, ${ry}px)`
      raf = requestAnimationFrame(tick)
    }
    tick()

    const onOver = e => {
      const el = e.target.closest?.('[data-cursor]')
      if (!el) { ring.classList.remove('hover', 'view', 'link'); return }
      const kind = el.getAttribute('data-cursor')
      ring.classList.toggle('link', kind === 'link')
      ring.classList.toggle('view', kind === 'view')
      ring.dataset.label = el.getAttribute('data-cursor-label') || ''
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      dot.remove()
      ring.remove()
    }
  }, [])

  return null
}