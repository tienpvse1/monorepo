-- migrate:up
CREATE TABLE IF NOT EXISTS public."tag"(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz DEFAULT 'now()',
  updated_at timestamptz,
  deleted_at timestamptz,
  label text NOT NULL,
  styles jsonb DEFAULT jsonb_build_object()
);

-- migrate:down
DROP TABLE IF EXISTS public."tags";

