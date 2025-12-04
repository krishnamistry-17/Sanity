import { SanityDocument } from "next-sanity";
import { sanityFetch } from "../sanity/lib/fetch";
import { postsQuery } from "../sanity/lib/queries";
import PostsPage from "./posts/page";

export default async function HomePage() {
  const posts = await sanityFetch<SanityDocument[]>({ query: postsQuery });
  console.log("posts", posts);

  return (
    <main>
      <PostsPage searchParams={{ page: "1" }} />
    </main>
  );
}
