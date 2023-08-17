-- migrate:up
ALTER TABLE public."pipeline_item"
  ADD COLUMN pipeline_column_id uuid;

ALTER TABLE public."pipeline_item"
  ADD CONSTRAINT pipeline_column_fk FOREIGN KEY (pipeline_column_id) REFERENCES public."pipeline_column"(id);

-- migrate:down
ALTER TABLE public."pipeline_item"
  DROP CONSTRAINT pipeline_column_fk;

ALTER TABLE public."pipeline_item"
  DROP COLUMN pipeline_column_id;

