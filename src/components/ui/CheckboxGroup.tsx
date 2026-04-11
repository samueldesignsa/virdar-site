import {
  useRef, useState, useEffect, useCallback, createContext, useContext, forwardRef,
  type ReactNode, type HTMLAttributes, type RefObject,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: (string | undefined | null | false | Record<string, boolean>)[]) {
  return twMerge(clsx(inputs))
}

const springs = {
  fast: { type: 'spring' as const, duration: 0.08, bounce: 0 },
  moderate: { type: 'spring' as const, duration: 0.16, bounce: 0.15 },
}

const fontWeights = {
  normal: "'wght' 400",
  semibold: "'wght' 550",
}

const shape = {
  bg: 'rounded-[12px]',
  item: 'rounded-[12px]',
  focusRing: 'rounded-[12px]',
  mergedBg: 'rounded-[12px]',
}

// Proximity hover hook
interface ItemRect { top: number; height: number; left: number; width: number }

function useProximityHover<T extends HTMLElement>(containerRef: RefObject<T | null>) {
  const itemsRef = useRef(new Map<number, HTMLElement>())
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [itemRects, setItemRects] = useState<ItemRect[]>([])
  const itemRectsRef = useRef<ItemRect[]>([])
  const sessionRef = useRef(0)
  const rafIdRef = useRef<number | null>(null)

  const registerItem = useCallback((index: number, element: HTMLElement | null) => {
    if (element) itemsRef.current.set(index, element)
    else itemsRef.current.delete(index)
  }, [])

  const measureItems = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const containerRect = container.getBoundingClientRect()
    const rects: ItemRect[] = []
    itemsRef.current.forEach((element, index) => {
      const rect = element.getBoundingClientRect()
      rects[index] = {
        top: rect.top - containerRect.top + container.scrollTop - container.clientTop,
        height: rect.height,
        left: rect.left - containerRect.left + container.scrollLeft - container.clientLeft,
        width: rect.width,
      }
    })
    itemRectsRef.current = rects
    setItemRects(rects)
  }, [containerRef])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current)
    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null
      const container = containerRef.current
      if (!container) return
      const containerRect = container.getBoundingClientRect()
      const mouseY = e.clientY
      let closestIndex: number | null = null
      let closestDistance = Infinity
      let containingIndex: number | null = null
      const rects = itemRectsRef.current
      for (let i = 0; i < rects.length; i++) {
        const r = rects[i]
        if (!r) continue
        const itemStart = containerRect.top + container.clientTop + r.top - container.scrollTop
        const itemEnd = itemStart + r.height
        if (mouseY >= itemStart && mouseY <= itemEnd) containingIndex = i
        const center = itemStart + r.height / 2
        const dist = Math.abs(mouseY - center)
        if (dist < closestDistance) { closestDistance = dist; closestIndex = i }
      }
      setActiveIndex(containingIndex ?? closestIndex)
    })
  }, [containerRef])

  const handleMouseEnter = useCallback(() => { sessionRef.current += 1 }, [])
  const handleMouseLeave = useCallback(() => {
    if (rafIdRef.current !== null) { cancelAnimationFrame(rafIdRef.current); rafIdRef.current = null }
    setActiveIndex(null)
  }, [])

  useEffect(() => { return () => { if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current) } }, [])

  return {
    activeIndex, setActiveIndex, itemRects, sessionRef,
    handlers: { onMouseMove: handleMouseMove, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave },
    registerItem, measureItems,
  }
}

// Context
interface CheckboxGroupContextValue {
  registerItem: (index: number, element: HTMLElement | null) => void
  activeIndex: number | null
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null)
function useCheckboxGroup() {
  const ctx = useContext(CheckboxGroupContext)
  if (!ctx) throw new Error('useCheckboxGroup must be used within a CheckboxGroup')
  return ctx
}

// CheckboxGroup
interface CheckboxGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  checkedIndices: Set<number>
}

