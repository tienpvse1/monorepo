-- migrate:up
CREATE TABLE IF NOT EXISTS public."pipeline_item"(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz DEFAULT 'now()',
  updated_at timestamptz,
  "name" text NOT NULL,
  "index" double precision DEFAULT 0,
  "priority" int DEFAULT 0,
  expected_closing timestamp,
  expected_revenue double precision DEFAULT 0,
  description text DEFAULT '',
  lost boolean DEFAULT 'false',
  contact_id uuid,
  CONSTRAINT contact_fk FOREIGN KEY (contact_id) REFERENCES contact(id)
);

-- migrate:down
DROP TABLE IF EXISTS public."pipeline_item";

