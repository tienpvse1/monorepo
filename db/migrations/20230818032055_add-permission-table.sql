-- migrate:up
CREATE TABLE IF NOT EXISTS public."permission"(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz DEFAULT 'now()',
  updated_at timestamptz,
  deleted_at timestamptz,
  "resource" text NOT NULL,
  "action" text NOT NULL
);

-- migrate:down
DROP TABLE IF EXISTS public."permission";

