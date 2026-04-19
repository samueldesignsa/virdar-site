import { useState, useRef, useCallback, useEffect } from 'react'

type ImageComparisonProps = {
  beforeImage: string
  afterImage: string
  altBefore?: string
  altAfter?: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
}

export function ImageComparison({
  beforeImage,
  afterImage,
  altBefore = 'Before',
  altAfter = 'After',
  beforeLabel,
  afterLabel,
  className = '',
}: ImageComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      let newPosition = ((clientX - rect.left) / rect.width) * 100
      newPosition = Math.max(0, Math.min(100, newPosition))
      setSliderPosition(newPosition)
    },
    [isDragging],
  )

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = useCallback(() => setIsDragging(false), [])
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX)

  const handleTouchStart = () => setIsDragging(true)
  const handleTouchEnd = () => setIsDragging(false)
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX)

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp)
    return () => window.removeEventListener('mouseup', handleMouseUp)
  }, [handleMouseUp])

  return (
    <div
      ref={containerRef}
      className={`relative w-full select-none rounded-2xl overflow-hidden shadow-2xl border border-border ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* After Image — clipped by slider */}
      <div
        className="absolute top-0 left-0 h-full w-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={afterImage}
          alt={altAfter}
          className="h-full w-full object-cover"
          draggable="false"
        />
        {afterLabel && (
          <span className="absolute top-4 left-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-bg">
            {afterLabel}
          </span>
        )}
      </div>

      {/* Before Image — base layer */}
      <img
        src={beforeImage}
        alt={altBefore}
        className="block h-full w-full object-cover"
        draggable="false"
      />
      {beforeLabel && (
        <span
          className="absolute top-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-text backdrop-blur-sm"
          style={{ opacity: sliderPosition < 90 ? 1 : 0, transition: 'opacity 0.2s' }}
        >
          {beforeLabel}
        </span>
      )}

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-accent/90 cursor-ew-resize flex items-center justify-center"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className={`bg-accent rounded-full h-12 w-12 flex items-center justify-center shadow-xl transition-transform duration-200 ${
            isDragging ? 'scale-110' : ''
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-bg"
          >
            <polyline points="9 18 3 12 9 6" />
            <polyline points="15 6 21 12 15 18" />
          </svg>
        </div>
      </div>
    </div>
  )
}
