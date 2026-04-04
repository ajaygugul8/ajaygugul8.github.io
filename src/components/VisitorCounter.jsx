import { useEffect, useState, useRef } from 'react'
import { Eye } from 'lucide-react'
import { db } from '../firebase'
import { doc, getDoc, setDoc, increment } from 'firebase/firestore'

const COUNT_CACHE_KEY = 'vc-count'

// module-level — survives remounts, resets on refresh/tab close
let memoryCount = null

function useCountUp(target, duration = 1200) {
  const [display, setDisplay] = useState(null)
  const rafRef = useRef(null)

  useEffect(() => {
    if (target === null) { setDisplay(''); return }

    if (duration === 0) {
      setDisplay(target)
      return
    }

    const start = Math.max(1, target - 10)
    const startTime = performance.now()

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(start + (target - start) * eased)
      setDisplay(current)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return display
}

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(null)
  const isFreshLoad = useRef(memoryCount === null) // true only on first load
  const animatedCount = useCountUp(visitorCount, isFreshLoad.current ? 1200 : 0)

  useEffect(() => {
    const ref = doc(db, 'stats', 'visitors')
    let cancelled = false

    async function trackVisit() {
      if (memoryCount !== null) {
        // navigated back — show instantly, no animation
        setVisitorCount(memoryCount)
        return
      }

      const snap = await getDoc(ref)
      if (!cancelled && snap.exists()) {
        const val = snap.data().total
        memoryCount = val
        sessionStorage.setItem(COUNT_CACHE_KEY, String(val))
        setVisitorCount(val) // triggers animation since isFreshLoad.current = true
      }

      const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname)
      const alreadyCounted = sessionStorage.getItem('visitor_counted')

      if (!alreadyCounted && !isLocal) {
        sessionStorage.setItem('visitor_counted', '1')
        await setDoc(ref, { total: increment(1) }, { merge: true })
        const updated = await getDoc(ref)
        if (!cancelled && updated.exists()) {
          const val = updated.data().total
          memoryCount = val
          sessionStorage.setItem(COUNT_CACHE_KEY, String(val))
          setVisitorCount(val)
        }
      }
    }

    trackVisit()
    return () => { cancelled = true }
  }, [])

  return (
    <div className="group flex items-center gap-2 rounded-full bg-white/10 dark:bg-black/10 px-4 py-2 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:bg-white/20 dark:hover:bg-black/20 hover:shadow-xl hover:shadow-purple-500/20 dark:hover:shadow-purple-400/20 cursor-pointer">
      <Eye className="w-4 h-4 text-purple-600 dark:text-purple-400 transition-transform duration-300 group-hover:scale-110" />
      <span className="text-sm font-medium text-purple-700 dark:text-purple-300 transition-all duration-300 group-hover:text-purple-800 dark:group-hover:text-purple-200">
        {animatedCount !== '' && animatedCount !== null ? `${animatedCount} VISITORS` : ''}
      </span>
    </div>
  )
}