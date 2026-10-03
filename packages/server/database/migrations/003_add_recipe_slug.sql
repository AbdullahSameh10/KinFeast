BEGIN;

ALTER TABLE recipes
  ADD COLUMN IF NOT EXISTS slug TEXT;

WITH normalized AS (
  SELECT
    id,
    NULLIF(
      TRIM(
        BOTH '-'
        FROM REGEXP_REPLACE(
          REGEXP_REPLACE(
            LOWER(title),
            '[^[:alnum:]]+',
            '-',
            'g'
          ),
          '(^-+|-+$)',
          '',
          'g'
        )
      ),
      ''
    ) AS base_slug
  FROM recipes
),
prepared AS (
  SELECT
    id,
    COALESCE(base_slug, 'recipe') AS base_slug
  FROM normalized
),
ranked AS (
  SELECT
    id,
    base_slug,
    ROW_NUMBER() OVER (
      PARTITION BY base_slug
      ORDER BY id
    ) AS slug_number
  FROM prepared
),
generated AS (
  SELECT
    id,
    CASE
      WHEN slug_number = 1 THEN base_slug
      ELSE base_slug || '-' || slug_number
    END AS slug
  FROM ranked
)
UPDATE recipes r
SET slug = generated.slug
FROM generated
WHERE r.id = generated.id;

ALTER TABLE recipes
  ALTER COLUMN slug SET NOT NULL;

ALTER TABLE recipes
  ADD CONSTRAINT recipes_slug_unique UNIQUE (slug);

CREATE INDEX IF NOT EXISTS idx_recipes_slug
  ON recipes(slug);

COMMIT;