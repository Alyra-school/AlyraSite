# Database (Etat Actuel)

## Vue d'ensemble
Le modèle actif est centré sur:
- `programs` (catalogue formations)
- `program_pages` (page_core 1:1)
- `program_content_blocks` (blocs modulaires)
- `experts` (référentiel experts)
- `program_experts` (pivot formations↔experts)
- `program_related_programs` (pivot formations associées)
- `blog_articles` (contenu blog)

Lecture formation unifiée:
- RPC: `public.get_program_page_v1(p_slug text)`
- Retour: `program`, `page_core`, `blocks`, `experts`, `related_programs`

## Feature flags runtime
- `PROGRAM_PAGE_V1_ENABLED=true` (par défaut dans le code)
- `SUPABASE_ENABLED`
- `SUPABASE_ONLY_MODE`

## Migrations liées
- `supabase/migrations/20260516_program_content_blocks_v1.sql`
- `supabase/seeds/20260516_backfill_program_content_blocks_v1.sql`
- `supabase/migrations/20260516_program_pages_legacy_decommission.sql`

## Tables

### `programs`
Référentiel des formations (slug, titre, tags, date, durée, prix, image, etc.).

### `program_pages`
Contenu noyau 1:1 par formation (overview / certification intro / champs globaux).

### `program_content_blocks`
Table modulaire des sections:
- `program_id`
- `block_type`
- `position`
- `payload` (`jsonb`)
- `is_enabled`
- `payload_schema_version`

Contrainte:
- unique (`program_id`, `block_type`, `position`)

Index:
- (`program_id`, `block_type`, `position`)
- (`program_id`, `is_enabled`, `position`)
- GIN (`payload`)

### `experts`
Référentiel experts/intervenants (nom, rôle, bio, image, linkedin, etc.).

### `program_experts`
Pivot ordonné entre formation et expert:
- `program_id`
- `expert_id`
- `position`
- `payload` (`jsonb`, ex: highlights)

Contraintes:
- PK (`program_id`, `expert_id`)
- unique (`program_id`, `position`)

### `program_related_programs`
Pivot ordonné entre une formation et des formations associées:
- `program_id`
- `related_program_id`
- `position`
- `label_override`

Contraintes:
- PK (`program_id`, `related_program_id`)
- unique (`program_id`, `position`)

### `blog_articles`
Articles du blog:
- `slug`, `title`, `excerpt`, `summary`
- `content_html`
- `featured_image_url`, `featured_image_alt`
- `author_name`, `published_at`, `reading_time_minutes`, `tags`
- `is_published`

## Notes d'exploitation
- Les anciennes tables `program_page_*` éclatées ont été supprimées.
- En cas de rollback applicatif temporaire, basculer via flag (`PROGRAM_PAGE_V1_ENABLED=false`) n'est plus pertinent tant que la couche legacy n'est pas réintroduite.
- Source de vérité formation: RPC `get_program_page_v1`.
