import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Strug City",
  description:
    "Articles, insights, and deep dives from the Strug City engineering team.",
};

const blogPosts = [
  {
    slug: "why-we-build-in-the-open",
    title: "Why We Build in the Open",
    excerpt:
      "Transparency isn't just a value — it's a strategy. Here's why Strug City shares our entire development process publicly, and how it makes us build better software.",
    date: "Feb 10, 2026",
    readTime: "5 min read",
    category: "Company",
    categoryColor: "bg-aurora-purple/10 text-aurora-purple",
  },
  {
    slug: "multi-agent-orchestration-patterns",
    title: "Multi-Agent Orchestration: Patterns That Actually Work",
    excerpt:
      "After months of building our AI Platform, we've learned which multi-agent patterns deliver real value and which are hype. A practical guide to agent orchestration.",
    date: "Feb 6, 2026",
    readTime: "12 min read",
    category: "Engineering",
    categoryColor: "bg-aurora-teal/10 text-aurora-teal",
  },
  {
    slug: "designing-for-ai-native-developer-experience",
    title: "Designing for AI-Native Developer Experience",
    excerpt:
      "What does a truly AI-native DX look like? Not just wrapping GPT in a CLI. We share our design principles for the NorthStar SDK and how we think about developer ergonomics in the age of AI.",
    date: "Feb 1, 2026",
    readTime: "8 min read",
    category: "Design",
    categoryColor: "bg-aurora-pink/10 text-aurora-pink",
  },
  {
    slug: "vector-search-at-scale",
    title: "Vector Search at Scale: Lessons from Building Glacier DB",
    excerpt:
      "Benchmarking HNSW vs IVF, handling billion-scale datasets, and why we're building our own vector database from scratch instead of using an existing solution.",
    date: "Jan 29, 2026",
    readTime: "15 min read",
    category: "Research",
    categoryColor: "bg-aurora-green/10 text-aurora-green",
  },
  {
    slug: "minnesota-to-the-cloud",
    title: "From Minnesota to the Cloud: The Strug City Origin Story",
    excerpt:
      "How a group of engineers from the Land of 10,000 Lakes came together to build AI-powered software. Our Northern Lights-inspired brand wasn't just an aesthetic choice.",
    date: "Jan 24, 2026",
    readTime: "6 min read",
    category: "Company",
    categoryColor: "bg-aurora-purple/10 text-aurora-purple",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute top-0 right-1/4 h-[400px] w-[500px] rounded-full bg-aurora-pink/5 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-24 md:pt-32">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            <span className="aurora-gradient-text">Blog</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
            Deep dives, engineering insights, and stories from the Strug City
            team. We write about what we learn as we build.
          </p>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-border-glow to-transparent" />
      </section>

      {/* Blog Posts */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="glass-card group rounded-2xl p-8 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${post.categoryColor}`}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-text-muted">{post.date}</span>
                  <span className="text-xs text-text-muted">&middot;</span>
                  <span className="text-xs text-text-muted">
                    {post.readTime}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-text-primary transition-colors group-hover:text-aurora-green md:text-2xl">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {post.excerpt}
                </p>
                <div className="mt-6">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-aurora-green transition-colors group-hover:text-aurora-teal">
                    Read article
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M6 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
