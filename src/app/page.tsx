import Link from "next/link";
import { client } from "@/lib/sanity";
import { allProductsQuery, latestStreamEntriesQuery } from "@/lib/queries";
import type { Product, StreamEntry } from "@/lib/types";

// Helper to format date like "Feb 10, 2026"
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const colorMap: Record<Product["accentColor"], { border: string; glow: string; tag: string }> = {
  "aurora-pink": {
    border: "border-aurora-pink/30",
    glow: "glow-pink",
    tag: "bg-aurora-pink/10 text-aurora-pink",
  },
  "aurora-teal": {
    border: "border-aurora-teal/30",
    glow: "glow-teal",
    tag: "bg-aurora-teal/10 text-aurora-teal",
  },
  "aurora-purple": {
    border: "border-aurora-purple/30",
    glow: "glow-purple",
    tag: "bg-aurora-purple/10 text-aurora-purple",
  },
  "aurora-blue": {
    border: "border-aurora-blue/30",
    glow: "glow-blue",
    tag: "bg-aurora-blue/10 text-aurora-blue",
  },
  "aurora-green": {
    border: "border-aurora-green/30",
    glow: "glow-green",
    tag: "bg-aurora-green/10 text-aurora-green",
  },
  "aurora-cyan": {
    border: "border-aurora-cyan/30",
    glow: "glow-cyan",
    tag: "bg-aurora-cyan/10 text-aurora-cyan",
  },
};

const typeStyles: Record<string, string> = {
  milestone: "bg-aurora-green/10 text-aurora-green",
  release: "bg-aurora-teal/10 text-aurora-teal",
  announcement: "bg-aurora-purple/10 text-aurora-purple",
};

export default async function Home() {
  let products: Product[] = [];
  let streamEntries: StreamEntry[] = [];

  // Fetch products and stream entries from Sanity
  try {
    [products, streamEntries] = await Promise.all([
      client.fetch<Product[]>(allProductsQuery),
      client.fetch<StreamEntry[]>(latestStreamEntriesQuery, { limit: 3 }),
    ]);
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
  }

  // Limit products to first 3
  const featuredProducts = products.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute inset-0 aurora-animated" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-aurora-green/5 blur-[120px]" />
        <div className="absolute top-20 right-0 h-[400px] w-[400px] rounded-full bg-aurora-purple/5 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-32 md:pt-44 md:pb-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm text-text-secondary backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-aurora-green animate-pulse" />
              Building the future with AI
            </div>

            <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl md:leading-[1.1]">
              Engineering{" "}
              <span className="aurora-gradient-text">Tomorrow&apos;s</span>{" "}
              Software Today
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
              Strug City is a virtual engineering team crafting AI-powered tools
              and platforms. Rooted in Minnesota, building for the world.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex h-12 items-center justify-center rounded-xl aurora-gradient-bg px-8 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                Explore Products
              </Link>
              <Link
                href="/stream"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-card/50 px-8 text-sm font-semibold text-text-primary transition-colors hover:bg-card"
              >
                Follow Our Progress
              </Link>
            </div>
          </div>
        </div>

        {/* Divider gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-border-glow to-transparent" />
      </section>

      {/* Featured Products */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              What We&apos;re Building
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Our portfolio of products and projects pushing the boundaries of
              AI engineering.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredProducts.map((product) => {
              const colors = colorMap[product.accentColor];
              return (
                <Link
                  key={product._id}
                  href="/products"
                  className={`group rounded-2xl border ${colors.border} bg-card/50 p-8 transition-all hover:bg-card-hover/50 ${colors.glow}`}
                >
                  <h3 className="text-xl font-semibold text-text-primary group-hover:text-white">
                    {product.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {product.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full px-3 py-1 text-xs font-medium ${colors.tag}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-medium text-aurora-green transition-colors hover:text-aurora-teal"
            >
              View all products
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-border-glow to-transparent" />

      {/* Latest Updates */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Latest Updates
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Follow along as we build in the open.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-6">
            {streamEntries.map((entry) => (
              <div
                key={entry._id}
                className="glass-card rounded-2xl p-6 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      typeStyles[entry.type] ?? ""
                    }`}
                  >
                    {entry.type}
                  </span>
                  <span className="text-xs text-text-muted">
                    {formatDate(entry.publishedAt)}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-text-primary">
                  {entry.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {entry.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/stream"
              className="inline-flex items-center gap-2 text-sm font-medium text-aurora-green transition-colors hover:text-aurora-teal"
            >
              View all updates
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-border-glow to-transparent" />

      {/* CTA Section */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 aurora-animated opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Ready to see what&apos;s{" "}
            <span className="aurora-gradient-text">next</span>?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-text-secondary">
            Join us on our journey. Follow our progress stream, explore our
            products, or reach out to collaborate.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/stream"
              className="inline-flex h-12 items-center justify-center rounded-xl aurora-gradient-bg px-8 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Follow Progress Stream
            </Link>
            <Link
              href="/about"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-card/50 px-8 text-sm font-semibold text-text-primary transition-colors hover:bg-card"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
