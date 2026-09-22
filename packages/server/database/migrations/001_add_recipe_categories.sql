BEGIN;

CREATE TABLE IF NOT EXISTS recipe_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO recipe_categories (name, slug)
VALUES
  ('Quick & Easy', 'quick-easy'),
  ('Healthy', 'healthy'),
  ('Comfort Food', 'comfort-food'),
  ('Desserts', 'desserts'),
  ('Asian', 'asian'),
  ('Mediterranean', 'mediterranean'),
  ('Other', 'other')
ON CONFLICT (slug) DO NOTHING;

ALTER TABLE recipes
  ADD COLUMN IF NOT EXISTS category_id INTEGER;

UPDATE recipes
SET category_id = (
  SELECT id
  FROM recipe_categories
  WHERE slug = 'other'
)
WHERE category_id IS NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'recipes_category_id_fkey'
  ) THEN
    ALTER TABLE recipes
      ADD CONSTRAINT recipes_category_id_fkey
      FOREIGN KEY (category_id)
      REFERENCES recipe_categories(id)
      ON UPDATE CASCADE
      ON DELETE RESTRICT;
  END IF;
END $$;

ALTER TABLE recipes
  ALTER COLUMN category_id SET NOT NULL;

CREATE INDEX IF NOT EXISTS idx_recipes_category_id
  ON recipes(category_id);

COMMIT;