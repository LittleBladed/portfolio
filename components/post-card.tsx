import Link from "next/link";
import { localizePost, postThumbnail, type Post } from "@/lib/posts";
import type { Locale } from "@/lib/i18n";
import { formatDate } from "@/components/format-date";

export function PostRow({ post, locale }: { post: Post; locale: Locale }) {
  const localized = localizePost(post, locale);
  const thumbnail = postThumbnail(post);

  return (
    <li>
      <Link
        href={`/${locale}/posts/${post.slug}`}
        className="group flex items-center justify-between gap-6 py-5"
      >
        <div className="min-w-0">
          {post.publishedAt && (
            <time
              dateTime={post.publishedAt.toISOString()}
              className="font-mono text-xs text-faint"
            >
              {formatDate(post.publishedAt, locale)}
            </time>
          )}
          <h3 className="mt-1 font-display text-lg font-medium tracking-tight transition-colors group-hover:text-accent">
            {localized.title}
          </h3>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">
            {localized.summary}
          </p>
        </div>

        {thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnail}
            alt=""
            loading="lazy"
            className="hidden h-20 w-32 shrink-0 rounded-lg border border-line object-cover sm:block"
          />
        )}
      </Link>
    </li>
  );
}
