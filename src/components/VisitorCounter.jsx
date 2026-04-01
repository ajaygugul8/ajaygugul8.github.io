import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'
import { db } from '../firebase'
import { doc, getDoc, setDoc, increment } from 'firebase/firestore'

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(null)

  useEffect(() => {
    const ref = doc(db, 'stats', 'visitors')

    async function trackVisit() {
      if (!sessionStorage.getItem('visitor_counted')) {
        await setDoc(ref, { total: increment(1) }, { merge: true })
        sessionStorage.setItem('visitor_counted', '1')
      }
      const snap = await getDoc(ref)
      if (snap.exists()) {
        setVisitorCount(snap.data().total)
      }
    }

    trackVisit()
  }, [])

  return (
    <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-400/10 dark:to-pink-400/10 px-4 py-2 border border-purple-200/30 dark:border-purple-700/30">
      <Eye className="w-4 h-4 text-purple-600 dark:text-purple-400" />
      <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
        {visitorCount ?? '...'} VISITORS
      </span>
    </div>
  )
}