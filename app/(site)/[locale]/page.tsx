import { notFound } from "next/navigation";
import { getPublishedPosts } from "@/lib/posts";
import { getDictionary, isLocale } from "@/lib/i18n";
import { profile } from "@/lib/profile";
import { PostRow } from "@/components/post-card";

// Refresh periodically so entries added outside the admin UI
// (Prisma Studio, seed script) show up without a rebuild.
export const revalidate = 300;

export default async function HomePage(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const posts = await getPublishedPosts();

  return (
    <div className="space-y-16">
      <section className="fade-up space-y-6">
        <p className="max-w-[36ch] font-display text-2xl font-medium leading-snug tracking-tight text-foreground">
          {dict.intro.lead}
        </p>

        <p className="flex items-center gap-2.5 text-sm text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {dict.intro.availability} ·{" "}
          <a
            href={`mailto:${profile.email}`}
            className="text-foreground underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
          >
            {profile.email}
          </a>
        </p>

        <p className="font-mono text-xs text-faint">
          {profile.stack.join(" · ")}
        </p>
      </section>

      <section className="fade-up fade-up-2">
        <h2 className="border-b border-line pb-3 font-mono text-xs uppercase tracking-[0.14em] text-faint">
          {dict.home.writingTitle}
        </h2>

        {posts.length === 0 ? (
          <p className="py-8 text-muted">{dict.home.empty}</p>
        ) : (
          <ul className="divide-y divide-line">
            {posts.map((post) => (
              <PostRow key={post.id} post={post} locale={locale} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
