-- migrate:up
CREATE TABLE IF NOT EXISTS public."pipeline"(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz DEFAULT 'now()',
  updated_at timestamptz,
  "name" text NOT NULL,
  team_id uuid ,
  account_id uuid,
  description TEXT 
)
-- migrate:down
DROP TABLE IF EXISTS public."pipeline";
