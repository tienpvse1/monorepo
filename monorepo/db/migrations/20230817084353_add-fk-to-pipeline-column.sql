-- migrate:up
ALTER TABLE public."pipeline_column"
  ADD CONSTRAINT pipeline_fk FOREIGN KEY (pipeline_id) REFERENCES public."pipeline"(id);

-- migrate:down
ALTER TABLE public."pipeline_column"
  DROP CONSTRAINT pipeline_fk;

