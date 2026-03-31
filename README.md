# Alyra Site

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Supabase migration (catalog)

1. Create a Supabase project.
2. Run SQL migrations in Supabase SQL Editor:
   - `supabase/migrations/20260331_create_programs_table.sql`
   - `supabase/migrations/20260331_create_program_pages_table.sql`
3. Fill `.env` for frontend:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Seed initial data from local catalog:

```bash
SUPABASE_URL="https://<project>.supabase.co" \
SUPABASE_SERVICE_ROLE_KEY="<service_role_key>" \
npm run seed:supabase
```

5. Seed detail content table (linked by `program_id` -> `programs.id`):

```bash
SUPABASE_URL="https://<project>.supabase.co" \
SUPABASE_SERVICE_ROLE_KEY="<service_role_key>" \
npm run seed:supabase:pages
```

## Notes

- If Supabase env vars are missing or unavailable, the catalog will be empty.
- Programs are read from `public.programs`.
- Program detail pages are read from `public.program_pages`.

## Scripts

- `npm run dev`
- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run sitemap`
- `npm run seed:supabase`
- `npm run seed:supabase:pages`