const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ children, checkedIndices, className, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const groupIdCounter = useRef(0)
    const prevGroupMap = useRef(new Map<number, number>())
    const { activeIndex, setActiveIndex, itemRects, sessionRef, handlers, registerItem, measureItems } =
      useProximityHover(containerRef)

    useEffect(() => { measureItems() }, [measureItems, children])

    const runs: { start: number; end: number }[] = []
    const sorted = [...checkedIndices].sort((a, b) => a - b)
    for (const idx of sorted) {
      const last = runs[runs.length - 1]
      if (last && idx === last.end + 1) last.end = idx
      else runs.push({ start: idx, end: idx })
    }

    const usedIds = new Set<number>()
    const newGroupMap = new Map<number, number>()
    const checkedGroups = runs.map((run) => {
      let stableId: number | null = null
      for (let i = run.start; i <= run.end; i++) {
        const prevId = prevGroupMap.current.get(i)
        if (prevId !== undefined && !usedIds.has(prevId)) { stableId = prevId; break }
      }
      const id = stableId ?? ++groupIdCounter.current
      usedIds.add(id)
      for (let i = run.start; i <= run.end; i++) newGroupMap.set(i, id)
      return { ...run, id }
    })
    prevGroupMap.current = newGroupMap

    const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
    const activeRect = activeIndex !== null ? itemRects[activeIndex] : null
    const focusRect = focusedIndex !== null ? itemRects[focusedIndex] : null
    const isHoveringOther = activeIndex !== null && !checkedIndices.has(activeIndex)

    return (
      <CheckboxGroupContext.Provider value={{ registerItem, activeIndex }}>
        <div
          ref={(node) => {
            (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
          }}
          onMouseEnter={handlers.onMouseEnter}
          onMouseMove={handlers.onMouseMove}
          onMouseLeave={handlers.onMouseLeave}
          onFocus={(e) => {
            const attr = (e.target as HTMLElement).closest('[data-proximity-index]')?.getAttribute('data-proximity-index')
            if (attr != null) {
              const idx = Number(attr)
              setActiveIndex(idx)
              setFocusedIndex((e.target as HTMLElement).matches(':focus-visible') ? idx : null)
            }
          }}
          onBlur={(e) => {
            if (containerRef.current?.contains(e.relatedTarget as Node)) return
            setFocusedIndex(null)
            setActiveIndex(null)
          }}
          onKeyDown={(e) => {
            const items = Array.from(containerRef.current?.querySelectorAll('[role="checkbox"]') ?? []) as HTMLElement[]
            const cur = items.indexOf(e.target as HTMLElement)
            if (cur === -1) return
            if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
              e.preventDefault()
              const next = e.key === 'ArrowDown' ? (cur + 1) % items.length : (cur - 1 + items.length) % items.length
              items[next].focus()
            }
          }}
          role="group"
          className={cn('relative flex flex-col gap-0.5 w-full max-w-full select-none', className)}
          {...props}
        >
          <AnimatePresence>
            {checkedGroups.map((group) => {
              const s = itemRects[group.start], e = itemRects[group.end]
              if (!s || !e) return null
              return (
                <motion.div
                  key={`group-${group.id}`}
                  className={`absolute ${shape.mergedBg} bg-accent/8 pointer-events-none`}
                  initial={false}
                  animate={{ top: s.top, left: Math.min(s.left, e.left), width: Math.max(s.width, e.width), height: e.top + e.height - s.top, opacity: isHoveringOther ? 0.8 : 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.12 } }}
                  transition={{ ...springs.moderate, opacity: { duration: 0.08 } }}
                />
              )
            })}
          </AnimatePresence>
          <AnimatePresence>
            {activeRect && (
              <motion.div
                key={sessionRef.current}
                className={`absolute ${shape.bg} bg-border/40 pointer-events-none`}
                initial={{ opacity: 0, top: activeRect.top, left: activeRect.left, width: activeRect.width, height: activeRect.height }}
                animate={{ opacity: 1, top: activeRect.top, left: activeRect.left, width: activeRect.width, height: activeRect.height }}
                exit={{ opacity: 0, transition: { duration: 0.06 } }}
                transition={{ ...springs.fast, opacity: { duration: 0.08 } }}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {focusRect && (
              <motion.div
                className={`absolute ${shape.focusRing} pointer-events-none z-20 border border-accent`}
                initial={false}
                animate={{ left: focusRect.left - 2, top: focusRect.top - 2, width: focusRect.width + 4, height: focusRect.height + 4 }}
                exit={{ opacity: 0, transition: { duration: 0.06 } }}
                transition={{ ...springs.fast, opacity: { duration: 0.08 } }}
              />
            )}
          </AnimatePresence>
          {children}
        </div>
      </CheckboxGroupContext.Provider>
    )
  }
)
CheckboxGroup.displayName = 'CheckboxGroup'

