-- migrate:up
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public."base_table"(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz DEFAULT 'now()',
  updated_at timestamptz
);

CREATE OR REPLACE FUNCTION public.assign_update_date()
  RETURNS TRIGGER
  AS $$
BEGIN
  NEW.updated_at = 'now()';
  RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER assign_update_date_trigger
  BEFORE UPDATE ON "base_table"
  FOR EACH ROW
  EXECUTE PROCEDURE assign_update_date();

-- migrate:down
DROP TRIGGER assign_update_date_trigger ON public."base_table";

DROP FUNCTION IF EXISTS public.assign_update_date;

DROP TABLE IF EXISTS public."base_table";

DROP EXTENSION IF EXISTS "uuid-ossp";

