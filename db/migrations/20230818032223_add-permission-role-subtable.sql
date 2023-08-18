-- migrate:up
CREATE TABLE IF NOT EXISTS public."permission_role"(
  permission_id uuid,
  "role" text,
  PRIMARY KEY (permission_id, "role"),
  CONSTRAINT permission_fk FOREIGN KEY (permission_id) REFERENCES public."permission"(id),
  CONSTRAINT role_fk FOREIGN KEY ("role") REFERENCES public."role"("name")
);

-- migrate:down
DROP TABLE IF EXISTS public."permission_role";

