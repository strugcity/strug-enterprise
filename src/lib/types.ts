import type { PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";

export interface SanitySlug {
  current: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: SanitySlug;
  status: "Research" | "Alpha" | "Beta" | "In Development" | "GA";
  description: string;
  features: string[];
  tags: string[];
  accentColor: "aurora-pink" | "aurora-teal" | "aurora-purple" | "aurora-blue" | "aurora-green" | "aurora-cyan";
  image?: SanityImageSource;
  order: number;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt: string;
  body?: PortableTextBlock[];
  category: "Company" | "Engineering" | "Design" | "Research" | "Product";
  coverImage?: SanityImageSource & { alt?: string };
  publishedAt: string;
  readTime: number;
}

export interface StreamEntry {
  _id: string;
  title: string;
  description: string;
  type: "milestone" | "release" | "engineering" | "research" | "announcement";
  tags: string[];
  publishedAt: string;
  source?: "manual" | "github" | "api";
  sourceUrl?: string;
}
