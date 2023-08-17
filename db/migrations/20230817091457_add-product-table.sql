-- migrate:up
CREATE TABLE IF NOT EXISTS public."product"(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz DEFAULT 'now()',
  updated_at timestamptz,
  "name" text NOT NULL,
  "start_date" date,
  end_date date CHECK (end_date >= start_date),
  price double precision DEFAULT '0'
);

-- migrate:down
DROP TABLE IF EXISTS public."product";

