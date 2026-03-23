import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Line } from '@react-three/drei'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

// ─── Constants ──────────────────────────────────────────────────────────────────
const CALENDLY_URL = 'https://calendly.com/virdar-info/30min'
const FORMSPREE_URL = 'https://formspree.io/f/xeelnjwd'

// ─── Hooks ──────────────────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  )
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    setIsMobile(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [breakpoint])
  return isMobile
}

// ─── Animated Gradient Orb (Canvas) ─────────────────────────────────────────────
function GradientOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const animate = () => {
      time += 0.003
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight

      ctx.clearRect(0, 0, w, h)

      const blobs = [
        {
          x: w * 0.5 + Math.sin(time * 0.7) * w * 0.15,
          y: h * 0.4 + Math.cos(time * 0.5) * h * 0.1,
          r: Math.min(w, h) * 0.45,
          c1: 'rgba(79, 142, 247, 0.3)',
          c2: 'rgba(79, 142, 247, 0)',
        },
        {
          x: w * 0.4 + Math.cos(time * 0.6) * w * 0.12,
          y: h * 0.5 + Math.sin(time * 0.8) * h * 0.12,
          r: Math.min(w, h) * 0.35,
          c1: 'rgba(59, 130, 246, 0.25)',
          c2: 'rgba(59, 130, 246, 0)',
        },
        {
          x: w * 0.6 + Math.sin(time * 0.9) * w * 0.1,
          y: h * 0.35 + Math.cos(time * 0.4) * h * 0.08,
          r: Math.min(w, h) * 0.3,
          c1: 'rgba(96, 165, 250, 0.2)',
          c2: 'rgba(96, 165, 250, 0)',
        },
        {
          x: w * 0.55 + Math.cos(time * 1.1) * w * 0.08,
          y: h * 0.45 + Math.sin(time * 0.6) * h * 0.1,
          r: Math.min(w, h) * 0.25,
          c1: 'rgba(37, 99, 235, 0.2)',
          c2: 'rgba(37, 99, 235, 0)',
        },
      ]

      for (const b of blobs) {
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
        grad.addColorStop(0, b.c1)
        grad.addColorStop(1, b.c2)
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, w, h)
      }

      animationId = requestAnimationFrame(animate)
    }

    resize()
    animate()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ filter: 'blur(60px)' }}
      aria-hidden="true"
    />
  )
}

// ─── Neural Network Hero Orb (Three.js) ─────────────────────────────────────────
function generateFibonacciSphere(count: number, radius: number) {
  const positions = new Float32Array(count * 3)
  const goldenRatio = (1 + Math.sqrt(5)) / 2

  for (let i = 0; i < count; i++) {
    const theta = Math.acos(1 - (2 * (i + 0.5)) / count)
    const phi = (2 * Math.PI * i) / goldenRatio

    positions[i * 3] = radius * Math.sin(theta) * Math.cos(phi)
    positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi)
    positions[i * 3 + 2] = radius * Math.cos(theta)
  }
  return positions
}

function NeuralParticles({ count = 500, radius = 2.2 }: { count?: number; radius?: number }) {
  const pointsRef = useRef<THREE.Points>(null)
  const originalPositions = useMemo(() => generateFibonacciSphere(count, radius), [count, radius])
  const positions = useMemo(() => new Float32Array(originalPositions), [originalPositions])

  // Glow layer — larger, dimmer duplicate
  const glowPositions = useMemo(() => new Float32Array(originalPositions), [originalPositions])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.3
    for (let i = 0; i < count; i++) {
      const ox = originalPositions[i * 3]
      const oy = originalPositions[i * 3 + 1]
      const oz = originalPositions[i * 3 + 2]

      const displacement = Math.sin(t + ox * 1.5) * 0.12 +
                          Math.sin(t * 0.7 + oy * 2.0) * 0.08 +
                          Math.sin(t * 0.5 + oz * 1.8) * 0.06

      const nx = ox / radius
      const ny = oy / radius
      const nz = oz / radius

      positions[i * 3] = ox + nx * displacement
      positions[i * 3 + 1] = oy + ny * displacement
      positions[i * 3 + 2] = oz + nz * displacement

      glowPositions[i * 3] = positions[i * 3]
      glowPositions[i * 3 + 1] = positions[i * 3 + 1]
      glowPositions[i * 3 + 2] = positions[i * 3 + 2]
    }
    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#4F8EF7"
          size={0.035}
          sizeAttenuation
          depthWrite={false}
          opacity={0.9}
        />
      </Points>
      <Points positions={glowPositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#4F8EF7"
          size={0.1}
          sizeAttenuation
          depthWrite={false}
          opacity={0.15}
        />
      </Points>
    </>
  )
}

