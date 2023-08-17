-- migrate:up
CREATE TABLE IF NOT EXISTS public."account_pipeline_item"(
  account_id uuid,
  pipeline_item_id uuid,
  PRIMARY KEY (account_id, pipeline_item_id),
  CONSTRAINT account_fk FOREIGN KEY (account_id) REFERENCES public."account"(id),
  CONSTRAINT pipeline_item_fk FOREIGN KEY (pipeline_item_id) REFERENCES public."pipeline_item"(id)
);

-- migrate:down
DROP TABLE IF EXISTS public."account_pipeline_item";
