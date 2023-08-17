-- migrate:up
CREATE TABLE IF NOT EXISTS public."account"(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz DEFAULT 'now()',
  updated_at timestamptz,
  username text NOT NULL,
  first_name text,
  last_name text,
  active boolean DEFAULT 'true',
  image text,
  email text NOT NULL,
  password TEXT NOT NULL,
  is_leader boolean DEFAULT 'false',
  team_index int
);

-- migrate:down
DROP TABLE IF EXISTS public."account";

