import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { allStreamEntriesQuery } from "@/lib/queries";
import type { StreamEntry } from "@/lib/types";

export const metadata: Metadata = {
  title: "Progress Stream — Strug City",
  description:
    "Follow along as Strug City builds in the open. Real-time updates on product development, milestones, and more.",
};

// Helper to format date like "Feb 10, 2026"
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Helper to format time like "4:00 PM"
function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// Helper to get date key for grouping (YYYY-MM-DD)
function getDateKey(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}

// Group entries by date
function groupEntriesByDate(entries: StreamEntry[]) {
  const grouped = new Map<string, { date: string; entries: StreamEntry[] }>();
  
  entries.forEach((entry) => {
    const dateKey = getDateKey(entry.publishedAt);
    const formattedDate = formatDate(entry.publishedAt);
    
    if (!grouped.has(dateKey)) {
      grouped.set(dateKey, { date: formattedDate, entries: [] });
    }
    grouped.get(dateKey)!.entries.push(entry);
  });
  
  // Convert to array and sort by date (newest first)
  return Array.from(grouped.values()).sort((a, b) => {
    const dateA = new Date(a.entries[0].publishedAt);
    const dateB = new Date(b.entries[0].publishedAt);
    return dateB.getTime() - dateA.getTime();
  });
}

const typeStyles: Record<string, { bg: string; dot: string }> = {
  milestone: { bg: "bg-aurora-green/10 text-aurora-green", dot: "bg-aurora-green" },
  release: { bg: "bg-aurora-teal/10 text-aurora-teal", dot: "bg-aurora-teal" },
  announcement: { bg: "bg-aurora-purple/10 text-aurora-purple", dot: "bg-aurora-purple" },
  engineering: { bg: "bg-aurora-blue/10 text-aurora-blue", dot: "bg-aurora-blue" },
  research: { bg: "bg-aurora-pink/10 text-aurora-pink", dot: "bg-aurora-pink" },
};

export default async function StreamPage() {
  let streamEntries: StreamEntry[] = [];
  let fetchError = false;
  
  try {
    streamEntries = await client.fetch(allStreamEntriesQuery);
  } catch (error) {
    console.error("Error fetching stream entries from Sanity:", error);
    fetchError = true;
  }
  
  // Group entries by date
  const groupedEntries = groupEntriesByDate(streamEntries);
  
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
          {fetchError || groupedEntries.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card/50 p-12 text-center">
              <p className="text-lg text-text-secondary">
                {fetchError
                  ? "Unable to load stream entries at the moment. Please try again later."
                  : "No stream entries available at the moment. Check back soon!"}
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {groupedEntries.map((day) => (
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
                      const time = formatTime(entry.publishedAt);
                      return (
                        <div
                          key={entry._id}
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
                              {time}
                            </span>
                          </div>
                          <h3 className="mt-3 text-lg font-semibold text-text-primary">
                            {entry.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                            {entry.description}
                          </p>
                          {entry.tags && entry.tags.length > 0 && (
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
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
