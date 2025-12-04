import { sanityFetch } from "../../sanity/lib/fetch";
import { postsPageQuery, postsCountQuery } from "../../sanity/lib/queries";
import Link from "next/link";
import { urlFor } from "../../sanity/lib/images";
import Image from "next/image";
import { portableTextComponents } from "../components/portableTextComponents";
import { PortableText } from "@portabletext/react";

export default async function PostsPage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  function blocksToPlainText(blocks: any): string {
    if (!Array.isArray(blocks)) return "";
    return blocks
      .filter((b) => b?._type === "block" && Array.isArray(b.children))
      .map((b) => b.children.map((span: any) => span?.text ?? "").join(""))
      .join("\n")
      .trim();
  }

  function getExcerpt(blocks: any, maxLen = 160): string {
    const text = blocksToPlainText(blocks);
    if (text.length <= maxLen) return text;
    const sliced = text.slice(0, maxLen);
    const lastSpace = sliced.lastIndexOf(" ");
    return (lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced).trim() + "…";
  }

  const pageSize = 6;
  const currentPage = Math.max(1, Number(searchParams?.page ?? "1") || 1);
  const offset = (currentPage - 1) * pageSize;
  const end = offset + pageSize;

  const [posts, total] = await Promise.all([
    sanityFetch<
      {
        _id: string;
        title?: string;
        content?: any;
        image?: any;
        slug?: string;
      }[]
    >({ query: postsPageQuery, params: { offset, end } }),
    sanityFetch<number>({ query: postsCountQuery }),
  ]);

  const totalPages = Math.max(1, Math.ceil((total || 0) / pageSize));

  return (
    <main className="p-8 space-y-6 mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold">Blog Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((p) => {
          const src =
            p?.image &&
            urlFor(p.image)
              .width(800)
              .height(500)
              .fit("crop")
              .auto("format")
              .url();
          const excerpt = getExcerpt(p?.content, 160);
          return (
            <article
              key={p._id}
              className="rounded-lg shadow-sm hover:shadow-md transition 
              overflow-hidden bg-white flex flex-col h-full"
            >
              {src ? (
                <Link
                  href={`/posts/${p.slug}`}
                  aria-label={String(p.title ?? "")}
                >
                  <Image
                    src={src}
                    alt={String(p.image?.alt ?? p.title ?? "Post image")}
                    width={800}
                    height={500}
                    className="h-48 w-full object-cover"
                    priority={false}
                  />
                </Link>
              ) : null}
              <div className="p-4 flex-1 flex flex-col">
                <Link
                  href={`/posts/${p.slug}`}
                  className="text-lg font-semibold hover:underline"
                >
                  {p.title}
                </Link>
                {/* <PortableText
                  value={p?.content}
                  components={portableTextComponents}
                /> */}
                {excerpt ? (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {excerpt}
                  </p>
                ) : null}
              </div>
              <Link
                href={`/posts/${p.slug}`}
                className="text-sm text-gray-500 mt-auto block py-2 px-4"
              >
                Read More
              </Link>
            </article>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-3 pt-4">
        <Link
          className={`px-3 py-1 rounded border ${
            currentPage <= 1
              ? "pointer-events-none opacity-50"
              : "hover:bg-gray-50"
          }`}
          href={currentPage <= 2 ? `/posts` : `/posts?page=${currentPage - 1}`}
          aria-disabled={currentPage <= 1}
        >
          Previous
        </Link>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <Link
          className={`px-3 py-1 rounded border ${
            currentPage >= totalPages
              ? "pointer-events-none opacity-50"
              : "hover:bg-gray-50"
          }`}
          href={`/posts?page=${Math.min(currentPage + 1, totalPages)}`}
          aria-disabled={currentPage >= totalPages}
        >
          Next
        </Link>
      </div>
    </main>
  );
}
