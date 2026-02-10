import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { allProductsQuery } from "@/lib/queries";
import type { Product } from "@/lib/types";

export const metadata: Metadata = {
  title: "Products — Strug City",
  description:
    "Explore the Strug City portfolio of AI-powered products and projects.",
};

// Map accentColor to CSS classes
function getColorClasses(accentColor: Product["accentColor"]) {
  const colorMap = {
    "aurora-pink": {
      glowClass: "glow-pink",
      borderClass: "border-aurora-pink/30",
      tagClass: "bg-aurora-pink/10 text-aurora-pink",
      statusClass: "bg-aurora-pink/10 text-aurora-pink",
      iconClass: "text-aurora-pink",
    },
    "aurora-teal": {
      glowClass: "glow-teal",
      borderClass: "border-aurora-teal/30",
      tagClass: "bg-aurora-teal/10 text-aurora-teal",
      statusClass: "bg-aurora-teal/10 text-aurora-teal",
      iconClass: "text-aurora-teal",
    },
    "aurora-purple": {
      glowClass: "glow-purple",
      borderClass: "border-aurora-purple/30",
      tagClass: "bg-aurora-purple/10 text-aurora-purple",
      statusClass: "bg-aurora-purple/10 text-aurora-purple",
      iconClass: "text-aurora-purple",
    },
    "aurora-blue": {
      glowClass: "glow-blue",
      borderClass: "border-aurora-blue/30",
      tagClass: "bg-aurora-blue/10 text-aurora-blue",
      statusClass: "bg-aurora-blue/10 text-aurora-blue",
      iconClass: "text-aurora-blue",
    },
    "aurora-green": {
      glowClass: "glow-green",
      borderClass: "border-aurora-green/30",
      tagClass: "bg-aurora-green/10 text-aurora-green",
      statusClass: "bg-aurora-green/10 text-aurora-green",
      iconClass: "text-aurora-green",
    },
    "aurora-cyan": {
      glowClass: "glow-cyan",
      borderClass: "border-aurora-cyan/30",
      tagClass: "bg-aurora-cyan/10 text-aurora-cyan",
      statusClass: "bg-aurora-cyan/10 text-aurora-cyan",
      iconClass: "text-aurora-cyan",
    },
  };
  // Fallback to aurora-green if color not found
  return colorMap[accentColor] ?? colorMap["aurora-green"];
}

export default async function ProductsPage() {
  let products: Product[] = [];
  let fetchError = false;
  
  try {
    products = await client.fetch(allProductsQuery);
  } catch (error) {
    console.error("Error fetching products from Sanity:", error);
    fetchError = true;
  }
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute top-0 left-1/4 h-[400px] w-[600px] rounded-full bg-aurora-teal/5 blur-[100px]" />
        <div className="absolute top-10 right-1/4 h-[300px] w-[400px] rounded-full bg-aurora-purple/5 blur-[80px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-24 md:pt-32">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Our{" "}
            <span className="aurora-gradient-text">Products</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
            We build AI-powered tools and platforms that help engineering teams
            work smarter, ship faster, and build better software.
          </p>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-border-glow to-transparent" />
      </section>

      {/* Product Cards */}
      <section className="py-16 md:py-24" id="featured">
        <div className="mx-auto max-w-7xl px-6">
          {fetchError || products.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card/50 p-12 text-center">
              <p className="text-lg text-text-secondary">
                {fetchError
                  ? "Unable to load products at the moment. Please try again later."
                  : "No products available at the moment. Check back soon!"}
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {products.map((product) => {
                const colorClasses = getColorClasses(product.accentColor);
                return (
                  <div
                    key={product._id}
                    className={`rounded-2xl border ${colorClasses.borderClass} bg-card/50 p-8 transition-all hover:bg-card-hover/50 ${colorClasses.glowClass} md:p-12`}
                  >
                    <div className="grid gap-8 md:grid-cols-2">
                      <div>
                        <div className="flex items-center gap-3">
                          <h2 className="text-2xl font-bold text-text-primary md:text-3xl">
                            {product.name}
                          </h2>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${colorClasses.statusClass}`}
                          >
                            {product.status}
                          </span>
                        </div>
                        <p className="mt-4 text-base leading-relaxed text-text-secondary">
                          {product.description}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {product.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`rounded-full px-3 py-1 text-xs font-medium ${colorClasses.tagClass}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
                          Key Features
                        </h3>
                        <ul className="space-y-3">
                          {product.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center gap-3 text-sm text-text-secondary"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className={`shrink-0 ${colorClasses.iconClass}`}
                              >
                                <path
                                  d="M4 8l3 3 5-6"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-border-glow to-transparent" />

      {/* CTA */}
      <section className="relative py-24">
        <div className="absolute inset-0 aurora-animated opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Interested in what we&apos;re building?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
            Follow our progress stream for real-time updates on all our
            products and projects.
          </p>
          <Link
            href="/stream"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-xl aurora-gradient-bg px-8 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Follow Progress Stream
          </Link>
        </div>
      </section>
    </>
  );
}
