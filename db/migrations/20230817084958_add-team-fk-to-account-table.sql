-- migrate:up
ALTER TABLE public."account"
  ADD CONSTRAINT team_account_fk FOREIGN KEY (team_id) REFERENCES public."team"(id);

-- migrate:down
ALTER TABLE public."account"
  DROP CONSTRAINT team_account_fk;

