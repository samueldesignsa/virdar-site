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
    id: '7',
    slug: 'ai-automation-for-property-management',
    title: 'AI Automation for Property Management: What It Actually Does',
    excerpt: 'Property managers lose hours every week to maintenance request routing, lease renewal follow-up, and tenant communication. Here\'s what AI automation actually looks like for a property management company.',
    category: 'Industry Deep Dives',
    readTime: '7 min read',
    date: 'April 17, 2026',
    gradient: 'from-emerald-500/15 via-emerald-500/5 to-transparent',
  },
  {
    id: '6',
    slug: 'ai-automation-for-dental-practices',
    title: 'AI Automation for Dental Practices: What It Actually Does',
    excerpt: 'Dental practices lose patients to slow recall, missed appointment reminders, and unreturned calls. Here\'s what AI automation actually looks like for a dental office.',
    category: 'Industry Deep Dives',
    readTime: '7 min read',
    date: 'April 16, 2026',
    gradient: 'from-sky-500/15 via-sky-500/5 to-transparent',
  },
  {
    id: '5',
    slug: 'ai-automation-for-law-firms',
    title: 'AI Automation for Law Firms: What Solo and Small Practices Are Missing',
    excerpt: 'Solo and small law firms lose clients every week to slow intake, missed consultations, and unreturned follow-ups. Here\'s what AI automation actually looks like for a small practice.',
    category: 'Industry Deep Dives',
    readTime: '7 min read',
    date: 'April 15, 2026',
    gradient: 'from-violet-500/15 via-violet-500/5 to-transparent',
  },
  {
    id: '4',
    slug: 'ai-automation-for-home-service-businesses',
    title: 'AI Automation for Home Service Businesses: What It Actually Does',
    excerpt: 'HVAC companies, plumbers, and electricians lose thousands every week to missed calls and dead estimates. Here\'s what automation actually looks like for a home service business.',
    category: 'Industry Deep Dives',
    readTime: '7 min read',
    date: 'April 14, 2026',
    gradient: 'from-teal-500/15 via-teal-500/5 to-transparent',
  },
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
