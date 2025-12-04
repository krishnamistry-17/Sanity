import { defineType, defineField } from "sanity";

const post = defineType({
  title: "Post",
  name: "post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({
      name: "author",
      type: "reference",
      title: "Author",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "content",
      type: "array",
      title: "Content",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Published At",
    }),
  ],
});

export default post;
