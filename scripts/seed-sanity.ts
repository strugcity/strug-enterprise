/**
 * Sanity CMS Seed Data Script
 * 
 * Populates Sanity with initial content:
 * - 4 products (Strug AI Platform, Aurora Analytics, NorthStar SDK, Glacier DB)
 * - 20+ stream entries (varied types: milestone, release, engineering, research, announcement)
 * - 5 blog posts (with Portable Text bodies)
 * 
 * Features:
 * - Idempotent: Can be re-run without duplicating content
 * - Uses Sanity mutation API
 * 
 * Usage:
 *   npm run seed
 * 
 * Requirements:
 *   SANITY_API_TOKEN environment variable must be set
 */

import { createClient } from "@sanity/client";

// Configuration
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ktfgvv39";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiToken = process.env.SANITY_API_TOKEN;

if (!apiToken) {
  console.error("❌ Error: SANITY_API_TOKEN environment variable is required");
  console.error("Generate a token at: https://www.sanity.io/manage/project/ktfgvv39/api#tokens");
  process.exit(1);
}

// Create client with write permissions
const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-02-10",
  token: apiToken,
  useCdn: false,
});

// Helper function to generate a unique document ID
function generateId(type: string, slug: string): string {
  return `${type}-${slug}`;
}

// Helper to check if document exists
async function documentExists(id: string): Promise<boolean> {
  const doc = await client.getDocument(id);
  return !!doc;
}

/**
 * Product Seed Data
 */
const products = [
  {
    _id: generateId("product", "strug-ai-platform"),
    _type: "product",
    name: "Strug AI Platform",
    slug: { _type: "slug", current: "strug-ai-platform" },
    status: "Beta",
    description: "AI agent orchestration for engineering workflows. Build, test, and deploy with autonomous agents that understand your codebase.",
    features: [
      "Multi-agent orchestration across development lifecycle",
      "Context-aware code generation and refactoring",
      "Automated PR reviews and security scanning",
      "Seamless GitHub integration",
      "Real-time collaboration between AI and human engineers",
    ],
    tags: ["AI", "DevOps", "Automation", "Engineering"],
    accentColor: "aurora-green",
    order: 1,
  },
  {
    _id: generateId("product", "aurora-analytics"),
    _type: "product",
    name: "Aurora Analytics",
    slug: { _type: "slug", current: "aurora-analytics" },
    status: "Alpha",
    description: "Real-time analytics with AI-powered anomaly detection. Transform data into insights with intelligent pattern recognition.",
    features: [
      "Real-time data streaming and processing",
      "AI-powered anomaly detection and alerting",
      "Custom dashboard builder with drag-and-drop",
      "Natural language query interface",
      "Predictive analytics and forecasting",
    ],
    tags: ["Analytics", "AI", "Data", "Monitoring"],
    accentColor: "aurora-teal",
    order: 2,
  },
  {
    _id: generateId("product", "northstar-sdk"),
    _type: "product",
    name: "NorthStar SDK",
    slug: { _type: "slug", current: "northstar-sdk" },
    status: "In Development",
    description: "Developer toolkit for AI-native applications. Build intelligent features into your apps with our comprehensive SDK.",
    features: [
      "Multi-language support (TypeScript, Python, Go)",
      "Pre-built AI components and templates",
      "Local development with cloud deployment",
      "Built-in testing and debugging tools",
      "Extensive documentation and examples",
    ],
    tags: ["SDK", "Developer Tools", "AI", "TypeScript", "Python"],
    accentColor: "aurora-blue",
    order: 3,
  },
  {
    _id: generateId("product", "glacier-db"),
    _type: "product",
    name: "Glacier DB",
    slug: { _type: "slug", current: "glacier-db" },
    status: "Research",
    description: "Experimental vector database optimized for AI workloads. High-performance similarity search with distributed architecture.",
    features: [
      "Lightning-fast vector similarity search",
      "Distributed architecture for horizontal scaling",
      "Support for multiple embedding models",
      "Hybrid search (vector + keyword)",
      "Built-in versioning and rollback",
    ],
    tags: ["Database", "Vector DB", "AI", "Research", "Performance"],
    accentColor: "aurora-purple",
    order: 4,
  },
];

