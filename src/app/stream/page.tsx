import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Progress Stream — Strug City",
  description:
    "Follow along as Strug City builds in the open. Real-time updates on product development, milestones, and more.",
};

const streamEntries = [
  {
    date: "Feb 10, 2026",
    entries: [
      {
        time: "4:00 PM",
        type: "milestone",
        title: "Strug City Website Launch",
        description:
          "Our brand new web presence is officially live! We built it with Next.js, Tailwind CSS, and a whole lot of Northern Lights-inspired color. Explore our products, follow our progress, and get to know the team.",
        tags: ["Website", "Launch"],
      },
    ],
  },
  {
    date: "Feb 8, 2026",
    entries: [
      {
        time: "2:30 PM",
        type: "release",
        title: "AI Platform v0.2 — Agent Orchestration",
        description:
          "Major update to the Strug AI Platform: agents can now be orchestrated in multi-step workflows. Define complex pipelines where agents hand off tasks, share context, and collaborate to solve problems. This is the foundation for our automation vision.",
        tags: ["AI Platform", "v0.2", "Agents"],
      },
      {
        time: "10:00 AM",
        type: "engineering",
        title: "Migrated to Edge Runtime",
        description:
          "Completed migration of our API layer to edge runtime for lower latency and global distribution. Response times improved by ~40% for non-US users.",
        tags: ["Infrastructure", "Performance"],
      },
    ],
  },
  {
    date: "Feb 5, 2026",
    entries: [
      {
        time: "3:00 PM",
        type: "announcement",
        title: "Aurora Analytics: Beta Program Open",
        description:
          "We're opening up Aurora Analytics to early adopters. Get access to real-time data insights, AI-powered anomaly detection, and custom dashboards. We're looking for teams who want to push the boundaries of what analytics can do.",
        tags: ["Aurora Analytics", "Beta"],
      },
    ],
  },
  {
    date: "Feb 2, 2026",
    entries: [
      {
        time: "5:00 PM",
        type: "engineering",
        title: "NorthStar SDK: Streaming Support",
        description:
          "Added full streaming support to the NorthStar SDK. Developers can now stream LLM responses through our composable pipeline with backpressure handling and type-safe transforms.",
        tags: ["NorthStar SDK", "Streaming"],
      },
      {
        time: "11:00 AM",
        type: "research",
        title: "Glacier DB: Benchmarking HNSW vs IVF",
        description:
          "Published internal benchmarks comparing HNSW and IVF indexing strategies for our vector database. HNSW wins on recall@10 but IVF is more memory-efficient at scale. We're exploring a hybrid approach.",
        tags: ["Glacier DB", "Research"],
      },
    ],
  },
  {
    date: "Jan 28, 2026",
    entries: [
      {
        time: "4:30 PM",
        type: "milestone",
        title: "First Multi-Agent Pipeline Completed",
        description:
          "Our AI Platform successfully ran its first end-to-end multi-agent pipeline: code review → test generation → documentation update. Three agents working together autonomously. A small step for software, a giant leap for Strug City.",
        tags: ["AI Platform", "Milestone"],
      },
    ],
  },
  {
    date: "Jan 24, 2026",
    entries: [
      {
        time: "1:00 PM",
        type: "announcement",
        title: "Strug City Formed",
        description:
          "We're making it official. Strug City is a virtual engineering team building AI-powered tools and platforms. We're starting with four products in various stages of development, and we're committed to building in the open. Follow along!",
        tags: ["Company", "Launch"],
      },
    ],
  },
];

const typeStyles: Record<string, { bg: string; dot: string }> = {
  milestone: { bg: "bg-aurora-green/10 text-aurora-green", dot: "bg-aurora-green" },
  release: { bg: "bg-aurora-teal/10 text-aurora-teal", dot: "bg-aurora-teal" },
  announcement: { bg: "bg-aurora-purple/10 text-aurora-purple", dot: "bg-aurora-purple" },
  engineering: { bg: "bg-aurora-blue/10 text-aurora-blue", dot: "bg-aurora-blue" },
  research: { bg: "bg-aurora-pink/10 text-aurora-pink", dot: "bg-aurora-pink" },
};

export default function StreamPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute top-0 left-1/3 h-[400px] w-[500px] rounded-full bg-aurora-green/5 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-24 md:pt-32">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-aurora-green animate-pulse" />
            <span className="text-sm font-medium text-aurora-green">Live</span>
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            Progress{" "}
            <span className="aurora-gradient-text">Stream</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
            We build in the open. Follow real-time updates on our products,
            engineering decisions, milestones, and research.
          </p>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-border-glow to-transparent" />
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-12">
            {streamEntries.map((day) => (
              <div key={day.date}>
                {/* Date header */}
                <div className="mb-6 flex items-center gap-4">
                  <span className="text-sm font-semibold text-text-primary">
                    {day.date}
                  </span>
                  <div className="h-px flex-1 bg-border/50" />
                </div>

                {/* Day entries */}
                <div className="space-y-4">
                  {day.entries.map((entry) => {
                    const style = typeStyles[entry.type] ?? typeStyles.engineering;
                    return (
                      <div
                        key={entry.title}
                        className="glass-card rounded-2xl p-6"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`h-2 w-2 rounded-full ${style.dot}`} />
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${style.bg}`}
                          >
                            {entry.type}
                          </span>
                          <span className="text-xs text-text-muted">
                            {entry.time}
                          </span>
                        </div>
                        <h3 className="mt-3 text-lg font-semibold text-text-primary">
                          {entry.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                          {entry.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {entry.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-border bg-surface/50 px-3 py-1 text-xs text-text-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
