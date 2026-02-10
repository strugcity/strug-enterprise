import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products — Strug City",
  description:
    "Explore the Strug City portfolio of AI-powered products and projects.",
};

const products = [
  {
    name: "Strug AI Platform",
    status: "In Development",
    description:
      "An intelligent automation platform that leverages AI agents to streamline engineering workflows and boost team productivity. From code review to deployment orchestration, our platform handles the heavy lifting.",
    features: [
      "Multi-agent orchestration",
      "Workflow automation",
      "Intelligent code review",
      "CI/CD integration",
      "Custom agent creation",
    ],
    tags: ["AI Agents", "Automation", "Platform"],
    accentColor: "aurora-green",
    glowClass: "glow-green",
    borderClass: "border-aurora-green/30",
    tagClass: "bg-aurora-green/10 text-aurora-green",
    statusClass: "bg-aurora-green/10 text-aurora-green",
  },
  {
    name: "Aurora Analytics",
    status: "Beta",
    description:
      "Real-time analytics and insights engine built for modern data pipelines. Visualize, analyze, and act on your data with AI-powered pattern detection and anomaly alerts.",
    features: [
      "Real-time data streaming",
      "AI anomaly detection",
      "Custom dashboards",
      "API-first architecture",
      "Team collaboration",
    ],
    tags: ["Analytics", "Data", "Real-time"],
    accentColor: "aurora-teal",
    glowClass: "glow-teal",
    borderClass: "border-aurora-teal/30",
    tagClass: "bg-aurora-teal/10 text-aurora-teal",
    statusClass: "bg-aurora-teal/10 text-aurora-teal",
  },
  {
    name: "NorthStar SDK",
    status: "Alpha",
    description:
      "A developer toolkit for building AI-native applications. Ship intelligent features faster with our composable, type-safe SDK. Works with any LLM provider.",
    features: [
      "Type-safe API",
      "LLM provider agnostic",
      "Composable primitives",
      "Streaming support",
      "Built-in observability",
    ],
    tags: ["SDK", "Developer Tools", "Open Source"],
    accentColor: "aurora-purple",
    glowClass: "glow-purple",
    borderClass: "border-aurora-purple/30",
    tagClass: "bg-aurora-purple/10 text-aurora-purple",
    statusClass: "bg-aurora-purple/10 text-aurora-purple",
  },
  {
    name: "Glacier DB",
    status: "Research",
    description:
      "An experimental vector database optimized for AI workloads. Designed for speed, scale, and seamless integration with modern AI pipelines and retrieval-augmented generation.",
    features: [
      "Vector similarity search",
      "Hybrid queries",
      "Auto-indexing",
      "RAG-optimized",
      "Distributed architecture",
    ],
    tags: ["Database", "Vectors", "AI Infrastructure"],
    accentColor: "aurora-blue",
    glowClass: "glow-teal",
    borderClass: "border-aurora-blue/30",
    tagClass: "bg-aurora-blue/10 text-aurora-blue",
    statusClass: "bg-aurora-blue/10 text-aurora-blue",
  },
];

export default function ProductsPage() {
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
          <div className="space-y-12">
            {products.map((product, i) => (
              <div
                key={product.name}
                className={`rounded-2xl border ${product.borderClass} bg-card/50 p-8 transition-all hover:bg-card-hover/50 ${product.glowClass} md:p-12`}
              >
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-text-primary md:text-3xl">
                        {product.name}
                      </h2>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${product.statusClass}`}
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
                          className={`rounded-full px-3 py-1 text-xs font-medium ${product.tagClass}`}
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
                            className={`shrink-0 text-${product.accentColor}`}
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
            ))}
          </div>
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
