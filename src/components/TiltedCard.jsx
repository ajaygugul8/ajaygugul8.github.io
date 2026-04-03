import { useState, useRef, useEffect } from 'react'
import { motion } from 'motion/react'

export default function TiltedCard({
  imageSrc,
  altText,
  captionText,
  containerHeight = '320px',
  containerWidth = '280px',
  imageHeight = '320px',
  imageWidth = '280px',
  rotateAmplitude = 15,
  scaleOnHover = 1.05,
  showMobileWarning = true,
  showTooltip = true,
  displayOverlayContent = false,
  overlayContent = null,
  className = '',
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMouseMove = (e) => {
    if (isMobile) return
    
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    setMousePosition({ x, y })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0.5, y: 0.5 })
  }

  const calculateRotation = () => {
    if (isMobile || !isHovered) return { x: 0, y: 0 }

    const rotateX = (mousePosition.y - 0.5) * rotateAmplitude
    const rotateY = (mousePosition.x - 0.5) * -rotateAmplitude

    return { x: rotateX, y: rotateY }
  }

  const rotation = calculateRotation()

  return (
    <div className={`relative inline-block ${className}`}>
      <motion.div
        ref={cardRef}
        className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 ${
          isHovered 
            ? 'shadow-[0_0_30px_rgba(163,102,255,0.4),0_0_60px_rgba(163,102,255,0.2)]' 
            : 'shadow-2xl'
        }`}
        style={{
          height: containerHeight,
          width: containerWidth,
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? scaleOnHover : 1})`,
          transition: isHovered ? 'transform 0.1s ease-out, box-shadow 0.3s ease-out' : 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image */}
        <img
          src={imageSrc}
          alt={altText}
          className="w-full h-full object-cover"
          style={{
            height: imageHeight,
            width: imageWidth,
          }}
        />

        {/* Overlay Content */}
        {displayOverlayContent && overlayContent && (
          <div
            className="absolute inset-0 flex items-end justify-center p-4"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
            }}
          >
            {overlayContent}
          </div>
        )}

        {/* Tooltip */}
        {showTooltip && isHovered && !isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-2 left-2 right-2 text-center"
          >
            <div className="inline-block px-2 py-1 text-xs text-white bg-black/70 backdrop-blur-sm rounded">
              {captionText}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Mobile Warning */}
      {showMobileWarning && isMobile && (
        <div className="absolute top-2 left-2 right-2 text-center">
          <div className="inline-block px-2 py-1 text-xs text-white bg-black/70 backdrop-blur-sm rounded">
            {captionText}
          </div>
        </div>
      )}
    </div>
  )
}
