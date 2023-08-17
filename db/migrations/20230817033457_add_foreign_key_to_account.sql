-- migrate:up
ALTER TABLE public."account"
  ADD COLUMN "team_id" uuid;

ALTER TABLE public."account"
  ADD COLUMN "role_id" uuid;

-- migrate:down
ALTER TABLE public."account"
  DROP COLUMN "role_id";

ALTER TABLE public."account"
  DROP COLUMN "team_id";

