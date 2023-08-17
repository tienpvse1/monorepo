-- migrate:up
CREATE TABLE IF NOT EXISTS public."contact"(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz DEFAULT 'now()',
  updated_at timestamptz,
  "name" text NOT NULL,
  birth date,
  phone text,
  email text,
  "image" jsonb,
  "address" text,
  job_position text,
  internal_notes text
);

-- migrate:down
DROP TABLE IF EXISTS public."contact";

