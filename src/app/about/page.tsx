import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Strug City",
  description:
    "Learn about Strug City — a virtual engineering team from Minnesota building AI-powered tools and platforms.",
};

const values = [
  {
    title: "Build in the Open",
    description:
      "We share our progress, decisions, and learnings publicly. Transparency makes us accountable and helps the community.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-aurora-green">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "AI-First Engineering",
    description:
      "We don't just build AI products — we use AI throughout our engineering process. AI is a teammate, not just a tool.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-aurora-teal">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Ship, Learn, Iterate",
    description:
      "We favor velocity over perfection. Ship something real, learn from users, and iterate quickly. Progress over planning.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-aurora-purple">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Minnesota Roots",
    description:
      "Born in the Land of 10,000 Lakes. Our Northern Lights-inspired brand reflects where we come from and the beauty we find in technology.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-aurora-pink">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 12h20" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 2c2.5 3 4 6.5 4 10s-1.5 7-4 10c-2.5-3-4-6.5-4-10s1.5-7 4-10z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const stats = [
  { value: "4", label: "Products" },
  { value: "2026", label: "Founded" },
  { value: "100%", label: "AI-Powered" },
  { value: "MN", label: "Home Base" },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-aurora-green/5 blur-[120px]" />
        <div className="absolute top-20 left-0 h-[300px] w-[400px] rounded-full bg-aurora-pink/5 blur-[80px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-24 md:pt-32">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            About{" "}
            <span className="aurora-gradient-text">Strug City</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
            We&apos;re a virtual engineering team from Minnesota building
            AI-powered tools and platforms. We believe the future of software is
            intelligent, collaborative, and built in the open.
          </p>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-border-glow to-transparent" />
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div className="text-3xl font-bold aurora-gradient-text">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-text-secondary">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-border-glow to-transparent" />

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Our Story
          </h2>
          <div className="mt-8 space-y-6 text-base leading-relaxed text-text-secondary">
            <p>
              Strug City started with a simple observation: the best software
              tools are built by teams who use AI not just as a product feature,
              but as a core part of how they work. We wanted to build a team
              that embodies this principle from day one.
            </p>
            <p>
              Based in Minnesota, we draw inspiration from the Northern Lights
              that illuminate our winter skies — the same aurora colors that
              define our brand. There&apos;s something fitting about building
              the future of technology from a place known for its resilience,
              creativity, and natural beauty.
            </p>
            <p>
              We&apos;re building four products across the AI engineering
              stack: an intelligent automation platform, a real-time analytics
              engine, a developer SDK for AI-native apps, and an experimental
              vector database. Each one solves a real problem we&apos;ve
              encountered as engineers.
            </p>
            <p>
              Most importantly, we build in the open. Our progress stream
              shares every milestone, decision, and lesson learned. We believe
              transparency makes us better builders and helps the broader
              community learn alongside us.
            </p>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-border-glow to-transparent" />

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              What Drives Us
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              The principles that guide everything we build.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="glass-card rounded-2xl p-8"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {value.description}
                </p>
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
            Want to follow along?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
            Check out our progress stream for real-time updates, or explore
            the products we&apos;re building.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/stream"
              className="inline-flex h-12 items-center justify-center rounded-xl aurora-gradient-bg px-8 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Progress Stream
            </Link>
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-card/50 px-8 text-sm font-semibold text-text-primary transition-colors hover:bg-card"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
