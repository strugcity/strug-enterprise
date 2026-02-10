import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client, urlFor } from "@/lib/sanity";
import { blogPostBySlugQuery, allBlogPostsQuery } from "@/lib/queries";
import type { BlogPost } from "@/lib/types";

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts: BlogPost[] = await client.fetch(allBlogPostsQuery);
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

// Generate metadata for the blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post: BlogPost = await client.fetch(blogPostBySlugQuery, { slug });

  if (!post) {
    return {
      title: "Post Not Found — Strug City",
    };
  }

  return {
    title: `${post.title} — Strug City`,
    description: post.excerpt,
    openGraph: post.coverImage
      ? {
          images: [urlFor(post.coverImage).width(1200).height(630).url()],
        }
      : undefined,
  };
}

// Map category to CSS classes (reused from listing page)
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

// Helper to format date
function formatDate(dateString: string): string {
  if (!dateString) {
    return "Date unavailable";
  }
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Date unavailable";
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Custom Portable Text components
const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-12 mb-4 text-3xl font-bold tracking-tight text-text-primary">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-8 mb-3 text-2xl font-semibold tracking-tight text-text-primary">
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-6 leading-relaxed text-text-secondary">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-6 border-l-4 border-aurora-green pl-6 italic text-text-secondary">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-text-primary">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="rounded bg-card px-1.5 py-0.5 font-mono text-sm text-aurora-teal">
        {children}
      </code>
    ),
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href: string };
    }) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-aurora-green underline decoration-aurora-green/30 transition-colors hover:text-aurora-teal hover:decoration-aurora-teal/50"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({
      value,
    }: {
      value: {
        asset: { _ref: string };
        alt?: string;
        caption?: string;
      };
    }) => {
      if (!value?.asset) {
        return null;
      }
      return (
        <figure className="my-8">
          <img
            src={urlFor(value).width(1200).url()}
            alt={value.alt || ""}
            className="rounded-lg border border-border"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-text-muted">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({
      value,
    }: {
      value: {
        code: string;
        language?: string;
        filename?: string;
      };
    }) => {
      return (
        <div className="my-6">
          {value.filename && (
            <div className="rounded-t-lg border border-b-0 border-border bg-card px-4 py-2 text-sm text-text-muted">
              {value.filename}
            </div>
          )}
          <pre
            className={`overflow-x-auto rounded-lg border border-border bg-card p-4 ${
              value.filename ? "rounded-t-none" : ""
            }`}
          >
            <code className="font-mono text-sm text-text-secondary">
              {value.code}
            </code>
          </pre>
        </div>
      );
    },
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post: BlogPost = await client.fetch(blogPostBySlugQuery, { slug });

  // Handle 404 for invalid slugs
  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute top-0 right-1/4 h-[400px] w-[500px] rounded-full bg-aurora-pink/5 blur-[100px]" />

        <div className="relative mx-auto max-w-3xl px-6 pb-16 pt-24 md:pt-32">
          {/* Back link */}
          <Link
            href="/blog"
            className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-aurora-green transition-colors hover:text-aurora-teal"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform group-hover:-translate-x-1"
            >
              <path
                d="M10 12L6 8l4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to blog
          </Link>

          {/* Metadata */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${getCategoryColor(post.category)}`}
            >
              {post.category}
            </span>
            <span className="text-sm text-text-muted">
              {formatDate(post.publishedAt)}
            </span>
            <span className="text-sm text-text-muted">&middot;</span>
            <span className="text-sm text-text-muted">
              {post.readTime} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="mt-6 text-lg leading-relaxed text-text-secondary">
            {post.excerpt}
          </p>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="mt-10">
              <img
                src={urlFor(post.coverImage).width(1200).height(600).url()}
                alt={post.coverImage.alt || post.title}
                className="w-full rounded-lg border border-border"
              />
            </div>
          )}
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-border-glow to-transparent" />
      </section>

      {/* Article Body */}
      <article className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-invert max-w-none">
            {post.body && <PortableText value={post.body} components={portableTextComponents} />}
          </div>
        </div>
      </article>

      {/* Back to Blog CTA */}
      <section className="border-t border-border py-12">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-medium text-aurora-green transition-colors hover:text-aurora-teal"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform group-hover:-translate-x-1"
            >
              <path
                d="M10 12L6 8l4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to all articles
          </Link>
        </div>
      </section>
    </>
  );
}
