-- migrate:up
ALTER TABLE public."account" ALTER "role" SET DEFAULT 'sale';

-- migrate:down
ALTER TABLE public."account" ALTER "role" DROP DEFAULT;
