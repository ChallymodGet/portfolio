import { defineArrayMember, defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category tag",
      type: "string",
      options: {
        list: [
          { title: "EdTech", value: "EdTech" },
          { title: "HealthTech", value: "HealthTech" },
          { title: "FinTech", value: "FinTech" },
          { title: "Enterprise", value: "Enterprise" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image path or URL",
      description: "e.g. /projects/shkula-hero.png or https://…",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "wireframeImage",
      title: "Wireframe image (optional)",
      type: "string",
    }),
    defineField({
      name: "finalImage",
      title: "Final image (optional)",
      type: "string",
    }),
    defineField({
      name: "behanceEmbedUrl",
      title: "Behance embed URL (optional)",
      type: "url",
    }),
    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", title: "Label" }),
            defineField({ name: "value", type: "string", title: "Value" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "challenges",
      title: "Challenge / solution pairs",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "problem", type: "text", title: "Challenge", rows: 2 }),
            defineField({ name: "solution", type: "text", title: "Solution", rows: 3 }),
          ],
        }),
      ],
    }),
    defineField({
      name: "techStack",
      title: "Tech stack tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
});
