import { groq } from "next-sanity";

// ─── Products ───────────────────────────────────────────────

export const allProductsQuery = groq`
  *[_type == "product"] | order(order asc) {
    _id,
    name,
    slug,
    status,
    description,
    features,
    tags,
    accentColor,
    image,
    order
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    status,
    description,
    features,
    tags,
    accentColor,
    image
  }
`;

// ─── Blog Posts ─────────────────────────────────────────────

export const allBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    category,
    publishedAt,
    readTime,
    coverImage
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    category,
    publishedAt,
    readTime,
    coverImage
  }
`;

export const latestBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    excerpt,
    category,
    publishedAt,
    readTime
  }
`;

// ─── Stream Entries ─────────────────────────────────────────

export const allStreamEntriesQuery = groq`
  *[_type == "streamEntry"] | order(publishedAt desc) {
    _id,
    title,
    description,
    type,
    tags,
    publishedAt,
    source,
    sourceUrl
  }
`;

export const latestStreamEntriesQuery = groq`
  *[_type == "streamEntry"] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    description,
    type,
    tags,
    publishedAt
  }
`;

export const streamEntriesByTypeQuery = groq`
  *[_type == "streamEntry" && type == $type] | order(publishedAt desc) {
    _id,
    title,
    description,
    type,
    tags,
    publishedAt,
    source,
    sourceUrl
  }
`;
