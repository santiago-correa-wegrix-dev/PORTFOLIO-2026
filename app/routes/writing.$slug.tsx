import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useIntlayer } from "react-intlayer";
import ReactMarkdown from "react-markdown";
import { Link, type LoaderFunctionArgs, useLoaderData } from "react-router";
import remarkGfm from "remark-gfm";

import { JsonLd } from "~/components/ui/json-ld";
import { type Post, getPost } from "~/utils/posts.server";
import { writingSchema } from "~/schemas/writing";

export function meta({ matches }: { matches: { data?: unknown }[] }) {
  const data = matches.at(-1)?.data as { post: Post } | undefined;
  if (!data) {
    return [{ title: "Post not found" }];
  }
  const { post } = data;
  const postUrl = `https://wegrix.dev/writing/${post.slug}`;
  const tags = post.tags.join(", ");
  return [
    { title: `${post.title} | Santiago Correa` },
    { content: post.description, name: "description" },
    { content: tags, name: "keywords" },
    { content: postUrl, rel: "canonical" },
    { content: `${post.title} | Santiago Correa`, property: "og:title" },
    { content: post.description, property: "og:description" },
    { content: "article", property: "og:type" },
    { content: postUrl, property: "og:url" },
    { content: "https://wegrix.dev/og-image.jpg", property: "og:image" },
    { content: "summary_large_image", property: "twitter:card" },
    { content: new Date(post.date).toISOString(), property: "article:published_time" },
    { content: "Santiago Correa", property: "article:author" },
    { content: tags, property: "article:tag" },
  ];
}

export function loader({ params }: LoaderFunctionArgs) {
  try {
    const post = getPost(params.slug!);
    return { post };
  } catch {
    throw new Response("Not Found", { status: 404 });
  }
}

export default function WritingPost() {
  const { post } = useLoaderData<typeof loader>();
  const { back, minRead } = useIntlayer("writing");

  return (
    <>
      <JsonLd data={writingSchema(post)} />
      <div className="min-h-screen bg-background text-foreground">
        <div className="fixed left-5 top-5 z-50 md:left-8 md:top-6">
          <Link
            to="/writing"
            className="group flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2.5 text-xs font-medium text-muted-foreground shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:bg-muted/20 hover:text-foreground active:scale-95"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">{back}</span>
          </Link>
        </div>

        <div className="px-6 pb-32 pt-28 md:px-12 lg:px-24">
          <div className="mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              <div className="mb-6 flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="mb-6 font-display text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 border-t border-border pt-6 font-mono text-xs text-muted-foreground">
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="h-px w-4 bg-border" />
                <span>
                  {post.readingTime} {minRead}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-foreground prose-a:underline-offset-4 prose-code:font-mono prose-code:text-sm prose-pre:border prose-pre:border-border prose-pre:bg-zinc-950 dark:prose-pre:bg-zinc-900"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
