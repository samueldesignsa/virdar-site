/**
 * Virdar "Tapered Convergence" mark — two sculpted blades forming a V with
 * graduated streams funneling to a single point. Recolorable via `color`
 * (defaults to gold) which maps to currentColor on the SVG.
 */
type VMarkProps = {
  size?: number
  color?: string
  className?: string
}

const STREAMS: [number, number][] = [
  [28, 4.6],
  [44, 2.9],
  [60, 1.9],
  [76, 2.9],
  [92, 4.6],
]

export default function VMark({ size = 24, color = '#C9A96E', className }: VMarkProps) {
  const height = +(size * 0.92).toFixed(2)
  return (
    <span className={`v-mark${className ? ` ${className}` : ''}`} style={{ color }} aria-hidden="true">
      <svg width={size} height={height} viewBox="0 0 120 110">
        <g stroke="currentColor" fill="none">
          {STREAMS.map(([x, w]) => (
            <line
              key={x}
              x1={x}
              y1={14}
              x2={60}
              y2={90}
              strokeWidth={+(w * 0.7).toFixed(2)}
              opacity={0.8}
              strokeLinecap="round"
            />
          ))}
        </g>
        <polygon points="9,14 20,14 60,90" fill="currentColor" />
        <polygon points="111,14 100,14 60,90" fill="currentColor" />
      </svg>
    </span>
  )
}
