export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  gradient: string
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'how-much-does-custom-ai-automation-cost',
    title: 'How Much Does Custom AI Automation Cost for a Small Business?',
    excerpt: 'The honest answer: most projects fall between $15K and $25K. Here\u2019s what determines where yours lands, and why the \u201Ccheap\u201D options usually cost more in the long run.',
    category: 'AI for Business',
    readTime: '6 min read',
    date: 'April 12, 2026',
    gradient: 'from-accent/20 via-accent/5 to-transparent',
  },
  {
    id: '2',
    slug: 'ai-automation-for-restaurants-what-it-looks-like',
    title: 'AI Automation for Restaurants: What It Actually Looks Like',
    excerpt: 'Forget chatbots and robot waiters. Real restaurant AI automation handles the back office: demand forecasting, staffing, inventory, and the 23 missed calls your host stand can\u2019t get to.',
    category: 'Industry Deep Dives',
    readTime: '8 min read',
    date: 'April 10, 2026',
    gradient: 'from-orange-500/15 via-orange-500/5 to-transparent',
  },
  {
    id: '3',
    slug: 'why-most-ai-projects-fail',
    title: 'Why Most AI Projects Fail (And How to Make Sure Yours Doesn\u2019t)',
    excerpt: '85% of AI projects never make it to production. The reason isn\u2019t the technology. It\u2019s the approach. Here\u2019s what separates the projects that deliver from the ones that become expensive experiments.',
    category: 'AI Strategy',
    readTime: '7 min read',
    date: 'April 8, 2026',
    gradient: 'from-red-500/15 via-red-500/5 to-transparent',
  },
]
