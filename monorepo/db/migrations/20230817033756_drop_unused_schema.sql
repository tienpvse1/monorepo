-- migrate:up
DROP SCHEMA "tiger" CASCADE;

DROP SCHEMA "topology" CASCADE;

DROP SCHEMA "tiger_data" CASCADE;

-- migrate:down
CREATE SCHEMA "tiger_data";

CREATE SCHEMA "topology";

CREATE SCHEMA "tiger";

