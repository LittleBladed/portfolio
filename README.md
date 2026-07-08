# Portfolio & writing — Roan Merens

The blog **is** the portfolio: the home page is a feed of entries about projects and lessons from shipping them. Bilingual (EN/NL) with a language toggle; each entry can have an optional Dutch translation (English is the fallback).

**Stack:** Next.js 16 (App Router) · Prisma 7 + Postgres · Tailwind CSS 4 · react-markdown · Vercel Blob (images)

## Getting started

Requires Node 22 (`nvm use`) and a local Postgres on 5432.

```bash
npm install                        # also runs `prisma generate`
createdb portfolio                 # once, if it doesn't exist
npm run db:migrate                 # apply migrations
npm run db:seed                    # seed the first post
npm run dev                        # http://localhost:3000
```

`.env` holds `DATABASE_URL` (defaults to local Postgres `portfolio` db).

## Adding entries

- **Admin UI** — [/admin](http://localhost:3000/admin): create, edit, publish/unpublish, delete. Content is Markdown (GFM: headings, images, tables, code). Optional per-entry Dutch translation and cover image. No password needed in development; in production set `ADMIN_PASSWORD`.
- **Images** — upload from the admin form; returns a markdown snippet (`![alt](url)`) to paste anywhere in the content, or a URL for the cover field. Uses Vercel Blob in production, `public/uploads/` locally.
- **Prisma Studio** — `npm run db:studio` for a table editor.

Unpublished entries stay drafts, visible only in /admin.

## Structure

- `app/(site)/[locale]/…` — public site (`/en`, `/nl`); `proxy.ts` redirects bare URLs to the visitor's language
- `app/(admin)/admin/…` — admin UI + `/admin/upload` endpoint (noindex, English-only)
- `lib/i18n.ts` — locales + all UI copy (EN/NL); `lib/posts.ts` — queries + locale fallback; `lib/actions.ts` — save/delete
- `prisma/schema.prisma` — `Post` model (EN fields + optional `titleNl/summaryNl/contentNl`, `coverImage`)

## Deploying to Vercel

1. Add **Prisma Postgres** and **Blob** from the Vercel marketplace — they set `DATABASE_URL` and `BLOB_READ_WRITE_TOKEN`.
2. Set `ADMIN_PASSWORD`.
3. Run migrations against production: `DATABASE_URL=<prod-url> npx prisma migrate deploy`.
