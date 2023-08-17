-- migrate:up
ALTER TABLE public.team
  ADD COLUMN deleted_at timestamptz;

ALTER TABLE public.pipeline_item
  ADD COLUMN deleted_at timestamptz;

ALTER TABLE public.pipeline_column
  ADD COLUMN deleted_at timestamptz;

ALTER TABLE public.pipeline
  ADD COLUMN deleted_at timestamptz;

ALTER TABLE public.role
  ADD COLUMN deleted_at timestamptz;

ALTER TABLE public.product
  ADD COLUMN deleted_at timestamptz;

ALTER TABLE public.product_account
  ADD COLUMN deleted_at timestamptz;

ALTER TABLE public.contact
  ADD COLUMN deleted_at timestamptz;

-- migrate:down
ALTER TABLE public.team
  DROP COLUMN deleted_at;

ALTER TABLE public.pipeline_item
  DROP COLUMN deleted_at;

ALTER TABLE public.pipeline_column
  DROP COLUMN deleted_at;

ALTER TABLE public.pipeline
  DROP COLUMN deleted_at;

ALTER TABLE public.role
  DROP COLUMN deleted_at;

ALTER TABLE public.product
  DROP COLUMN deleted_at;

ALTER TABLE public.product_account
  DROP COLUMN deleted_at;

ALTER TABLE public.contact
  DROP COLUMN deleted_at;

