-- migrate:up
ALTER TABLE public."contact"
  ADD COLUMN created_by_id uuid;

ALTER TABLE public."contact"
  ADD CONSTRAINT created_by_fk FOREIGN KEY (created_by_id) REFERENCES public."account"(id);

-- migrate:down
ALTER TABLE public."contact"
  DROP CONSTRAINT created_by_fk;

ALTER TABLE public."contact"
  DROP COLUMN created_by_id;

