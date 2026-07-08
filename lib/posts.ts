import { prisma } from "@/lib/prisma";
import type { Post } from "@/lib/generated/prisma/client";
import type { Locale } from "@/lib/i18n";

export type { Post };

export type LocalizedPost = {
  title: string;
  summary: string;
  content: string;
  /** true when showing English because no Dutch translation exists */
  isFallback: boolean;
};

export function localizePost(post: Post, locale: Locale): LocalizedPost {
  if (locale === "nl" && post.titleNl && post.contentNl) {
    return {
      title: post.titleNl,
      summary: post.summaryNl ?? post.summary,
      content: post.contentNl,
      isFallback: false,
    };
  }
  return {
    title: post.title,
    summary: post.summary,
    content: post.content,
    isFallback: locale !== "en",
  };
}

export function parseTags(post: Post): string[] {
  return post.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

/** Only the dedicated list thumbnail; no image otherwise. */
export function postThumbnail(post: Post): string | null {
  return post.thumbnail ?? null;
}

export async function getPublishedPosts(): Promise<Post[]> {
  return prisma.post.findMany({
    where: { publishedAt: { not: null } },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  return prisma.post.findFirst({
    where: { slug, publishedAt: { not: null } },
  });
}

export async function getAllPosts(): Promise<Post[]> {
  return prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getPostById(id: string): Promise<Post | null> {
  return prisma.post.findUnique({ where: { id } });
}
