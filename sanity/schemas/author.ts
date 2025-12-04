import { defineType, defineField } from "sanity";

const author = defineType({
  title: "Author",
  name: "author",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", title: "Name" }),
    defineField({ name: "image", type: "image", title: "Image" }),
  ],
});

export default author;
