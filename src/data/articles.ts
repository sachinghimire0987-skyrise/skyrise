import type { Article } from '@/types'
import { author, categories, tags } from './taxonomy'

const cat = (slug: string) => categories.find((c) => c.slug === slug)!
const tag = (slug: string) => tags.find((t) => t.slug === slug)!

// ---------------------------------------------------------------------------
// DEMO CONTENT — these five articles are placeholders shipped so the site
// is not empty on first run. They are clearly fictional/illustrative and
// should be replaced or removed from the admin panel once real content or a
// Supabase connection is in place. See README.md > "Adding Articles".
// ---------------------------------------------------------------------------

export const articles: Article[] = [
  {
    id: 'art-1',
    title: 'What Running a Delivery Network in Nepal Actually Teaches You',
    slug: 'what-running-a-delivery-network-in-nepal-actually-teaches-you',
    excerpt:
      'Targets look simple on a spreadsheet. On the ground, in Pokhara or anywhere else, they are a daily negotiation between people, roads, and weather.',
    content: `<p>Every logistics dashboard tells the same story in the same voice: a number went up, or it went down. What it does not tell you is why a vendor stopped creating orders on a Tuesday, or why a branch in the hills always misses its target during the monsoon.</p>
<p>Over the past few years of coordinating parcel volume across branches, I have come to believe that operational numbers are downstream of relationships, not the other way around. A branch does not hit its target because someone pushed harder. It hits its target because the team trusts the process enough to follow it without being watched.</p>
<h2>The vendor is not a line item</h2>
<p>It is easy to treat an inactive vendor as a churn statistic. In practice, most vendors go quiet for boring, fixable reasons: a delayed payment, a confusing return process, or simply nobody having called them in three weeks. Reactivation is rarely about a discount. It is about showing up.</p>
<blockquote>The fastest way to lose a vendor is to only call when the numbers are bad.</blockquote>
<h2>What actually moves a target</h2>
<p>Three things, in order: removing friction from the order-creation flow, making returns boring and predictable, and giving the field team language they can actually use with vendors instead of jargon from a slide deck.</p>
<p>None of this is glamorous. All of it compounds.</p>`,
    cover_image: null,
    author,
    category: cat('nepal'),
    tags: [tag('logistics'), tag('ecommerce')],
    published_at: '2026-06-02T05:30:00.000Z',
    updated_at: '2026-06-02T05:30:00.000Z',
    status: 'published',
    featured: true,
    views: 0,
    reading_time: 5,
    seo_title: 'What Running a Delivery Network in Nepal Actually Teaches You',
    seo_description:
      'Field notes on vendor activation, branch targets, and what actually moves logistics numbers in Nepal.',
  },
  {
    id: 'art-2',
    title: 'Vibe Coding: Building Software Without Waiting to Feel Ready',
    slug: 'vibe-coding-building-software-without-waiting-to-feel-ready',
    excerpt:
      'A short case for shipping small, ugly, working things instead of waiting for a complete plan.',
    content: `<p>There is a particular kind of paralysis that comes from wanting the first version of something to already be correct. I have started calling my own antidote to this "vibe coding" &mdash; not a methodology, just a permission slip to build the rough version first and let the shape of the problem reveal itself.</p>
<h2>Why this works</h2>
<p>Most of what I learn about a product comes from using a broken version of it, not from planning the finished one. A half-working prototype answers questions a specification document cannot.</p>
<h3>The rule I use</h3>
<p>If I can describe the smallest useful version of an idea in one sentence, I build that sentence before I build anything else.</p>`,
    cover_image: null,
    author,
    category: cat('technology'),
    tags: [tag('software'), tag('productivity')],
    published_at: '2026-05-18T09:00:00.000Z',
    updated_at: '2026-05-20T09:00:00.000Z',
    status: 'published',
    featured: true,
    views: 0,
    reading_time: 4,
    seo_title: 'Vibe Coding: Building Software Without Waiting to Feel Ready',
    seo_description: 'A short case for shipping small, working prototypes instead of waiting for a full plan.',
  },
  {
    id: 'art-3',
    title: 'The Slow Season Is Not the Enemy',
    slug: 'the-slow-season-is-not-the-enemy',
    excerpt:
      'Order volume drops every year around the same time. Treating it as an emergency every time is the real mistake.',
    content: `<p>Parcel volume dips predictably after major festival seasons. Every year, someone treats this as a crisis that requires a new strategy. Most of the time, it requires a calendar.</p>
<h2>Plan the dip, don\u2019t panic about it</h2>
<p>The teams that handle seasonal slowdowns best are the ones that used the previous peak to build a buffer &mdash; in vendor relationships, in cash flow, and in morale.</p>`,
    cover_image: null,
    author,
    category: cat('ideas'),
    tags: [tag('logistics'), tag('productivity')],
    published_at: '2026-04-11T09:00:00.000Z',
    updated_at: '2026-04-11T09:00:00.000Z',
    status: 'published',
    featured: false,
    views: 0,
    reading_time: 3,
    seo_title: 'The Slow Season Is Not the Enemy',
    seo_description: 'Why seasonal order-volume dips deserve a plan, not a panic.',
  },
  {
    id: 'art-4',
    title: 'सानो व्यापारीहरूको लागि डिजिटल भविष्य',
    slug: 'digital-future-for-small-vendors',
    excerpt:
      'नेपालका साना व्यापारीहरूले अनलाइन प्लेटफर्मबाट कसरी फाइदा लिन सक्छन् भन्ने बारे केही व्यावहारिक विचारहरू।',
    content: `<p>नेपालमा साना व्यापारीहरूका लागि डिजिटल प्लेटफर्महरूले नयाँ अवसरहरू खोलेका छन्, तर धेरैले अझै पनि यसको पूर्ण फाइदा लिन सकेका छैनन्।</p>
<h2>के फरक पार्छ</h2>
<p>नियमित संवाद, सजिलो अर्डर प्रक्रिया, र भरपर्दो डेलिभरी &mdash; यी तीन कुराले नै दीर्घकालीन भरोसा निर्माण गर्छ।</p>`,
    cover_image: null,
    author,
    category: cat('nepal'),
    tags: [tag('ecommerce'), tag('culture')],
    published_at: '2026-03-22T09:00:00.000Z',
    updated_at: '2026-03-22T09:00:00.000Z',
    status: 'published',
    featured: false,
    views: 0,
    reading_time: 3,
    seo_title: 'सानो व्यापारीहरूको लागि डिजिटल भविष्य',
    seo_description: 'नेपालका साना व्यापारीहरूका लागि डिजिटल प्लेटफर्मका व्यावहारिक फाइदाहरू।',
  },
  {
    id: 'art-5',
    title: 'On Writing in Public Without a Content Calendar',
    slug: 'on-writing-in-public-without-a-content-calendar',
    excerpt: 'A working note on why I publish irregularly on purpose, and what that trade-off actually costs.',
    content: `<p>This piece is a draft on purpose &mdash; a placeholder for the kind of personal, unfinished writing this site is meant to hold. It is not published, so it will not appear outside the admin panel.</p>
<p>Use this article as a template when writing your own drafts: replace the title, slug, and content below in <code>src/data/articles.ts</code> or, once Supabase is connected, in <code>/admin/articles/new</code>.</p>`,
    cover_image: null,
    author,
    category: cat('personal'),
    tags: [tag('writing'), tag('career')],
    published_at: null,
    updated_at: '2026-07-01T09:00:00.000Z',
    status: 'draft',
    featured: false,
    views: 0,
    reading_time: 2,
    seo_title: 'On Writing in Public Without a Content Calendar',
    seo_description: 'A working note on publishing irregularly on purpose.',
  },
]

export const publishedArticles = articles.filter((a) => a.status === 'published')
export const featuredArticles = publishedArticles.filter((a) => a.featured)
export const trendingArticles = [...publishedArticles].slice(0, 4)

export const findArticleBySlug = (slug: string) => articles.find((a) => a.slug === slug)
export const relatedArticles = (article: Article, limit = 3) =>
  publishedArticles
    .filter((a) => a.id !== article.id && a.category.id === article.category.id)
    .slice(0, limit)
