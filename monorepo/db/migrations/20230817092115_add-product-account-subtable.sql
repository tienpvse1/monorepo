-- migrate:up
CREATE TABLE IF NOT EXISTS public."product_account"(
  product_id uuid NOT NULL,
  account_id uuid NOT NULL,
  PRIMARY KEY (product_id, account_id),
  CONSTRAINT product_fk FOREIGN KEY (product_id) REFERENCES public."product"(id),
  CONSTRAINT account_fk FOREIGN KEY (account_id) REFERENCES public."account"(id)
);

-- migrate:down
DROP TABLE IF EXISTS public."product_account";

