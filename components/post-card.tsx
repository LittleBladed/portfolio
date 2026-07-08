import Link from "next/link";
import { localizePost, type Post } from "@/lib/posts";
import type { Locale } from "@/lib/i18n";
import { formatDate } from "@/components/format-date";

export function PostRow({ post, locale }: { post: Post; locale: Locale }) {
  const localized = localizePost(post, locale);

  return (
    <li>
      <Link
        href={`/${locale}/posts/${post.slug}`}
        className="group flex items-baseline justify-between gap-6 py-5"
      >
        <div className="min-w-0">
          <h3 className="font-display text-lg font-medium tracking-tight transition-colors group-hover:text-accent">
            {localized.title}
          </h3>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">
            {localized.summary}
          </p>
        </div>
        {post.publishedAt && (
          <time
            dateTime={post.publishedAt.toISOString()}
            className="shrink-0 font-mono text-xs text-faint"
          >
            {formatDate(post.publishedAt, locale)}
          </time>
        )}
      </Link>
    </li>
  );
}