/**
 * Stream Entry Seed Data
 */
const streamEntries: Array<{
  _id: string;
  _type: string;
  title: string;
  description: string;
  type: string;
  tags: string[];
  publishedAt: string;
  source: string;
  sourceUrl?: string;
}> = [
  {
    _id: generateId("streamEntry", "launch-announcement"),
    _type: "streamEntry",
    title: "🚀 Strug City Launches",
    description: "Announcing Strug City - a virtual engineering team building AI-powered tools and platforms. We're starting with AI agent orchestration for development workflows.",
    type: "announcement",
    tags: ["Launch", "Company"],
    publishedAt: "2026-01-15T09:00:00Z",
    source: "manual",
  },
  {
    _id: generateId("streamEntry", "strug-ai-beta"),
    _type: "streamEntry",
    title: "Strug AI Platform Beta Release",
    description: "Our flagship product enters beta! Multi-agent orchestration, automated PR reviews, and seamless GitHub integration.",
    type: "release",
    tags: ["Strug AI", "Beta", "Release"],
    publishedAt: "2026-01-20T14:00:00Z",
    source: "manual",
  },
  {
    _id: generateId("streamEntry", "aurora-alpha"),
    _type: "streamEntry",
    title: "Aurora Analytics Alpha Available",
    description: "Early access to Aurora Analytics with real-time streaming and AI anomaly detection.",
    type: "release",
    tags: ["Aurora Analytics", "Alpha"],
    publishedAt: "2026-01-25T10:30:00Z",
    source: "manual",
  },
  {
    _id: generateId("streamEntry", "vector-research"),
    _type: "streamEntry",
    title: "Vector Database Research Begins",
    description: "Starting research on Glacier DB - a next-generation vector database optimized for AI workloads. Initial benchmarks show 10x performance improvements.",
    type: "research",
    tags: ["Glacier DB", "Research", "Performance"],
    publishedAt: "2026-01-28T11:00:00Z",
    source: "manual",
  },
  {
    _id: generateId("streamEntry", "github-integration"),
    _type: "streamEntry",
    title: "Enhanced GitHub Integration",
    description: "Improved GitHub integration in Strug AI Platform with support for workflow automation and custom actions.",
    type: "engineering",
    tags: ["GitHub", "Integration", "Engineering"],
    publishedAt: "2026-02-01T16:00:00Z",
    source: "github",
    sourceUrl: "https://github.com/strugcity/strug-enterprise/pull/42",
  },
  {
    _id: generateId("streamEntry", "northstar-kickoff"),
    _type: "streamEntry",
    title: "NorthStar SDK Development Kicks Off",
    description: "Starting development of our comprehensive SDK for AI-native applications. First release targeting TypeScript and Python developers.",
    type: "milestone",
    tags: ["NorthStar SDK", "Development"],
    publishedAt: "2026-02-03T09:00:00Z",
    source: "manual",
  },
  {
    _id: generateId("streamEntry", "security-audit"),
    _type: "streamEntry",
    title: "Platform Security Audit Complete",
    description: "Completed comprehensive security audit of all products. Implementing additional safeguards for API authentication and data encryption.",
    type: "engineering",
    tags: ["Security", "Audit"],
    publishedAt: "2026-02-05T13:00:00Z",
    source: "manual",
  },
  {
    _id: generateId("streamEntry", "ml-pipeline"),
    _type: "streamEntry",
    title: "New ML Pipeline Architecture",
    description: "Redesigned machine learning pipeline for Aurora Analytics with improved model training and deployment workflows.",
    type: "engineering",
    tags: ["ML", "Architecture", "Aurora Analytics"],
    publishedAt: "2026-02-06T15:30:00Z",
    source: "manual",
  },
  {
    _id: generateId("streamEntry", "agent-collab-research"),
    _type: "streamEntry",
    title: "Multi-Agent Collaboration Patterns",
    description: "Research paper on collaboration patterns between AI agents. Exploring consensus mechanisms and task delegation strategies.",
    type: "research",
    tags: ["Research", "AI Agents", "Collaboration"],
    publishedAt: "2026-02-07T10:00:00Z",
    source: "manual",
  },
  {
    _id: generateId("streamEntry", "dashboard-builder"),
    _type: "streamEntry",
    title: "Visual Dashboard Builder Released",
    description: "Aurora Analytics now includes a drag-and-drop dashboard builder. Create custom visualizations without writing code.",
    type: "release",
    tags: ["Aurora Analytics", "Feature", "UX"],
    publishedAt: "2026-02-08T11:00:00Z",
    source: "manual",
  },
  {
    _id: generateId("streamEntry", "performance-improvements"),
    _type: "streamEntry",
    title: "40% Performance Improvement in Query Engine",
    description: "Optimized query execution in Aurora Analytics. Average query time reduced from 850ms to 510ms.",
    type: "engineering",
    tags: ["Performance", "Optimization"],
    publishedAt: "2026-02-08T17:00:00Z",
    source: "github",
    sourceUrl: "https://github.com/strugcity/aurora-analytics/pull/128",
  },
  {
    _id: generateId("streamEntry", "typescript-sdk-preview"),
    _type: "streamEntry",
    title: "NorthStar TypeScript SDK Preview",
    description: "Early preview of NorthStar SDK for TypeScript. Includes core AI components and integration examples.",
    type: "milestone",
    tags: ["NorthStar SDK", "TypeScript", "Preview"],
    publishedAt: "2026-02-09T09:00:00Z",
    source: "manual",
  },
  {
    _id: generateId("streamEntry", "distributed-vectors"),
    _type: "streamEntry",
    title: "Distributed Vector Search Breakthrough",
    description: "Glacier DB research achieves distributed vector search with 95% query accuracy and sub-50ms latency at scale.",
    type: "research",
    tags: ["Glacier DB", "Research", "Breakthrough"],
    publishedAt: "2026-02-09T14:00:00Z",
    source: "manual",
  },
  {
    _id: generateId("streamEntry", "api-v2-release"),
    _type: "streamEntry",
    title: "API v2 Released",
    description: "Major API upgrade with GraphQL support, improved authentication, and enhanced rate limiting.",
    type: "release",
    tags: ["API", "GraphQL", "Release"],
    publishedAt: "2026-02-10T10:00:00Z",
    source: "manual",
  },
  {
    _id: generateId("streamEntry", "code-review-ai"),
    _type: "streamEntry",
    title: "AI Code Review Assistant",
    description: "New AI assistant in Strug AI Platform provides intelligent code reviews with security scanning and best practice suggestions.",
    type: "engineering",
    tags: ["AI", "Code Review", "Security"],
    publishedAt: "2026-02-10T13:00:00Z",
    source: "github",
    sourceUrl: "https://github.com/strugcity/strug-ai/pull/256",
  },
  {
    _id: generateId("streamEntry", "python-sdk-launch"),
    _type: "streamEntry",
    title: "NorthStar Python SDK Launch",
    description: "Python SDK for NorthStar is now available. Includes scikit-learn integration and Jupyter notebook support.",
    type: "release",
    tags: ["NorthStar SDK", "Python", "Launch"],
    publishedAt: "2026-02-10T16:00:00Z",
    source: "manual",
  },
  {
    _id: generateId("streamEntry", "embedding-models"),
    _type: "streamEntry",
    title: "Multi-Model Embedding Support",
    description: "Aurora Analytics and Glacier DB now support multiple embedding models including OpenAI, Cohere, and custom models.",
    type: "engineering",
    tags: ["Embeddings", "ML", "Integration"],
    publishedAt: "2026-02-10T18:00:00Z",
    source: "manual",
  },
  {
    _id: generateId("streamEntry", "100k-milestone"),
    _type: "streamEntry",
    title: "🎉 100,000 API Requests Processed",
    description: "Major milestone reached! Our platform has processed over 100,000 API requests from developers worldwide.",
    type: "milestone",
    tags: ["Milestone", "Growth"],
    publishedAt: "2026-02-11T00:00:00Z",
    source: "api",
  },
  {
    _id: generateId("streamEntry", "nl-query-interface"),
    _type: "streamEntry",
    title: "Natural Language Query Interface",
    description: "Aurora Analytics introduces natural language queries. Ask questions in plain English and get instant insights.",
    type: "release",
    tags: ["Aurora Analytics", "NLP", "Feature"],
    publishedAt: "2026-02-11T00:15:00Z",
    source: "manual",
  },
  {
    _id: generateId("streamEntry", "agent-marketplace"),
    _type: "streamEntry",
    title: "Agent Marketplace Coming Soon",
    description: "Announcing the Strug AI Agent Marketplace - share and discover AI agents created by the community.",
    type: "announcement",
    tags: ["Marketplace", "Community", "Agents"],
    publishedAt: "2026-02-11T00:20:00Z",
    source: "manual",
  },
];

