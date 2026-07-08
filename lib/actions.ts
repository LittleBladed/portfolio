"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { locales } from "@/lib/i18n";
import { isAuthorized } from "@/lib/auth";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function revalidatePost(slug: string) {
  for (const locale of locales) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/posts/${slug}`);
  }
}

// Browsers submit textarea content with \r\n; store clean \n.
function text(formData: FormData, field: string): string {
  return String(formData.get(field) ?? "").replace(/\r\n/g, "\n").trim();
}

function optional(formData: FormData, field: string): string | null {
  return text(formData, field) || null;
}

export async function savePost(formData: FormData) {
  if (!isAuthorized(String(formData.get("password") ?? ""))) {
    redirect(`/admin?error=${encodeURIComponent("Wrong admin password.")}`);
  }

  const id = String(formData.get("id") ?? "");
  const title = text(formData, "title");
  const summary = text(formData, "summary");
  const content = text(formData, "content");
  const tags = text(formData, "tags");
  const published = formData.get("published") === "on";
  const slug = slugify(text(formData, "slug") || title);

  if (!title || !summary || !content || !slug) {
    redirect(
      `/admin?error=${encodeURIComponent("Title, summary and content are required.")}`
    );
  }

  const existing = id ? await prisma.post.findUnique({ where: { id } }) : null;

  // Optional backdate; noon UTC avoids the date shifting across timezones.
  const dateInput = text(formData, "publishedDate");
  const backdate = dateInput ? new Date(`${dateInput}T12:00:00.000Z`) : null;
  const publishedAt = published
    ? (backdate && !Number.isNaN(backdate.getTime())
        ? backdate
        : (existing?.publishedAt ?? new Date()))
    : null;

  const data = {
    title,
    slug,
    summary,
    content,
    titleNl: optional(formData, "titleNl"),
    summaryNl: optional(formData, "summaryNl"),
    contentNl: optional(formData, "contentNl"),
    coverImage: optional(formData, "coverImage"),
    thumbnail: optional(formData, "thumbnail"),
    tags,
    publishedAt,
  };

  try {
    if (existing) {
      await prisma.post.update({ where: { id }, data });
      if (existing.slug !== slug) revalidatePost(existing.slug);
    } else {
      await prisma.post.create({ data });
    }
  } catch {
    redirect(
      `/admin?error=${encodeURIComponent(`Could not save — is the slug "${slug}" already taken?`)}`
    );
  }

  revalidatePost(slug);
  redirect("/admin");
}

export async function deletePost(formData: FormData) {
  if (!isAuthorized(String(formData.get("password") ?? ""))) {
    redirect(`/admin?error=${encodeURIComponent("Wrong admin password.")}`);
  }

  const id = String(formData.get("id") ?? "");
  const post = await prisma.post.findUnique({ where: { id } });
  if (post) {
    await prisma.post.delete({ where: { id } });
    revalidatePost(post.slug);
  }
  redirect("/admin");
}
