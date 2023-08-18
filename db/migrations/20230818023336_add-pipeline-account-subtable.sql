-- migrate:up
CREATE TABLE IF NOT EXISTS public."account_pipeline"(
  account_id uuid,
  pipeline_id uuid,
  PRIMARY KEY (account_id, pipeline_id),
  CONSTRAINT account_fk FOREIGN KEY (account_id) REFERENCES public."account"(id),
  CONSTRAINT pipeline_fk FOREIGN KEY (pipeline_id) REFERENCES public."pipeline"(id)
);

-- migrate:down
DROP TABLE IF EXISTS public."account_pipeline";

