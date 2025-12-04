import { sanityFetch } from "../../../sanity/lib/fetch";
import { postQuery, postPathsQuery } from "../../../sanity/lib/queries";
import { urlFor } from "../../../sanity/lib/images";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "../../components/portableTextComponents";

export async function generateStaticParams() {
  const items = await sanityFetch<{ params: { slug: string } }[]>({
    query: postPathsQuery,
  });

  return items.map((i) => ({ slug: i.params.slug }));
}

export default async function PostDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await sanityFetch<{
    title?: string;
    content?: any;
    image?: any;
    author?: { name?: string; image?: any };
    publishedAt?: string;
  }>({
    query: postQuery,
    params: { slug: params.slug },
  });

  console.log("post", post);

  const src =
    post?.image &&
    urlFor(post.image).width(200).height(200).fit("crop").auto("format").url();

  return (
    <main className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">{post?.title || "Post"}</h1>
      <div className="flex items-center gap-2">
        {post?.author?.name ? (
          <p className="text-sm text-gray-600">By {post.author.name}</p>
        ) : null}
        <p>
          Uploaded on{" "}
          {post?.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString()
            : "N/A"}
        </p>
      </div>
      {src ? (
        <div className="mt-3">
          <Image
            src={src}
            alt={String(post?.title ?? "Post image")}
            width={200}
            height={200}
            className=" rounded"
            priority={false}
          />
        </div>
      ) : null}
      {post?.content ? (
        <div className="prose mt-4">
          <PortableText
            value={post.content}
            components={portableTextComponents}
          />
        </div>
      ) : null}
    </main>
  );
}
