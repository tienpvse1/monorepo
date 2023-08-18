-- migrate:up
ALTER TABLE public."pipeline_column" ADD COLUMN "index" DOUBLE PRECISION;

-- migrate:down
ALTER TABLE public."pipeline_column" DROP COLUMN "index";
