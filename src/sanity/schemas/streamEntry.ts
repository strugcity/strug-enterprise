import { defineField, defineType } from "sanity";

export const streamEntry = defineType({
  name: "streamEntry",
  title: "Stream Entry",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Entry Type",
      type: "string",
      options: {
        list: [
          { title: "Milestone", value: "milestone" },
          { title: "Release", value: "release" },
          { title: "Engineering", value: "engineering" },
          { title: "Research", value: "research" },
          { title: "Announcement", value: "announcement" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description: "Where this entry originated (e.g. github, manual, api)",
      options: {
        list: [
          { title: "Manual", value: "manual" },
          { title: "GitHub", value: "github" },
          { title: "API", value: "api" },
        ],
      },
      initialValue: "manual",
    }),
    defineField({
      name: "sourceUrl",
      title: "Source URL",
      type: "url",
      description: "Link to the original source (PR, commit, release, etc.)",
    }),
  ],
  orderings: [
    {
      title: "Published Date (Newest)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "type",
    },
  },
});
