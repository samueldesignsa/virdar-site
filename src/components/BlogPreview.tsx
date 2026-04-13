import { motion } from 'framer-motion'
import { BlogCards } from './ui/BlogCards'
import { blogPosts } from '../data/blogPosts'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
}

export default function BlogPreview() {
  return (
    <section id="blog" className="bg-bg py-20 md:py-28 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14"
        >
          <div>
            <h2 className="heading-lg text-text">Insights</h2>
            <p className="body-lg mt-3 text-text-secondary max-w-[500px]">
              Practical thinking on AI automation for operations-heavy businesses.
            </p>
          </div>
          <a
            href="/blog/"
            className="inline-flex items-center gap-2 rounded-xl border border-border min-h-[44px] px-6 py-3 text-sm font-semibold text-text no-underline transition-all hover:border-accent hover:text-accent active:scale-95 shrink-0"
          >
            View All Posts
          </a>
        </motion.div>

        <BlogCards posts={blogPosts.slice(0, 3)} />
      </div>
    </section>
  )
}
