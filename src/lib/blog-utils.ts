import type { BlogPost } from "./types";

// Map category to CSS classes
export function getCategoryColor(category: BlogPost["category"]) {
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
export function formatDate(dateString: string): string {
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
