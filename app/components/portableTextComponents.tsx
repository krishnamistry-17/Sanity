import Image from "next/image";
import type { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "../../sanity/lib/images";

export const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-6 mb-2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mt-4 mb-2">{children}</h3>
    ),
    normal: ({ children }) => <p className="leading-7">{children}</p>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-red-600">{children}</strong>
    ),
    em: ({ children }) => (
      <em className=" italic text-green-600 font-bold">{children}</em>
    ),
    underline: ({ children }) => (
      <u className=" underline hover:text-blue-800 text-blue-600">{children}</u>
    ),
    strike: ({ children }) => (
      <s className=" line-through font-bold">{children}</s>
    ),
    code: ({ children }) => (
      <code className="bg-gray-300 p-1 rounded">{children}</code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className="text-blue-600 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-5 text-lg">{children}</ul>
    ),
    number: ({ children }) => <ol className="list-decimal ml-5">{children}</ol>,
  },
};
