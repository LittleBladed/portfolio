import { PostForm } from "@/components/post-form";

export default function NewPostPage() {
  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-semibold tracking-tight">New entry</h1>
      <PostForm />
    </div>
  );
}
