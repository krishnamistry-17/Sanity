import { SanityDocument } from "next-sanity";
import { sanityFetch } from "../../sanity/lib/fetch";
import { AuthorQuery } from "../../sanity/lib/queries";

export default async function AuthorPage() {
  const authors = await sanityFetch<SanityDocument[]>({ query: AuthorQuery });
  console.log("authors", authors);
  return (
    <main>
      <h1>Authors</h1>
      <div>
        {authors.map((author) => (
          <div key={author._id}>written by{author.name}</div>
        ))}
      </div>
    </main>
  );
}
