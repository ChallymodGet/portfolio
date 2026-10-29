import { defineField, defineType } from "sanity";

export const ideTab = defineType({
  name: "ideTab",
  title: "About (IDE tab)",
  type: "document",
  fields: [
    defineField({
      name: "tabKey",
      title: "Tab key",
      type: "string",
      description: "Used internally — profile, stack, or metrics",
      options: {
        list: [
          { title: "profile.ts", value: "profile" },
          { title: "stack.json", value: "stack" },
          { title: "metrics.md", value: "metrics" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fileName",
      title: "File name in sidebar",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "code",
      title: "Code panel content",
      type: "text",
      rows: 16,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "preview",
      title: "Live preview text",
      type: "text",
      rows: 12,
      validation: (rule) => rule.required(),
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
    select: { title: "fileName", subtitle: "tabKey" },
  },
});
