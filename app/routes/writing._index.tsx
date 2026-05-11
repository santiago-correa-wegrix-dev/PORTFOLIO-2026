import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useIntlayer } from "react-intlayer";
import { Link, useLoaderData } from "react-router";

import { type PostMeta, getAllPosts } from "~/utils/posts.server";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const viewport = { margin: "-60px", once: true };
const transition = { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const };

export function meta() {
  return [
    { title: "Writing | Santiago Correa" },
    {
      content: "Thoughts on engineering, AI, and building products.",
      name: "description",
    },
  ];
}

export function loader() {
  return { posts: getAllPosts() };
}

export default function Writing() {
  const { posts } = useLoaderData<typeof loader>();
  const { title, subtitle, minRead } = useIntlayer("writing");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-6 pt-32 pb-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20"
          >
            <h1 className="mb-4 font-display text-6xl font-bold tracking-tighter md:text-8xl">
              {title}
            </h1>
            <p className="font-mono text-sm text-muted-foreground">{subtitle}</p>
          </motion.div>

          <div className="flex flex-col">
            {posts.map((post: PostMeta, idx: number) => (
              <motion.div
                key={post.slug}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                transition={{ ...transition, delay: idx * 0.05 }}
              >
                <Link
                  to={`/writing/${post.slug}`}
                  className="group flex flex-col gap-3 border-t border-border py-8 transition-colors hover:border-foreground/20 md:flex-row md:items-start md:justify-between md:gap-12"
                >
                  <div className="flex flex-col gap-2">
                    <h2 className="font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                      {post.title}
                    </h2>
                    <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
                      {post.description}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {post.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-6 md:flex-col md:items-end md:gap-3">
                    <span className="font-mono text-xs text-muted-foreground">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {post.readingTime} {minRead}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                  </div>
                </Link>
              </motion.div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </div>
    </div>
  );
}
