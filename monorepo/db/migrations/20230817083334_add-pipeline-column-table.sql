-- migrate:up
CREATE TABLE IF NOT EXISTS public."pipeline_column"(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz DEFAULT 'now()',
  updated_at timestamptz,
  "name" text NOT NULL,
  is_won boolean DEFAULT 'false',
  pipeline_id uuid
);

-- migrate:down
DROP TABLE IF EXISTS public."pipeline_column";

