# Alyra, l'ecole Blockchain et IA

<p align="center">
  <img src="./public/logo_bleu.svg" alt="Logo Alyra" width="240" />
</p>

## Objectif Du Site

Ce projet est un site vitrine/cataloque de formations autour de la **Blockchain** et de l'**IA** :
- page d'accueil institutionnelle
- catalogue filtrable de programmes
- page detaillee par formation (SSR)
- pages statiques (financement, blog, etc.)
- prise de rendez-vous

## Stack Technique

- `Next.js` (App Router)
- `React`
- `Supabase` (catalogue + contenu de pages formation)
- `ESLint`
- `Vitest` + `Testing Library` + `vitest-axe` (tests + accessibilite)
- CSS maison (`src/index.css`, `src/App.css`)

## Architecture (Schema)

```mermaid
flowchart TD
  A[Utilisateur] --> B[Next.js App Router]
  B --> C[Pages SSR / SSG]
  C --> D[Data Layer: src/lib/programData.js]
  D --> E[(Supabase)]
  B --> F[Composants UI]
  F --> G[Hooks metier]
  G --> D
  B --> H[SEO technique]
  H --> I[/sitemap.xml]
  H --> J[/robots.txt]
```

### Structure Principale

- `app/`: routes Next (pages, metadata, API routes, sitemap/robots)
- `src/components/`: composants UI reutilisables
- `src/components/program-catalog/`: composants dedies catalogue
- `src/hooks/`: hooks metier (filtres, hydration)
- `src/lib/`: acces donnees Supabase + SEO helpers
- `src/data/`: contenus statiques
- `supabase/migrations/`: scripts SQL de schema
- `supabase/seeds/`: scripts SQL/JS de seed

## Lancement Local

```bash
npm install
cp .env.example .env
npm run dev
```

## Variables D'Environnement

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Scripts

- `npm run dev`
- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run start`
- `npm run seed:supabase`
- `npm run seed:supabase:pages`

## Auteur

**cyril castagnet**
