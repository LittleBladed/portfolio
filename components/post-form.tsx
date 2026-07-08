import { savePost } from "@/lib/actions";
import type { Post } from "@/lib/posts";
import { ImageUploader } from "@/components/image-uploader";

const inputClass =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-accent";

const labelClass = "text-sm font-medium";
const hintClass = "font-normal text-muted";

export function PostForm({ post }: { post?: Post }) {
  return (
    <form action={savePost} className="space-y-6">
      {post && <input type="hidden" name="id" value={post.id} />}

      <label className="block space-y-2">
        <span className={labelClass}>Title</span>
        <input
          name="title"
          defaultValue={post?.title}
          required
          className={inputClass}
        />
      </label>

      <label className="block space-y-2">
        <span className={labelClass}>
          Slug <span className={hintClass}>(optional — generated from title)</span>
        </span>
        <input
          name="slug"
          defaultValue={post?.slug}
          className={`${inputClass} font-mono`}
        />
      </label>

      <label className="block space-y-2">
        <span className={labelClass}>Summary</span>
        <textarea
          name="summary"
          defaultValue={post?.summary}
          required
          rows={2}
          className={inputClass}
        />
      </label>

      <label className="block space-y-2">
        <span className={labelClass}>
          Content <span className={hintClass}>(Markdown)</span>
        </span>
        <textarea
          name="content"
          defaultValue={post?.content}
          required
          rows={16}
          className={`${inputClass} font-mono text-[13px] leading-relaxed`}
        />
      </label>

      <label className="block space-y-2">
        <span className={labelClass}>
          Cover image URL{" "}
          <span className={hintClass}>
            (optional — shown on the card and above the entry)
          </span>
        </span>
        <input
          name="coverImage"
          defaultValue={post?.coverImage ?? ""}
          placeholder="https://… or /uploads/…"
          className={`${inputClass} font-mono`}
        />
      </label>

      <label className="block space-y-2">
        <span className={labelClass}>
          Thumbnail URL{" "}
          <span className={hintClass}>
            (optional — shown next to the entry on the home page; landscape
            crops best. No image on the home page when empty)
          </span>
        </span>
        <input
          name="thumbnail"
          defaultValue={post?.thumbnail ?? ""}
          placeholder="https://… or /uploads/…"
          className={`${inputClass} font-mono`}
        />
      </label>

      <ImageUploader />

      <details
        className="rounded-lg border border-line bg-white/60 px-4 py-3"
        open={Boolean(post?.contentNl)}
      >
        <summary className="cursor-pointer text-sm font-medium">
          Dutch translation{" "}
          <span className={hintClass}>
            (optional — English is shown on /nl when empty)
          </span>
        </summary>
        <div className="space-y-6 pt-5">
          <label className="block space-y-2">
            <span className={labelClass}>Titel (NL)</span>
            <input
              name="titleNl"
              defaultValue={post?.titleNl ?? ""}
              className={inputClass}
            />
          </label>

          <label className="block space-y-2">
            <span className={labelClass}>Samenvatting (NL)</span>
            <textarea
              name="summaryNl"
              defaultValue={post?.summaryNl ?? ""}
              rows={2}
              className={inputClass}
            />
          </label>

          <label className="block space-y-2">
            <span className={labelClass}>
              Inhoud (NL) <span className={hintClass}>(Markdown)</span>
            </span>
            <textarea
              name="contentNl"
              defaultValue={post?.contentNl ?? ""}
              rows={16}
              className={`${inputClass} font-mono text-[13px] leading-relaxed`}
            />
          </label>
        </div>
      </details>

      <label className="block space-y-2">
        <span className={labelClass}>
          Tags <span className={hintClass}>(comma-separated)</span>
        </span>
        <input
          name="tags"
          defaultValue={post?.tags}
          className={`${inputClass} font-mono`}
        />
      </label>

      <label className="flex items-center gap-2.5 text-sm">
        <input
          type="checkbox"
          name="published"
          defaultChecked={Boolean(post?.publishedAt)}
          className="accent-accent"
        />
        <span>Published</span>
      </label>

      <label className="block space-y-2">
        <span className={labelClass}>
          Publish date{" "}
          <span className={hintClass}>
            (for backdating; empty keeps the existing date, or today on first publish)
          </span>
        </span>
        <input
          type="date"
          name="publishedDate"
          defaultValue={
            post?.publishedAt ? post.publishedAt.toISOString().slice(0, 10) : ""
          }
          className={`${inputClass} max-w-48`}
        />
      </label>

      <label className="block space-y-2">
        <span className={labelClass}>
          Admin password{" "}
          <span className={hintClass}>(not needed in development)</span>
        </span>
        <input type="password" name="password" className={inputClass} />
      </label>

      <button
        type="submit"
        className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Save entry
      </button>
    </form>
  );
}
