import { notFound } from "next/navigation";
import { deletePost } from "@/lib/actions";
import { getPostById } from "@/lib/posts";
import { PostForm } from "@/components/post-form";

export default async function EditPostPage(props: PageProps<"/admin/[id]">) {
  const { id } = await props.params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-semibold tracking-tight">Edit entry</h1>
      <PostForm post={post} />
      <form
        action={deletePost}
        className="flex flex-wrap items-center gap-3 border-t border-line pt-8"
      >
        <input type="hidden" name="id" value={post.id} />
        <input
          type="password"
          name="password"
          placeholder="Admin password"
          className="rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-red-400"
        />
        <button
          type="submit"
          className="text-sm font-medium text-red-600 transition-opacity hover:opacity-80"
        >
          Delete entry
        </button>
      </form>
    </div>
  );
}
