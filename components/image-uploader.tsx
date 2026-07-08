"use client";

import { useRef, useState } from "react";

const inputClass =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-accent";

export function ImageUploader() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function upload() {
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    setBusy(true);
    setError(null);
    setUrl(null);
    setCopied(false);

    const body = new FormData();
    body.append("file", file);
    body.append("password", password);

    try {
      const res = await fetch("/admin/upload", { method: "POST", body });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Upload failed.");
      } else {
        setUrl(data.url);
      }
    } catch {
      setError("Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  const snippet = url ? `![Describe the image](${url})` : "";

  async function copy() {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
  }

  return (
    <div className="space-y-3 rounded-lg border border-line bg-white/60 px-4 py-4">
      <p className="text-sm font-medium">
        Upload image{" "}
        <span className="font-normal text-muted">
          (returns a snippet to paste into the content, or a URL for the cover
          field)
        </span>
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          className="text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-zinc-100 file:px-4 file:py-1.5 file:text-sm file:font-medium file:text-foreground hover:file:bg-zinc-200"
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Admin password (prod only)"
          className={`${inputClass} max-w-56`}
        />
        <button
          type="button"
          onClick={upload}
          disabled={busy}
          className="rounded-full border border-line bg-white px-4 py-1.5 text-sm font-medium shadow-sm transition-colors hover:border-zinc-300 disabled:opacity-50"
        >
          {busy ? "Uploading…" : "Upload"}
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {url && (
        <div className="flex flex-wrap items-center gap-2">
          <code className="max-w-full overflow-x-auto rounded-md bg-zinc-100 px-2 py-1 font-mono text-xs">
            {snippet}
          </code>
          <button
            type="button"
            onClick={copy}
            className="text-sm font-medium text-accent hover:text-accent-hover"
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}
