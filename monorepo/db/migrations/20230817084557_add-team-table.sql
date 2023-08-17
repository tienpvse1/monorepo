-- migrate:up
CREATE TABLE IF NOT EXISTS public."team"(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz DEFAULT 'now()',
  updated_at timestamptz,
  name text NOT NULL,
  created_by_id uuid NOT NULL,
  leader_id uuid NOT NULL,
  CONSTRAINT created_by_fk FOREIGN KEY (created_by_id) REFERENCES public."account"(id),
  CONSTRAINT leader_fk FOREIGN KEY (leader_id) REFERENCES public."account"(id)
);

-- migrate:down
DROP TABLE IF EXISTS public."team";

