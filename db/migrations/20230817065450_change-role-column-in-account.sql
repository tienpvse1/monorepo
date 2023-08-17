-- migrate:up
ALTER TABLE public."account"
  DROP COLUMN role_id;

ALTER TABLE public."account"
  ADD COLUMN "role" TEXT CONSTRAINT role_account_fk_role REFERENCES ROLE (name);

-- migrate:down
ALTER TABLE public."account" DROP COLUMN "role";
ALTER TABLE public."account"
  ADD COLUMN role_id uuid;

