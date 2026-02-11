import { client } from "@/lib/sanity";
import { allStreamEntriesQuery } from "@/lib/queries";
import { StreamEntry } from "@/lib/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://strugcity.com";

export async function GET() {
  try {
    const entries = await client.fetch<StreamEntry[]>(allStreamEntriesQuery);

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Strug City Progress Stream</title>
    <link>${SITE_URL}/stream</link>
    <description>Development updates, milestones, and engineering decisions from Strug City</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/stream/feed.xml" rel="self" type="application/rss+xml" />
    ${entries
      .map(
        (entry) => `
    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${entry.sourceUrl || `${SITE_URL}/stream`}</link>
      <guid>${entry._id}</guid>
      <pubDate>${new Date(entry.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(entry.description)}</description>
      <category>${escapeXml(entry.type)}</category>
      ${entry.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

    return new Response(rss, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error generating stream RSS feed:", error);
    return new Response("Error generating RSS feed", { status: 500 });
  }
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
