-- migrate:up
ALTER TABLE public."pipeline_item" ADD COLUMN created_by_id uuid;
ALTER TABLE public."pipeline_item" ADD CONSTRAINT created_by_fk FOREIGN KEY (created_by_id) REFERENCES public."account"(id);

-- migrate:down
ALTER TABLE public."pipeline_item" DROP CONSTRAINT created_by_fk ;
ALTER TABLE public."pipeline_item" DROP COLUMN created_by_id;
