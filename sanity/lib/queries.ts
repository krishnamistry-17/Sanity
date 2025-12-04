import { groq } from "next-sanity";

export const postsQuery = groq`*[_type == "post"]{
  _id,
  title,
  "slug": slug.current,
  content,
  image,
  author->{_id, name, image},
  publishedAt
} | order(_createdAt desc)`;

// Get a single post by its slug
export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{ 
  _id, title, content, image, author->{_id, name, image}, publishedAt
}`;

// Get all post slugs
export const postPathsQuery = groq`*[_type == "post" && defined(slug.current)][]{
  "params": { "slug": slug.current }
}`;

export const postsPageQuery = groq`*[_type == "post"] 
  | order(coalesce(publishedAt, _createdAt) desc) [$offset...$end]{
    _id,
    title,
    "slug": slug.current,
    content,
    image,
    author->{_id, name, image},
    publishedAt
  }`;

export const postsCountQuery = groq`count(*[_type == "post"])`;
