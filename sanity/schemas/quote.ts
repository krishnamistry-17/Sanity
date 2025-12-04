import type { Rule } from "sanity";

const moods = [
  { title: "Motivation", value: "motivation" },
  { title: "Happy", value: "happy" },
  { title: "Sad", value: "sad" },
  { title: "Inspirational", value: "inspirational" },
  { title: "Wisdom", value: "wisdom" },
];

export default {
  name: "quote",
  title: "Quote",
  type: "document",
  fields: [
    {
      name: "text",
      title: "Text",
      type: "text",
      validation: (rule: Rule) => rule.required(),
    },
    { name: "author", title: "Author", type: "string" },
    {
      name: "mood",
      title: "Mood",
      type: "string",
      options: { list: moods },
    },
    { name: "date", title: "Date", type: "datetime" },
  ],
};

