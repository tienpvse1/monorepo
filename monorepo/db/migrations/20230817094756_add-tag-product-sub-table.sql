-- migrate:up
CREATE TABLE IF NOT EXISTS public."tag_product"(
  product_id uuid,
  tag_id uuid,
  PRIMARY KEY (product_id, tag_id),
  CONSTRAINT product_fk FOREIGN KEY (product_id) REFERENCES public."product"(id),
  CONSTRAINT tag_fk FOREIGN KEY (tag_id) REFERENCES public."tag"(id)
);

-- migrate:down
DROP TABLE IF EXISTS public."tag_product";

