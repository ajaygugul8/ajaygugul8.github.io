import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(() => {
    const storedCount = localStorage.getItem('visitorCount')
    return storedCount ? parseInt(storedCount, 10) : 0
  })

  useEffect(() => {
    const hasSessionCounted = sessionStorage.getItem('hasSessionCounted')
    
    if (!hasSessionCounted) {
      const storedCount = localStorage.getItem('visitorCount')
      const count = storedCount ? parseInt(storedCount, 10) : 0
      const newCount = count + 1
      setVisitorCount(newCount)
      localStorage.setItem('visitorCount', newCount.toString())
      sessionStorage.setItem('hasSessionCounted', 'true')
    }
  }, [])

  return (
    <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-400/10 dark:to-pink-400/10 px-4 py-2 border border-purple-200/30 dark:border-purple-700/30">
      <Eye className="w-4 h-4 text-purple-600 dark:text-purple-400" />
      <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
        {visitorCount.toLocaleString()} VISITORS
      </span>
    </div>
  )
}
