-- migrate:up
CREATE TABLE IF NOT EXISTS public."role"(
  "name" text PRIMARY KEY
);

INSERT INTO ROLE
  VALUES ('system'),
('admin'),
('sale_manager'),
('client'),
('accountant'),
('sale');

-- migrate:down
DELETE FROM ROLE
WHERE name IN ('system', 'admin', 'sale_manager', 'client', 'accountant', 'sale');

DROP TABLE IF EXISTS public."role";

