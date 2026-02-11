import { ImageResponse } from "next/og";
import { client } from "@/lib/sanity";
import { blogPostBySlugQuery } from "@/lib/queries";
import { BlogPost } from "@/lib/types";

export const runtime = "edge";
export const alt = "Strug City Blog";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Category colors matching our design system
const categoryColors: Record<string, string> = {
  engineering: "#00e87b",
  product: "#00ffdd",
  company: "#8b5cf6",
  research: "#2071f5",
  ai: "#23d1fc",
};

export default async function Image({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const post = await client.fetch<BlogPost>(blogPostBySlugQuery, { slug });

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#060611",
          }}
        >
          <div style={{ fontSize: 48, color: "#fff" }}>Post Not Found</div>
        </div>
      ),
      { ...size }
    );
  }

  const accentColor = categoryColors[post.category] || categoryColors.engineering;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#060611",
          backgroundImage: `radial-gradient(circle at 25% 25%, ${accentColor}33 0%, transparent 50%)`,
          padding: "80px",
        }}
      >
        {/* Category badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: accentColor,
              textTransform: "uppercase",
              letterSpacing: "1px",
              padding: "8px 16px",
              backgroundColor: `${accentColor}22`,
              borderRadius: "6px",
            }}
          >
            {post.category}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.2,
            marginBottom: "24px",
            maxWidth: "1000px",
          }}
        >
          {post.title}
        </div>

        {/* Excerpt */}
        <div
          style={{
            fontSize: 28,
            color: "rgba(255, 255, 255, 0.7)",
            lineHeight: 1.4,
            maxWidth: "900px",
            marginBottom: "auto",
          }}
        >
          {post.excerpt.substring(0, 150)}
          {post.excerpt.length > 150 ? "..." : ""}
        </div>

        {/* Footer with branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              background: `linear-gradient(135deg, #00e87b 0%, ${accentColor} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Strug City Blog
          </div>
          <div
            style={{
              fontSize: 24,
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
            {post.readTime} min read
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