// CheckboxItem
interface CheckboxItemProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  index: number
  checked: boolean
  onToggle: () => void
}

const CheckboxItem = forwardRef<HTMLDivElement, CheckboxItemProps>(
  ({ label, index, checked, onToggle, className, ...props }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null)
    const hasMounted = useRef(false)
    const { registerItem, activeIndex } = useCheckboxGroup()

    useEffect(() => {
      registerItem(index, internalRef.current)
      return () => registerItem(index, null)
    }, [index, registerItem])

    useEffect(() => { hasMounted.current = true }, [])

    const isActive = activeIndex === index
    const skipAnimation = !hasMounted.current

    return (
      <div
        ref={(node) => {
          (internalRef as React.MutableRefObject<HTMLDivElement | null>).current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        data-proximity-index={index}
        tabIndex={0}
        role="checkbox"
        aria-checked={checked}
        aria-label={label}
        onClick={onToggle}
        onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onToggle() } }}
        className={cn(`relative z-10 flex items-center gap-2.5 ${shape.item} px-3 py-2 cursor-pointer outline-none`, className)}
        {...props}
      >
        <CheckboxPrimitive.Root
          checked={checked}
          onCheckedChange={() => onToggle()}
          tabIndex={-1}
          aria-hidden
          className="relative w-[18px] h-[18px] shrink-0 appearance-none bg-transparent p-0 border-0 outline-none cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={cn(
            'absolute inset-0 rounded-[5px] border-solid transition-all duration-75',
            checked ? 'border-[1.5px] border-accent' : isActive ? 'border-[1.5px] border-text-secondary' : 'border-[1.5px] border-border-hover'
          )} />
          <AnimatePresence>
            {checked && (
              <CheckboxPrimitive.Indicator forceMount asChild>
                <motion.svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="absolute inset-0 text-accent" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }}>
                  <motion.path
                    d="M6 12L10 16L18 8"
                    initial={{ pathLength: skipAnimation ? 1 : 0 }}
                    animate={{ pathLength: 1, transition: { duration: 0.08, ease: 'easeOut' } }}
                    exit={{ pathLength: 0, transition: { duration: 0.04, ease: 'easeIn' } }}
                  />
                </motion.svg>
              </CheckboxPrimitive.Indicator>
            )}
          </AnimatePresence>
        </CheckboxPrimitive.Root>
        <span className="inline-grid text-[13px]">
          <span className="col-start-1 row-start-1 invisible" style={{ fontVariationSettings: fontWeights.semibold }} aria-hidden="true">{label}</span>
          <span
            className={cn('col-start-1 row-start-1 transition-colors duration-75', checked || isActive ? 'text-text' : 'text-text-secondary')}
            style={{ fontVariationSettings: checked ? fontWeights.semibold : fontWeights.normal }}
          >
            {label}
          </span>
        </span>
      </div>
    )
  }
)
CheckboxItem.displayName = 'CheckboxItem'

export { CheckboxGroup, CheckboxItem }
