import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { allBlogPostsQuery } from "@/lib/queries";
import type { BlogPost } from "@/lib/types";

export const metadata: Metadata = {
  title: "Blog — Strug City",
  description:
    "Articles, insights, and deep dives from the Strug City engineering team.",
};

// Map category to CSS classes
function getCategoryColor(category: BlogPost["category"]) {
  const categoryMap = {
    Company: "bg-aurora-purple/10 text-aurora-purple",
    Engineering: "bg-aurora-teal/10 text-aurora-teal",
    Design: "bg-aurora-pink/10 text-aurora-pink",
    Research: "bg-aurora-green/10 text-aurora-green",
    Product: "bg-aurora-blue/10 text-aurora-blue",
  };
  return categoryMap[category] ?? "bg-aurora-green/10 text-aurora-green";
}

// Helper to format date like "Feb 10, 2026"
function formatDate(dateString: string): string {
  if (!dateString) {
    return "Date unavailable";
  }
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.warn(`Invalid date format received: ${dateString}`);
    return "Date unavailable";
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPage() {
  let blogPosts: BlogPost[] = [];
  let fetchError = false;
  
  try {
    blogPosts = await client.fetch(allBlogPostsQuery);
  } catch (error) {
    console.error("Error fetching blog posts from Sanity:", error);
    fetchError = true;
  }
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
          {fetchError || blogPosts.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card/50 p-12 text-center">
              <p className="text-lg text-text-secondary">
                {fetchError
                  ? "Unable to load blog posts at the moment. Please try again later."
                  : "No blog posts available at the moment. Check back soon!"}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {blogPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="block"
                >
                  <article className="glass-card group rounded-2xl p-8 transition-all">
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getCategoryColor(post.category)}`}
                      >
                        {post.category}
                      </span>
                      <span className="text-xs text-text-muted">
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="text-xs text-text-muted">&middot;</span>
                      <span className="text-xs text-text-muted">
                        {post.readTime} min read
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
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
