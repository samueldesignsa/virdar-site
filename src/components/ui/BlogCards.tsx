import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import type { BlogPost } from '../../data/blogPosts'

interface BlogCardsProps {
  posts: BlogPost[]
}

export function BlogCards({ posts }: BlogCardsProps) {
  const shouldReduceMotion = useReducedMotion()
  const shouldAnimate = !shouldReduceMotion

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {posts.map((post, i) => (
        <motion.a
          key={post.id}
          href={`/blog/${post.slug}.html`}
          className="group rounded-2xl border border-border bg-surface overflow-hidden no-underline transition-all hover:border-border-hover"
          initial={shouldAnimate ? { opacity: 0, y: 24, filter: 'blur(4px)' } : {}}
          whileInView={shouldAnimate ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: i * 0.1, ease: 'easeOut' as const }}
          whileHover={shouldAnimate ? { y: -4, transition: { type: 'spring', stiffness: 400, damping: 25 } } : {}}
        >
          {/* Gradient header */}
          <div className={`relative h-44 bg-gradient-to-br ${post.gradient} bg-surface`}>
            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span className="rounded-full bg-bg/60 backdrop-blur-sm border border-border px-3 py-1 text-xs font-medium text-text-secondary">
                {post.category}
              </span>
            </div>
            {/* Abstract visual element */}
            <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <div className="h-20 w-20 rounded-full border-2 border-text" />
              <div className="absolute top-3 left-3 h-14 w-14 rounded-full border border-text" />
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-3 text-xs text-text-tertiary mb-3">
              <span>{post.date}</span>
              <span className="h-1 w-1 rounded-full bg-text-tertiary" />
              <span className="flex items-center gap-1">
                <Clock size={12} aria-hidden="true" />
                {post.readTime}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-text leading-snug group-hover:text-accent transition-colors line-clamp-2">
              {post.title}
            </h3>

            <p className="mt-2 text-sm text-text-secondary leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>

            <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
              Read more
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  )
}