/**
 * Blog Post Seed Data (with Portable Text bodies)
 */
const blogPosts = [
  {
    _id: generateId("blogPost", "introducing-strug-city"),
    _type: "blogPost",
    title: "Introducing Strug City: Building the Future of AI-Powered Development",
    slug: { _type: "slug", current: "introducing-strug-city" },
    excerpt: "We're a virtual engineering team on a mission to make AI-powered development accessible to everyone. Learn about our vision and the products we're building.",
    category: "Company",
    publishedAt: "2026-01-15T09:00:00Z",
    readTime: 5,
    body: [
      {
        _type: "block",
        _key: "intro",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "intro1",
            text: "Today, we're excited to announce Strug City - a virtual engineering team building AI-powered tools and platforms that transform how software is developed.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "h2-1",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "h2-1-1",
            text: "Our Vision",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "vision",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "vision1",
            text: "We believe that AI agents will fundamentally change software development. Not by replacing developers, but by ",
            marks: [],
          },
          {
            _type: "span",
            _key: "vision2",
            text: "amplifying their capabilities",
            marks: ["strong"],
          },
          {
            _type: "span",
            _key: "vision3",
            text: ". Our products are designed to work alongside human engineers, handling routine tasks and enabling teams to focus on creative problem-solving.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "h2-2",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "h2-2-1",
            text: "What We're Building",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "products",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "products1",
            text: "We're launching with four core products:",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "product-1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "p1-1",
            text: "Strug AI Platform",
            marks: ["strong"],
          },
          {
            _type: "span",
            _key: "p1-2",
            text: " - AI agent orchestration for engineering workflows",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "product-2",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "p2-1",
            text: "Aurora Analytics",
            marks: ["strong"],
          },
          {
            _type: "span",
            _key: "p2-2",
            text: " - Real-time analytics with AI anomaly detection",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "product-3",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "p3-1",
            text: "NorthStar SDK",
            marks: ["strong"],
          },
          {
            _type: "span",
            _key: "p3-2",
            text: " - Developer toolkit for AI-native applications",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "product-4",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "p4-1",
            text: "Glacier DB",
            marks: ["strong"],
          },
          {
            _type: "span",
            _key: "p4-2",
            text: " - Experimental vector database for AI workloads",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "closing",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "closing1",
            text: "We're building in the open and shipping updates regularly. Follow our progress stream to see what we're working on.",
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _id: generateId("blogPost", "ai-code-review-best-practices"),
    _type: "blogPost",
    title: "AI-Powered Code Reviews: Best Practices and Patterns",
    slug: { _type: "slug", current: "ai-code-review-best-practices" },
    excerpt: "Learn how to effectively integrate AI agents into your code review process. We share lessons from building automated review systems at scale.",
    category: "Engineering",
    publishedAt: "2026-02-01T10:00:00Z",
    readTime: 8,
    body: [
      {
        _type: "block",
        _key: "intro",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "intro1",
            text: "Code reviews are critical for maintaining quality, but they're time-consuming. At Strug City, we've built AI agents that handle initial reviews, catching common issues before human reviewers step in.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "h2-1",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "h2-1-1",
            text: "The Problem with Traditional Reviews",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "problem",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "problem1",
            text: "Manual code reviews suffer from inconsistency, bottlenecks, and reviewer fatigue. Critical security issues can slip through when reviewers are overwhelmed.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "h2-2",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "h2-2-1",
            text: "AI-Augmented Review Process",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "process",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "process1",
            text: "Our AI agents perform three types of analysis:",
            marks: [],
          },
        ],
      },
      {
        _type: "code",
        _key: "code1",
        language: "typescript",
        code: "interface ReviewChecks {\n  security: SecurityAnalysis;\n  performance: PerformanceImpact;\n  style: StyleCompliance;\n  complexity: CodeComplexity;\n  tests: TestCoverage;\n}",
      },
      {
        _type: "block",
        _key: "h3-1",
        style: "h3",
        children: [
          {
            _type: "span",
            _key: "h3-1-1",
            text: "1. Security Analysis",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "security",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "security1",
            text: "Automated scanning for SQL injection, XSS vulnerabilities, and insecure dependencies. The AI flags potential issues and suggests fixes.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "h3-2",
        style: "h3",
        children: [
          {
            _type: "span",
            _key: "h3-2-1",
            text: "2. Performance Impact",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "performance",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "perf1",
            text: "Detecting expensive operations, memory leaks, and unnecessary re-renders. The agent provides benchmarks and optimization suggestions.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "h3-3",
        style: "h3",
        children: [
          {
            _type: "span",
            _key: "h3-3-1",
            text: "3. Style and Consistency",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "style",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "style1",
            text: "Ensuring code follows team conventions and best practices. This includes naming, structure, and documentation standards.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "quote",
        style: "blockquote",
        children: [
          {
            _type: "span",
            _key: "quote1",
            text: "AI code reviews reduced our review time by 60% while catching 40% more security issues.",
            marks: ["em"],
          },
        ],
      },
      {
        _type: "block",
        _key: "conclusion",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "conclusion1",
            text: "The key is using AI for initial triage, not replacement. Human reviewers still make the final call, but they can focus on architecture and design rather than catching typos.",
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _id: generateId("blogPost", "vector-database-architecture"),
    _type: "blogPost",
    title: "Building a Vector Database from Scratch: Architecture Decisions",
    slug: { _type: "slug", current: "vector-database-architecture" },
    excerpt: "Deep dive into the architecture of Glacier DB. Learn about our approach to distributed vector search, indexing strategies, and performance optimization.",
    category: "Research",
    publishedAt: "2026-02-05T14:00:00Z",
    readTime: 12,
    body: [
      {
        _type: "block",
        _key: "intro",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "intro1",
            text: "Vector databases are essential infrastructure for modern AI applications. We're building Glacier DB to address performance and scalability challenges we've encountered.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "h2-1",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "h2-1-1",
            text: "Why Build Another Vector Database?",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "why",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "why1",
            text: "Existing solutions struggle with three problems: high latency at scale, expensive indexing operations, and limited hybrid search capabilities. Glacier DB tackles each of these.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "h2-2",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "h2-2-1",
            text: "Core Architecture",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "architecture",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "arch1",
            text: "Glacier DB uses a three-tier architecture:",
            marks: [],
          },
        ],
      },
      {
        _type: "code",
        _key: "code1",
        language: "go",
        filename: "architecture.go",
        code: "type GlacierDB struct {\n  router    *QueryRouter    // Routes queries to shards\n  indexer   *VectorIndexer  // HNSW-based indexing\n  storage   *ShardedStorage // Distributed storage\n  cache     *VectorCache    // Hot vector cache\n}",
      },
      {
        _type: "block",
        _key: "h3-1",
        style: "h3",
        children: [
          {
            _type: "span",
            _key: "h3-1-1",
            text: "Query Router",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "router",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "router1",
            text: "Intelligent query routing based on vector characteristics. Uses learned heuristics to predict which shards contain relevant vectors.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "h3-2",
        style: "h3",
        children: [
          {
            _type: "span",
            _key: "h3-2-1",
            text: "Vector Indexer",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "indexer",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "indexer1",
            text: "Modified HNSW (Hierarchical Navigable Small World) graphs with dynamic layer optimization. Achieves 95%+ recall with sub-50ms latency.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "h3-3",
        style: "h3",
        children: [
          {
            _type: "span",
            _key: "h3-3-1",
            text: "Sharded Storage",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "storage",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "storage1",
            text: "Horizontal scaling through consistent hashing. Each shard maintains its own index and can handle queries independently.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "h2-3",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "h2-3-1",
            text: "Performance Results",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "results",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "results1",
            text: "Benchmarks against 10M vector dataset:",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "metrics",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "metrics1",
            text: "• Query latency: 45ms p95\n• Indexing throughput: 50K vectors/second\n• Memory usage: 60% reduction vs baseline\n• Recall@10: 96.3%",
            marks: ["code"],
          },
        ],
      },
      {
        _type: "block",
        _key: "conclusion",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "conclusion1",
            text: "Glacier DB is still in research phase, but early results are promising. We're planning an alpha release for Q2 2026.",
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _id: generateId("blogPost", "northstar-sdk-getting-started"),
    _type: "blogPost",
    title: "Getting Started with NorthStar SDK: Your First AI-Native App",
    slug: { _type: "slug", current: "northstar-sdk-getting-started" },
    excerpt: "A practical guide to building your first application with NorthStar SDK. Learn the core concepts and build a semantic search feature in 30 minutes.",
    category: "Product",
    publishedAt: "2026-02-09T10:00:00Z",
    readTime: 15,
    body: [
      {
        _type: "block",
        _key: "intro",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "intro1",
            text: "NorthStar SDK makes it easy to add AI capabilities to your applications. In this tutorial, we'll build a semantic search feature for a documentation site.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "h2-1",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "h2-1-1",
            text: "Installation",
            marks: [],
          },
        ],
      },
      {
        _type: "code",
        _key: "install",
        language: "bash",
        code: "npm install @strug-city/northstar\n# or\npip install northstar-sdk",
      },
      {
        _type: "block",
        _key: "h2-2",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "h2-2-1",
            text: "Core Concepts",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "concepts",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "concepts1",
            text: "NorthStar provides three main abstractions:",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "concept1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "c1-1",
            text: "Embeddings",
            marks: ["strong"],
          },
          {
            _type: "span",
            _key: "c1-2",
            text: " - Convert text to vectors",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "concept2",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "c2-1",
            text: "VectorStore",
            marks: ["strong"],
          },
          {
            _type: "span",
            _key: "c2-2",
            text: " - Store and search vectors",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "concept3",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "c3-1",
            text: "Agents",
            marks: ["strong"],
          },
          {
            _type: "span",
            _key: "c3-2",
            text: " - Orchestrate AI workflows",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "h2-3",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "h2-3-1",
            text: "Building Semantic Search",
            marks: [],
          },
        ],
      },
      {
        _type: "code",
        _key: "example",
        language: "typescript",
        filename: "search.ts",
        code: "import { NorthStar, VectorStore } from '@strug-city/northstar';\n\nconst ns = new NorthStar({\n  apiKey: process.env.NORTHSTAR_API_KEY,\n});\n\n// Create embeddings from documents\nconst docs = await ns.embeddings.create({\n  input: documentTexts,\n  model: 'text-embedding-3',\n});\n\n// Store in vector database\nconst store = new VectorStore('docs');\nawait store.add(docs);\n\n// Search semantically\nconst results = await store.search({\n  query: 'How do I deploy my app?',\n  limit: 5,\n});\n\nconsole.log(results);",
      },
      {
        _type: "block",
        _key: "h2-4",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "h2-4-1",
            text: "Adding Hybrid Search",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "hybrid",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "hybrid1",
            text: "Combine semantic and keyword search for better results:",
            marks: [],
          },
        ],
      },
      {
        _type: "code",
        _key: "hybrid-code",
        language: "typescript",
        code: "const results = await store.search({\n  query: 'deployment configuration',\n  limit: 5,\n  hybrid: {\n    semantic: 0.7,  // 70% semantic\n    keyword: 0.3,   // 30% keyword\n  },\n});",
      },
      {
        _type: "block",
        _key: "conclusion",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "conclusion1",
            text: "That's it! You've built a semantic search feature in less than 30 lines of code. Check out our ",
            marks: [],
          },
          {
            _type: "span",
            _key: "conclusion2",
            text: "full documentation",
            marks: ["strong"],
          },
          {
            _type: "span",
            _key: "conclusion3",
            text: " for advanced features like multi-language support, custom embeddings, and agent orchestration.",
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _id: generateId("blogPost", "aurora-analytics-nlp-queries"),
    _type: "blogPost",
    title: "Natural Language Analytics: Turning Questions into Insights",
    slug: { _type: "slug", current: "aurora-analytics-nlp-queries" },
    excerpt: "How Aurora Analytics transforms plain English questions into SQL queries and visualizations. A look at our NLP pipeline and query optimization.",
    category: "Engineering",
    publishedAt: "2026-02-11T00:15:00Z",
    readTime: 10,
    body: [
      {
        _type: "block",
        _key: "intro",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "intro1",
            text: "\"Show me the top 10 users by revenue this month.\" With Aurora Analytics, that's all you need to type. Our natural language interface converts questions into optimized queries and beautiful visualizations.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "h2-1",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "h2-1-1",
            text: "The Challenge",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "challenge",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "challenge1",
            text: "Most analytics tools require SQL knowledge or complex UI interactions. Non-technical users struggle to extract insights, creating bottlenecks.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "h2-2",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "h2-2-1",
            text: "NLP Pipeline Architecture",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "pipeline",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "pipeline1",
            text: "Our pipeline has four stages: parsing, schema mapping, query generation, and optimization.",
            marks: [],
          },
        ],
      },
      {
        _type: "code",
        _key: "pipeline-code",
        language: "typescript",
        filename: "nlp-pipeline.ts",
        code: "class NLPQueryPipeline {\n  async process(question: string): Promise<Query> {\n    // 1. Parse intent and entities\n    const parsed = await this.parser.parse(question);\n    \n    // 2. Map to database schema\n    const mapping = await this.mapper.mapToSchema(parsed);\n    \n    // 3. Generate SQL\n    const sql = await this.generator.generate(mapping);\n    \n    // 4. Optimize query\n    return this.optimizer.optimize(sql);\n  }\n}",
      },
      {
        _type: "block",
        _key: "h3-1",
        style: "h3",
        children: [
          {
            _type: "span",
            _key: "h3-1-1",
            text: "Intent Recognition",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "intent",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "intent1",
            text: "We use fine-tuned language models to identify query type (aggregation, comparison, trend analysis) and extract key parameters (metrics, dimensions, time ranges).",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "h3-2",
        style: "h3",
        children: [
          {
            _type: "span",
            _key: "h3-2-1",
            text: "Schema Mapping",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "mapping",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "mapping1",
            text: "The system learns your database schema and creates semantic mappings. It understands that \"customers\" might map to a \"users\" table, and \"this month\" means a WHERE clause on the date column.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "h2-3",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "h2-3-1",
            text: "Query Optimization",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "optimization",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "opt1",
            text: "Generated queries are automatically optimized:",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "opt-list",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "opt-list-1",
            text: "• Push filters down to database level\n• Use appropriate indexes\n• Cache common aggregations\n• Parallelize independent subqueries",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "quote",
        style: "blockquote",
        children: [
          {
            _type: "span",
            _key: "quote1",
            text: "Natural language queries execute in an average of 510ms - faster than most hand-written SQL.",
            marks: ["em"],
          },
        ],
      },
      {
        _type: "block",
        _key: "h2-4",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "h2-4-1",
            text: "Visualization Selection",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "visualization",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "viz1",
            text: "Aurora automatically chooses the best visualization based on query type. Time series get line charts, comparisons get bar charts, and distributions get histograms.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "conclusion",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "conclusion1",
            text: "The result is an analytics experience that feels magical - ask a question and get an answer immediately, no SQL required.",
            marks: [],
          },
        ],
      },
    ],
  },
];

/**
 * Seed function that creates documents in Sanity
 */
async function seedData() {
  console.log("🌱 Starting Sanity seed script...\n");

  let productsCreated = 0;
  let productsSkipped = 0;
  let streamsCreated = 0;
  let streamsSkipped = 0;
  let blogsCreated = 0;
  let blogsSkipped = 0;

  // Seed Products
  console.log("📦 Seeding products...");
  for (const product of products) {
    try {
      const exists = await documentExists(product._id);
      if (exists) {
        console.log(`  ⏭️  Product "${product.name}" already exists, skipping`);
        productsSkipped++;
      } else {
        await client.create(product);
        console.log(`  ✅ Created product: ${product.name}`);
        productsCreated++;
      }
    } catch (error) {
      console.error(`  ❌ Error creating product ${product.name}:`, error);
    }
  }

  // Seed Stream Entries
  console.log("\n🌊 Seeding stream entries...");
  for (const entry of streamEntries) {
    try {
      const exists = await documentExists(entry._id);
      if (exists) {
        console.log(`  ⏭️  Stream entry "${entry.title}" already exists, skipping`);
        streamsSkipped++;
      } else {
        await client.create(entry);
        console.log(`  ✅ Created stream entry: ${entry.title}`);
        streamsCreated++;
      }
    } catch (error) {
      console.error(`  ❌ Error creating stream entry ${entry.title}:`, error);
    }
  }

  // Seed Blog Posts
  console.log("\n📝 Seeding blog posts...");
  for (const post of blogPosts) {
    try {
      const exists = await documentExists(post._id);
      if (exists) {
        console.log(`  ⏭️  Blog post "${post.title}" already exists, skipping`);
        blogsSkipped++;
      } else {
        await client.create(post);
        console.log(`  ✅ Created blog post: ${post.title}`);
        blogsCreated++;
      }
    } catch (error) {
      console.error(`  ❌ Error creating blog post ${post.title}:`, error);
    }
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("✨ Seeding complete!\n");
  console.log(`📦 Products:       ${productsCreated} created, ${productsSkipped} skipped`);
  console.log(`🌊 Stream entries: ${streamsCreated} created, ${streamsSkipped} skipped`);
  console.log(`📝 Blog posts:     ${blogsCreated} created, ${blogsSkipped} skipped`);
  console.log("=".repeat(60));
}

// Run the seed function
seedData()
  .then(() => {
    console.log("\n✅ Seed script completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Seed script failed:", error);
    process.exit(1);
  });
