import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export interface PostFrontmatter {
  date: string;
  description: string;
  tags: string[];
  title: string;
}

export interface PostMeta extends PostFrontmatter {
  readingTime: number;
  slug: string;
}

export interface Post extends PostMeta {
  content: string;
}

function readingTime(content: string): number {
  return Math.ceil(content.trim().split(/\s+/u).length / 200);
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith(".md"));

  return files
    .map((file): PostMeta => {
      const slug = file.replace(".md", "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const frontmatter = data as PostFrontmatter;
      return Object.assign(frontmatter, { readingTime: readingTime(content), slug });
    })
    .toSorted(
      (prev: PostMeta, next: PostMeta) =>
        new Date(next.date).getTime() - new Date(prev.date).getTime(),
    );
}

export function getPost(slug: string): Post {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;
  return { ...frontmatter, content, readingTime: readingTime(content), slug };
}
