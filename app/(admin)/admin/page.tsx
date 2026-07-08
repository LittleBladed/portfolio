import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/components/format-date";

export default async function AdminPage(props: PageProps<"/admin">) {
  const { error } = await props.searchParams;
  const posts = await getAllPosts();

  return (
    <div className="space-y-10">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Entries</h1>
        <Link
          href="/admin/new"
          className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          New entry
        </Link>
      </div>

      {typeof error === "string" && (
        <p className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {posts.length === 0 ? (
        <p className="text-muted">Nothing here yet. Create your first entry.</p>
      ) : (
        <ul className="divide-y divide-line border-t border-line">
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex items-center justify-between gap-4 py-5"
            >
              <div className="min-w-0 space-y-1">
                <p className="truncate font-medium tracking-tight">
                  {post.title}
                </p>
                <p className="text-sm text-muted">
                  {post.publishedAt ? (
                    <span className="text-emerald-700">
                      Published {formatDate(post.publishedAt)}
                    </span>
                  ) : (
                    <span className="text-amber-700">Draft</span>
                  )}
                  {" · /"}
                  {post.slug}
                  {post.contentNl ? " · EN+NL" : " · EN only"}
                </p>
              </div>
              <div className="flex shrink-0 gap-5 text-sm">
                {post.publishedAt && (
                  <Link
                    href={`/en/posts/${post.slug}`}
                    className="text-muted transition-colors hover:text-foreground"
                  >
                    View
                  </Link>
                )}
                <Link
                  href={`/admin/${post.id}`}
                  className="font-medium text-accent transition-opacity hover:opacity-80"
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
