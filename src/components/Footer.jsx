import { Heart } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Footer() {
  const [isBeating, setIsBeating] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBeating(true)
      setTimeout(() => setIsBeating(false), 800)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="mt-auto py-8 text-center">
      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <span>Made with</span>
        <Heart 
          className={`inline-block w-4 h-4 text-red-500 transition-transform duration-200 ${
            isBeating ? 'scale-125' : 'scale-100'
          }`}
          fill="currentColor"
          style={{
            animation: 'heartbeat 1.5s ease-in-out infinite',
          }}
        />
        <span>by Ajay</span>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes heartbeat {
            0% { transform: scale(1); }
            14% { transform: scale(1.3); }
            28% { transform: scale(1); }
            42% { transform: scale(1.3); }
            70% { transform: scale(1); }
          }
        `
      }} />
    </footer>
  )
}
