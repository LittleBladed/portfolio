import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPublishedPostBySlug, localizePost, parseTags } from "@/lib/posts";
import { getDictionary, isLocale } from "@/lib/i18n";
import { formatDate } from "@/components/format-date";

type Props = PageProps<"/[locale]/posts/[slug]">;

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, slug } = await props.params;
  if (!isLocale(locale)) return {};
  const post = await getPublishedPostBySlug(slug);
  if (!post) return {};

  const localized = localizePost(post, locale);
  return {
    title: localized.title,
    description: localized.summary,
    alternates: {
      languages: {
        en: `/en/posts/${slug}`,
        nl: `/nl/posts/${slug}`,
      },
    },
  };
}

export default async function PostPage(props: Props) {
  const { locale, slug } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const localized = localizePost(post, locale);
  const tags = parseTags(post);

  return (
    <article className="fade-up mx-auto max-w-2xl space-y-10">
      <header className="space-y-5">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          <span aria-hidden>←</span> {dict.post.back}
        </Link>

        <h1 className="max-w-[24ch] font-display text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
          {localized.title}
        </h1>

        <p className="max-w-xl leading-relaxed text-muted">
          {localized.summary}
        </p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line pb-6">
          {post.publishedAt && (
            <time
              dateTime={post.publishedAt.toISOString()}
              className="font-mono text-xs text-faint"
            >
              {formatDate(post.publishedAt, locale)}
            </time>
          )}
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-chip px-2 py-0.5 font-mono text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {localized.isFallback && (
          <p className="border-l-2 border-line pl-4 text-sm italic text-muted">
            {dict.post.onlyInEnglish}
          </p>
        )}
      </header>

      {post.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImage}
          alt=""
          className="aspect-2/1 w-full rounded-lg border border-line object-cover"
        />
      )}

      <div className="prose prose-zinc max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {localized.content}
        </ReactMarkdown>
      </div>

      <footer className="border-t border-line pt-8">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          <span aria-hidden>←</span> {dict.post.back}
        </Link>
      </footer>
    </article>
  );
}