function NeuralConnections({ count = 500, radius = 2.2, maxDist = 0.7 }: { count?: number; radius?: number; maxDist?: number }) {
  const lines = useMemo(() => {
    const positions = generateFibonacciSphere(count, radius)
    const connections: [THREE.Vector3, THREE.Vector3][] = []

    for (let i = 0; i < count && connections.length < 120; i++) {
      const ax = positions[i * 3], ay = positions[i * 3 + 1], az = positions[i * 3 + 2]
      for (let j = i + 1; j < count && connections.length < 120; j++) {
        const bx = positions[j * 3], by = positions[j * 3 + 1], bz = positions[j * 3 + 2]
        const dist = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2 + (az - bz) ** 2)
        if (dist < maxDist) {
          connections.push([
            new THREE.Vector3(ax, ay, az),
            new THREE.Vector3(bx, by, bz),
          ])
        }
      }
    }
    return connections
  }, [count, radius, maxDist])

  return (
    <>
      {lines.map((pair, i) => (
        <Line
          key={i}
          points={pair}
          color="#4F8EF7"
          lineWidth={0.5}
          transparent
          opacity={0.12}
        />
      ))}
    </>
  )
}

function NeuralOrbScene() {
  const groupRef = useRef<THREE.Group>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const lerpedMouse = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  useFrame((_, delta) => {
    lerpedMouse.current.x += (mouse.current.x - lerpedMouse.current.x) * 2 * delta
    lerpedMouse.current.y += (mouse.current.y - lerpedMouse.current.y) * 2 * delta

    if (groupRef.current) {
      groupRef.current.rotation.y = lerpedMouse.current.x * 0.15
      groupRef.current.rotation.x = lerpedMouse.current.y * 0.1
      groupRef.current.rotation.z += delta * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      <NeuralParticles />
      <NeuralConnections />
    </group>
  )
}

function NeuralHeroOrb() {
  return (
    <div className="absolute inset-0 w-full h-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <NeuralOrbScene />
      </Canvas>
    </div>
  )
}

// ─── Tilt Card Hook ─────────────────────────────────────────────────────────────
function useTiltCard(maxDeg = 8) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const animating = useRef(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    if (!animating.current) {
      animating.current = true
      requestAnimationFrame(() => {
        card.style.transform = `perspective(800px) rotateY(${x * maxDeg}deg) rotateX(${-y * maxDeg}deg) scale(1.02)`
        if (glowRef.current) {
          glowRef.current.style.opacity = '1'
          glowRef.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(79,142,247,0.15), transparent 60%)`
        }
        animating.current = false
      })
    }
  }, [maxDeg])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)'
    if (glowRef.current) {
      glowRef.current.style.opacity = '0'
    }
  }, [])

  return { cardRef, glowRef, handleMouseMove, handleMouseLeave }
}

// ─── Automation Pipeline (SVG) ──────────────────────────────────────────────────
function AutomationPipeline() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const nodes = ref.current.querySelectorAll('.pipeline-node')
    const paths = ref.current.querySelectorAll('.pipeline-path')
    const packets = ref.current.querySelectorAll('.pipeline-packet')

    const ctx = gsap.context(() => {
      // Nodes light up sequentially
      gsap.fromTo(nodes,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1, scale: 1, stagger: 0.2, duration: 0.5, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: ref.current!, start: 'top 80%', once: true }
        }
      )
      // Paths draw in
      gsap.fromTo(paths,
        { strokeDashoffset: 200 },
        {
          strokeDashoffset: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out', delay: 0.3,
          scrollTrigger: { trigger: ref.current!, start: 'top 80%', once: true }
        }
      )
      // Packets animate along paths (looping)
      packets.forEach((packet, i) => {
        gsap.fromTo(packet,
          { opacity: 0 },
          {
            opacity: 1, duration: 0.3, delay: 0.8 + i * 0.3,
            scrollTrigger: { trigger: ref.current!, start: 'top 80%', once: true }
          }
        )
      })
    })
    return () => ctx.revert()
  }, [])

  // Animate packets along paths with CSS
  const packetKeyframes = `
    @keyframes flowPacket1 { 0% { offset-distance: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { offset-distance: 100%; opacity: 0; } }
    @keyframes flowPacket2 { 0% { offset-distance: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { offset-distance: 100%; opacity: 0; } }
    @keyframes flowPacket3 { 0% { offset-distance: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { offset-distance: 100%; opacity: 0; } }
    @keyframes pulseNode { 0%, 100% { filter: drop-shadow(0 0 6px rgba(79,142,247,0.4)); } 50% { filter: drop-shadow(0 0 16px rgba(79,142,247,0.8)); } }
  `

  return (
    <div ref={ref} className="relative w-full max-w-3xl mx-auto h-24 md:h-32 mb-10">
      <style>{packetKeyframes}</style>
      <svg viewBox="0 0 800 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Connection paths */}
        <path className="pipeline-path" d="M130 60 Q 250 20, 340 60" stroke="#4F8EF7" strokeWidth="1.5" strokeDasharray="200" strokeDashoffset="0" opacity="0.3" />
        <path className="pipeline-path" d="M380 60 Q 470 100, 540 60" stroke="#4F8EF7" strokeWidth="1.5" strokeDasharray="200" strokeDashoffset="0" opacity="0.3" />
        <path className="pipeline-path" d="M580 60 Q 650 20, 720 60" stroke="#4F8EF7" strokeWidth="1.5" strokeDasharray="200" strokeDashoffset="0" opacity="0.3" />

        {/* Flowing packets */}
        <circle r="4" fill="#4F8EF7" opacity="0.9" style={{ offsetPath: "path('M130 60 Q 250 20, 340 60')", animation: 'flowPacket1 2s ease-in-out infinite', animationDelay: '1s' }}>
          <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin="1s" />
        </circle>
        <circle r="4" fill="#4F8EF7" opacity="0.9" style={{ offsetPath: "path('M380 60 Q 470 100, 540 60')", animation: 'flowPacket2 2s ease-in-out infinite', animationDelay: '1.5s' }}>
          <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin="1.5s" />
        </circle>
        <circle r="4" fill="#4F8EF7" opacity="0.9" style={{ offsetPath: "path('M580 60 Q 650 20, 720 60')", animation: 'flowPacket3 2s ease-in-out infinite', animationDelay: '2s' }}>
          <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin="2s" />
        </circle>

        {/* Nodes */}
        <g className="pipeline-node" style={{ animation: 'pulseNode 3s ease-in-out infinite' }}>
          <circle cx="100" cy="60" r="20" fill="#09090B" stroke="#4F8EF7" strokeWidth="1.5" />
          <text x="100" y="56" textAnchor="middle" fill="#4F8EF7" fontSize="14">📞</text>
          <text x="100" y="72" textAnchor="middle" fill="#A1A1AA" fontSize="8" fontFamily="Inter">Call</text>
        </g>
        <g className="pipeline-node" style={{ animation: 'pulseNode 3s ease-in-out infinite 0.5s' }}>
          <circle cx="360" cy="60" r="20" fill="#09090B" stroke="#4F8EF7" strokeWidth="1.5" />
          <text x="360" y="56" textAnchor="middle" fill="#4F8EF7" fontSize="14">🧠</text>
          <text x="360" y="72" textAnchor="middle" fill="#A1A1AA" fontSize="8" fontFamily="Inter">AI Processes</text>
        </g>
        <g className="pipeline-node" style={{ animation: 'pulseNode 3s ease-in-out infinite 1s' }}>
          <circle cx="560" cy="60" r="20" fill="#09090B" stroke="#4F8EF7" strokeWidth="1.5" />
          <text x="560" y="56" textAnchor="middle" fill="#4F8EF7" fontSize="14">⚡</text>
          <text x="560" y="72" textAnchor="middle" fill="#A1A1AA" fontSize="8" fontFamily="Inter">Action</text>
        </g>
        <g className="pipeline-node" style={{ animation: 'pulseNode 3s ease-in-out infinite 1.5s' }}>
          <circle cx="750" cy="60" r="20" fill="#09090B" stroke="#4F8EF7" strokeWidth="1.5" />
          <text x="750" y="56" textAnchor="middle" fill="#4F8EF7" fontSize="14">✅</text>
          <text x="750" y="72" textAnchor="middle" fill="#A1A1AA" fontSize="8" fontFamily="Inter">Done</text>
        </g>
      </svg>
    </div>
  )
}

// ─── ROI Globe (Three.js) ───────────────────────────────────────────────────────
function GlobeScene({ intensity = 0.5 }: { intensity: number }) {
  const globeRef = useRef<THREE.Group>(null)
  const arcsRef = useRef<THREE.Group>(null)

  // Generate arc curves
  const arcs = useMemo(() => {
    const dfwLat = 32.78, dfwLon = -96.8
    const toSphere = (lat: number, lon: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180)
      const theta = (lon + 180) * (Math.PI / 180)
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      )
    }

    const destinations = [
      [33.4, -97.5], [32.2, -95.8], [30.3, -97.7], [29.4, -98.5],
      [35.2, -97.0], [33.5, -101.8], [31.8, -94.2], [34.7, -92.3],
    ]

    return destinations.map(([lat, lon]) => {
      const start = toSphere(dfwLat, dfwLon, 1.5)
      const end = toSphere(lat, lon, 1.5)
      const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(2.0)
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
      return curve.getPoints(30)
    })
  }, [])

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.08
    }
  })

  const visibleArcs = Math.max(2, Math.round(arcs.length * intensity))

  return (
    <group ref={globeRef} rotation={[0.3, 2.0, 0]}>
      {/* Wireframe globe */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 24]} />
        <meshBasicMaterial color="#4F8EF7" wireframe transparent opacity={0.08} />
      </mesh>
      {/* Equator / latitude rings */}
      <mesh>
        <sphereGeometry args={[1.5, 48, 2]} />
        <meshBasicMaterial color="#4F8EF7" wireframe transparent opacity={0.15} />
      </mesh>

      {/* DFW hotspot */}
      <mesh position={(() => {
        const phi = (90 - 32.78) * (Math.PI / 180)
        const theta = (-96.8 + 180) * (Math.PI / 180)
        return [
          -1.52 * Math.sin(phi) * Math.cos(theta),
          1.52 * Math.cos(phi),
          1.52 * Math.sin(phi) * Math.sin(theta)
        ] as [number, number, number]
      })()}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#60A5FA" />
      </mesh>
      <pointLight position={[0.3, 1.2, 0.8]} color="#4F8EF7" intensity={intensity * 3} distance={4} />

      {/* Connection arcs */}
      <group ref={arcsRef}>
        {arcs.slice(0, visibleArcs).map((points, i) => (
          <Line
            key={i}
            points={points}
            color="#4F8EF7"
            lineWidth={1}
            transparent
            opacity={0.2 + intensity * 0.3}
          />
        ))}
      </group>
    </group>
  )
}

function ROIGlobe({ hours, hourlyRate }: { hours: number; hourlyRate: number }) {
  const intensity = Math.min(1, (hours - 5) / 35 * 0.7 + (hourlyRate - 15) / 85 * 0.3)

  return (
    <div className="w-full h-64 md:h-80" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <GlobeScene intensity={intensity} />
      </Canvas>
    </div>
  )
}

// ─── Logo ───────────────────────────────────────────────────────────────────────
function Logo({ size = 'default' }: { size?: 'default' | 'large' }) {
  const s = size === 'large' ? 32 : 24
  const fontSize = size === 'large' ? 'text-2xl' : 'text-lg'
  return (
    <a href="#" className={`flex items-center gap-2.5 ${fontSize} font-bold text-text tracking-tight no-underline`}>
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M2 3L14 25L26 3H20.5L14 17L7.5 3H2Z" fill="#4F8EF7" />
      </svg>
      virdar
    </a>
  )
}

// ─── Nav (Floating) ─────────────────────────────────────────────────────────────
function Nav() {
  const { scrollYProgress } = useScroll()
  const [visible, setVisible] = useState(false)

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    if (typeof current === 'number') {
      const direction = current - (scrollYProgress.getPrevious() ?? 0)

      if (scrollYProgress.get() < 0.05) {
        setVisible(false)
      } else {
        setVisible(direction < 0)
      }
    }
  })

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Calculator', href: '#calculator' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-white/[0.15] rounded-full bg-bg/80 backdrop-blur-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.3),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4"
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="relative items-center flex space-x-1 text-text-secondary hover:text-text transition-colors text-sm"
          >
            <span className="hidden sm:block">{link.label}</span>
            <span className="block sm:hidden text-xs">{link.label}</span>
          </a>
        ))}
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="border text-sm font-medium relative border-white/[0.15] text-text px-4 py-2 rounded-full hover:bg-white/[0.05] transition-colors"
        >
          <span>Book a Call</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-accent to-transparent h-px" />
        </a>
      </motion.nav>
    </AnimatePresence>
  )
}

// ─── Hero ───────────────────────────────────────────────────────────────────────
function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.hero-badge', { opacity: 0, y: 20, duration: 0.6, delay: 0.2 })
        .from(headlineRef.current, { opacity: 0, y: 30, duration: 0.8 }, '-=0.3')
        .from('.hero-sub', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
        .from('.hero-ctas', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
        .from('.hero-stats', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const isMobile = useIsMobile()

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {isMobile ? <GradientOrb /> : <NeuralHeroOrb />}

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 text-center pt-24 pb-20">
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border mb-8 bg-surface/50 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-medium text-text-secondary tracking-wide uppercase">
            AI Automation Agency &middot; Dallas, TX
          </span>
        </div>

        {/* Headline - Hormozi Grand Slam Offer */}
        <h1 ref={headlineRef} className="heading-xl mb-6 max-w-4xl mx-auto">
          We Build Your Custom AI System{' '}
          <span className="gradient-text">Free</span>
          <br />
          <span className="text-text-secondary" style={{ fontSize: '0.72em', fontWeight: 600 }}>
            You Only Pay After You See It Working
          </span>
        </h1>

        {/* Subheadline */}
        <p className="hero-sub body-lg max-w-2xl mx-auto mb-10">
          We learn your business, build a custom AI system for free, and demo it live.
          No obligations — you only pay after you see it working.
        </p>

        {/* CTAs */}
        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-8 py-4">
            Book a Free Strategy Call
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#how-it-works" className="btn-secondary text-base px-8 py-4">
            See How It Works
          </a>
        </div>

        {/* Stats bar */}
        <div className="hero-stats flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {[
            { value: '16hrs', label: 'Avg. Admin Time Reclaimed' },
            { value: '85%', label: 'Of Missed Callers Never Call Back' },
            { value: '$0', label: 'Until You See It Working' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-text tracking-tight">{stat.value}</div>
              <div className="text-xs font-medium text-text-tertiary uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </section>
  )
}



// ─── Problem Section ────────────────────────────────────────────────────────────
function Problem() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const header = ref.current.querySelector('.problem-content')
    const cards = ref.current.querySelectorAll('.problem-card')
    const ctx = gsap.context(() => {
      if (header) {
        gsap.fromTo(header,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: ref.current!, start: 'top 80%', once: true } }
        )
      }
      gsap.fromTo(cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current!, start: 'top 70%', once: true } }
      )
    })
    return () => ctx.revert()
  }, [])

  const pains = [
    { icon: '📞', stat: '62%', text: 'of SMB calls go unanswered — 411 Locals study' },
    { icon: '⭐', stat: '97%', text: 'of consumers read reviews before choosing a local business — BrightLocal' },
    { icon: '⏰', stat: '16hrs', text: 'per week lost to admin tasks by average SMB owner — Time Etc survey' },
    { icon: '📉', stat: '85%', text: 'of unanswered callers will never try again — PATLive research' },
  ]

  return (
    <section ref={ref} className="py-20 md:py-28 relative">
      <div className="section-divider max-w-7xl mx-auto" />
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="problem-content text-center mb-14">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">The Problem</p>
          <h2 className="heading-lg mb-4">
            You&apos;re Losing Customers<br />
            <span className="text-text-secondary">While You Sleep</span>
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            Harvard Business School found a single star increase on Yelp drives 5-9% more revenue.
            Every missed call, unanswered review, and forgotten follow-up is money walking out the door.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {pains.map((p, i) => (
            <div key={i} className="problem-card glass rounded-2xl p-6 md:p-8 text-center card-hover">
              <div className="text-3xl mb-3">{p.icon}</div>
              <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">{p.stat}</div>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Services ───────────────────────────────────────────────────────────────────
const services = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F8EF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    name: 'AI Voice Receptionist',
    price: '$4,000',
    description: 'Never miss a call again. AI answers, books appointments, and handles FAQs 24/7.',
    highlights: ['Handles 200+ calls/month', '24/7 availability', '3-week setup'],
    tag: 'Most Popular',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F8EF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 0110 10 10 10 0 01-10 10A10 10 0 012 12 10 10 0 0112 2z"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    name: 'Guest Intelligence System',
    price: '$5,500',
    description: 'Know your customers better than they know themselves. POS-integrated AI that tracks and re-engages.',
    highlights: ['POS integration (Toast, Square)', 'Win-back rate 15-25%', 'Automated VIP recognition'],
    tag: 'Highest ROI',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F8EF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
    name: 'AI Social Media Manager',
    price: '$4,500',
    description: 'Daily posts across all platforms. On-brand content created and scheduled automatically.',
    highlights: ['Instagram, Facebook, Google', 'Daily auto-posting', 'Brand voice trained'],
    tag: null,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F8EF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    name: 'Reputation Intelligence',
    price: '$2,000',
    description: 'Monitor and respond to every review automatically. Track competitors. Protect your brand.',
    highlights: ['Google, Yelp, DoorDash', 'Auto-response in your voice', 'Competitor benchmarking'],
    tag: 'Quick Win',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F8EF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
    name: 'Missed Call Text-Back',
    price: '$750',
    description: 'Every missed call gets an instant text within 60 seconds. Works 24/7, no staff needed.',
    highlights: ['60-second response time', '24/7 automated', '5-day setup'],
    tag: 'Starter',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F8EF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    name: 'Custom Automation',
    price: 'From $500',
    description: 'If you do it more than 10 times a week, we can automate it. Tell us what\'s eating your time.',
    highlights: ['Any repetitive task', 'Custom-built for you', 'Free scoping call'],
    tag: null,
  },
]

function Services() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const header = ref.current.querySelector('.services-header')
    const cards = ref.current.querySelectorAll('.service-card')
    const ctx = gsap.context(() => {
      if (header) {
        gsap.fromTo(header,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: ref.current!, start: 'top 80%', once: true } }
        )
      }
      gsap.fromTo(cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current!, start: 'top 80%', once: true } }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="services" className="py-20 md:py-28 relative">
      <div className="section-divider max-w-7xl mx-auto" />
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="services-header text-center mb-14">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">What We Build</p>
          <h2 className="heading-lg mb-4">
            AI Systems That Run<br />
            <span className="text-text-secondary">While You Don&apos;t</span>
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            Each system is custom-built for your business. No templates. No generic chatbots.
            Real automation that replaces real work.
          </p>
        </div>

        <AutomationPipeline />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div key={i} className="service-card group glass rounded-2xl p-7 card-hover relative overflow-hidden">
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-dim to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* Tag */}
                {s.tag && (
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-accent bg-accent-dim px-2.5 py-1 rounded-full mb-4">
                    {s.tag}
                  </span>
                )}

                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-accent-dim flex items-center justify-center mb-5">
                  {s.icon}
                </div>

                {/* Name + Price */}
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="text-lg font-semibold text-text">{s.name}</h3>
                  <span className="text-sm font-semibold text-accent ml-3 shrink-0">{s.price}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed mb-5">{s.description}</p>

                {/* Highlights */}
                <ul className="space-y-2">
                  {s.highlights.map((h, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-text-secondary">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7l3 3 5-5" stroke="#4F8EF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Tilt Step Card ─────────────────────────────────────────────────────────────
function TiltStep({ step }: { step: { num: string; title: string; desc: string; icon: React.ReactNode } }) {
  const { cardRef, glowRef, handleMouseMove, handleMouseLeave } = useTiltCard(8)
  const isMobile = useIsMobile()

  return (
    <div
      ref={cardRef}
      className="hiw-step text-center relative glass rounded-2xl p-8 cursor-default"
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
      style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      {/* Mouse-follow glow overlay */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
      />

      {/* Step icon with ring */}
      <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-surface border border-border mb-6 mx-auto">
        <div className="absolute inset-0 rounded-2xl bg-accent/5" />
        {step.icon}
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent text-[11px] font-bold text-white flex items-center justify-center">
          {step.num.replace('0', '')}
        </span>
      </div>

      <h3 className="text-xl font-semibold text-text mb-3">{step.title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed max-w-xs mx-auto">{step.desc}</p>
    </div>
  )
}

// ─── How It Works ───────────────────────────────────────────────────────────────
function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const header = ref.current.querySelector('.hiw-header')
    const steps = ref.current.querySelectorAll('.hiw-step')
    const line = ref.current.querySelector('.hiw-line')
    const ctx = gsap.context(() => {
      if (header) {
        gsap.fromTo(header,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: ref.current!, start: 'top 80%', once: true } }
        )
      }
      gsap.fromTo(steps,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current!, start: 'top 75%', once: true } }
      )
      if (line) {
        gsap.fromTo(line,
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: 'power2.inOut', transformOrigin: 'left center',
            scrollTrigger: { trigger: ref.current!, start: 'top 75%', once: true } }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  const steps = [
    {
      num: '01',
      title: 'Book a Free Call',
      desc: '20 minutes. We learn your business, identify the biggest time-wasters, and map out exactly what to automate.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4F8EF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
    },
    {
      num: '02',
      title: 'We Build It — Free',
      desc: 'We design and build your custom AI system at no cost to you. Real automation, not a template. Takes 5-10 business days.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4F8EF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
        </svg>
      ),
    },
    {
      num: '03',
      title: 'See It Live, Then Decide',
      desc: 'Full demo of your working system. If it doesn\'t blow your mind, walk away. You only pay when you\'re 100% satisfied.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4F8EF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
    },
  ]

  return (
    <section ref={ref} id="how-it-works" className="py-20 md:py-28 relative">
      <div className="section-divider max-w-7xl mx-auto" />
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="hiw-header text-center mb-16">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">How It Works</p>
          <h2 className="heading-lg mb-4">
            Zero Risk. Zero Hassle.<br />
            <span className="text-text-secondary">Here&apos;s How We Do It</span>
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line (desktop) */}
          <div className="hiw-line hidden md:block absolute top-16 left-[16%] right-[16%] h-px bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, i) => (
              <TiltStep key={i} step={step} />
            ))}
          </div>
        </div>

        {/* Guarantee callout */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl glass border border-accent/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span className="text-sm font-medium text-text">
              <span className="text-success font-semibold">The Virdar Guarantee:</span>{' '}
              You see it working before you spend a dime.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── ROI Calculator ─────────────────────────────────────────────────────────────
function ROICalculator() {
  const ref = useRef<HTMLDivElement>(null)
  const [hours, setHours] = useState(16)
  const [hourlyRate, setHourlyRate] = useState(35)
  const countRef = useRef<HTMLDivElement>(null)

  const weeklySaved = hours
  const monthlySaved = hours * 4
  const moneySavedMonthly = hours * 4 * hourlyRate
  const annualSavings = moneySavedMonthly * 12

  useEffect(() => {
    if (!ref.current) return
    const header = ref.current.querySelector('.calc-header')
    const body = ref.current.querySelector('.calc-body')
    const ctx = gsap.context(() => {
      if (header) {
        gsap.fromTo(header,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: ref.current!, start: 'top 80%', once: true } }
        )
      }
      if (body) {
        gsap.fromTo(body,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.2,
            scrollTrigger: { trigger: ref.current!, start: 'top 75%', once: true } }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="calculator" className="py-20 md:py-28 relative">
      <div className="section-divider max-w-7xl mx-auto" />
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="calc-header text-center mb-14">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">ROI Calculator</p>
          <h2 className="heading-lg mb-4">
            See What Automation<br />
            <span className="text-text-secondary">Saves Your Business</span>
          </h2>
          <p className="body-md max-w-xl mx-auto">
            SMB owners spend an average of 16 hours/week on admin tasks (Time Etc). McKinsey estimates AI can automate up to 57% of those hours.
          </p>
        </div>

        <div className="calc-body max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Globe visualization */}
          <div className="order-2 md:order-1">
            <ROIGlobe hours={hours} hourlyRate={hourlyRate} />
          </div>

          {/* Calculator panel */}
          <div className="order-1 md:order-2 glass rounded-3xl p-8">
            {/* Sliders */}
            <div className="space-y-8 mb-8">
              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <label className="text-sm font-medium text-text">Hours on admin/repetitive tasks per week</label>
                  <span className="text-lg font-bold text-accent">{hours}hrs</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-text-tertiary mt-1">
                  <span>5 hrs</span>
                  <span>40 hrs</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <label className="text-sm font-medium text-text">Your hourly rate (or staff cost)</label>
                  <span className="text-lg font-bold text-accent">${hourlyRate}/hr</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="100"
                  step="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-text-tertiary mt-1">
                  <span>$15/hr</span>
                  <span>$100/hr</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div ref={countRef} className="grid grid-cols-2 gap-3 mb-8">
              {[
                { value: `${weeklySaved}hrs`, label: 'Saved / week', color: 'text-text' },
                { value: `${monthlySaved}hrs`, label: 'Saved / month', color: 'text-text' },
                { value: `$${moneySavedMonthly.toLocaleString()}`, label: 'Monthly savings', color: 'text-accent' },
                { value: `$${annualSavings.toLocaleString()}`, label: 'Annual savings', color: 'text-success' },
              ].map((r, i) => (
                <div key={i} className="text-center p-3 rounded-xl bg-bg/50 border border-border">
                  <div className={`text-lg md:text-xl font-bold ${r.color} mb-0.5`}>{r.value}</div>
                  <div className="text-[10px] text-text-tertiary uppercase tracking-wider">{r.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">
              Get Your Custom ROI Breakdown
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ────────────────────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group cursor-pointer"
      >
        <span className="text-sm md:text-base font-medium text-text pr-4 group-hover:text-accent transition-colors">{q}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className={`shrink-0 text-text-tertiary transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
        >
          <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? contentRef.current?.scrollHeight : 0 }}
      >
        <p className="text-sm text-text-secondary leading-relaxed pb-5">{a}</p>
      </div>
    </div>
  )
}

function FAQ() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const header = ref.current.querySelector('.faq-header')
    const body = ref.current.querySelector('.faq-body')
    const ctx = gsap.context(() => {
      if (header) {
        gsap.fromTo(header,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: ref.current!, start: 'top 80%', once: true } }
        )
      }
      if (body) {
        gsap.fromTo(body,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.2,
            scrollTrigger: { trigger: ref.current!, start: 'top 75%', once: true } }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  const faqs = [
    {
      q: 'Do I need to be technical to use any of this?',
      a: 'No. We build it, set it up, and train it on your business. You just watch it run. If you can check your email, you can use our systems.',
    },
    {
      q: 'How long does it take to build?',
      a: 'Most systems are live within 5-10 business days. Simple automations (missed call text-back, review responses) can be done in under a week.',
    },
    {
      q: "What if I don't like it?",
      a: "Walk away. Seriously. We build it free, demo it live, and you only pay if you're 100% satisfied. There's zero risk.",
    },
    {
      q: 'What kinds of businesses do you work with?',
      a: 'Restaurants, dental and medical offices, law firms, salons, real estate agents, contractors, retail — any local business with customers and repetitive tasks.',
    },
    {
      q: 'Do I have to sign a long-term contract?',
      a: 'No contracts. One-time build fee. Optional monthly support if you want ongoing optimization, but zero obligation.',
    },
    {
      q: 'Will this work with my existing tools?',
      a: 'Yes. We integrate with Toast, Square, Google Business, Yelp, your phone system, CRM, and most tools you already use.',
    },
    {
      q: 'What happens after the system is built?',
      a: 'It runs automatically. We provide 30 days of free support post-launch. After that, optional support plans start at $200/month.',
    },
  ]

  return (
    <section ref={ref} id="faq" className="py-20 md:py-28 relative">
      <div className="section-divider max-w-7xl mx-auto" />
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <div className="faq-header text-center mb-14">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">FAQ</p>
          <h2 className="heading-lg">
            Questions? <span className="text-text-secondary">Answered.</span>
          </h2>
        </div>

        <div className="faq-body">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ──────────────────────────────────────────────────────────────────
function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const content = ref.current.querySelector('.final-cta-content')
    const ctx = gsap.context(() => {
      if (content) {
        gsap.fromTo(content,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: ref.current!, start: 'top 80%', once: true } }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-24 md:py-36 relative overflow-hidden">
      <div className="section-divider max-w-7xl mx-auto" />

      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="final-cta-content relative z-10 max-w-3xl mx-auto px-5 md:px-8 text-center">
        <h2 className="heading-lg mb-6">
          Stop Losing Customers<br />
          <span className="gradient-text">to Manual Work</span>
        </h2>
        <p className="body-lg max-w-xl mx-auto mb-10">
          Book a free 20-minute call. We&apos;ll map out what to automate,
          build it at no cost, and demo it live. You only pay if you want to keep it.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-10 py-4">
            Book Your Free Strategy Call
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <p className="text-xs text-text-tertiary mt-6">
          We build first, you pay after &middot; No obligations &middot; Based in Dallas, TX
        </p>
      </div>
    </section>
  )
}

// ─── Contact Form ───────────────────────────────────────────────────────────────
function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const form = e.currentTarget
      const data = new FormData(form)
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setSubmitted(true)
        form.reset()
      }
    } finally {
      setSubmitting(false)
    }
  }, [])

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <p className="text-lg font-semibold text-text mb-2">Thanks! We&apos;ll be in touch soon.</p>
        <p className="text-sm text-text-secondary">Usually within a few hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="name"
          type="text"
          placeholder="Your name"
          required
          className="w-full px-4 py-3 rounded-xl bg-bg border border-border text-text text-sm placeholder:text-text-tertiary focus:outline-none focus:border-accent/50 transition-colors"
        />
        <input
          name="email"
          type="email"
          placeholder="Email address"
          required
          className="w-full px-4 py-3 rounded-xl bg-bg border border-border text-text text-sm placeholder:text-text-tertiary focus:outline-none focus:border-accent/50 transition-colors"
        />
      </div>
      <input
        name="business"
        type="text"
        placeholder="Business name & type (e.g. Italian restaurant)"
        className="w-full px-4 py-3 rounded-xl bg-bg border border-border text-text text-sm placeholder:text-text-tertiary focus:outline-none focus:border-accent/50 transition-colors"
      />
      <textarea
        name="message"
        rows={3}
        placeholder="What's eating most of your time right now?"
        className="w-full px-4 py-3 rounded-xl bg-bg border border-border text-text text-sm placeholder:text-text-tertiary focus:outline-none focus:border-accent/50 transition-colors resize-none"
      />
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full justify-center disabled:opacity-50"
      >
        {submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}

// ─── Footer ─────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left */}
          <div>
            <Logo />
            <p className="text-sm text-text-tertiary mt-3 max-w-xs">
              AI automation systems for local businesses. Built in Dallas, TX.
            </p>
          </div>

          {/* Contact alternative */}
          <div className="glass rounded-2xl p-6 w-full md:w-auto md:min-w-[360px]">
            <p className="text-sm font-medium text-text mb-4">Prefer to write? Drop us a message.</p>
            <ContactForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-tertiary">
            &copy; {new Date().getFullYear()} Virdar. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-text-tertiary hover:text-text transition-colors">
              Book a Call
            </a>
            <a href="mailto:info@virdar.co" className="text-xs text-text-tertiary hover:text-text transition-colors">
              info@virdar.co
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    // Refresh ScrollTrigger after all content loads
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 100)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="min-h-screen bg-bg text-text relative noise">
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Problem />
        <Services />
        <HowItWorks />
        <ROICalculator />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
