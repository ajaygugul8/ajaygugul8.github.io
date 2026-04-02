import { useEffect, useState, useRef } from 'react'
import { Eye } from 'lucide-react'
import { db } from '../firebase'
import { doc, getDoc, setDoc, increment } from 'firebase/firestore'

function useCountUp(target, duration = 1200) {
  const [display, setDisplay] = useState(null)
  const rafRef = useRef(null)

  useEffect(() => {
    if (target === null) { setDisplay(''); return }
    const start = Math.max(1, target - 10)
    const startTime = performance.now()

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
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
  const animatedCount = useCountUp(visitorCount, 1200)

  useEffect(() => {
    const ref = doc(db, 'stats', 'visitors')

    async function trackVisit() {
      const snap = await getDoc(ref)
      if (snap.exists()) {
        setVisitorCount(snap.data().total)
      }

      if (!sessionStorage.getItem('visitor_counted')) {
        await setDoc(ref, { total: increment(1) }, { merge: true })
        sessionStorage.setItem('visitor_counted', '1')
        const updated = await getDoc(ref)
        if (updated.exists()) setVisitorCount(updated.data().total)
      }
    }

    trackVisit()
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