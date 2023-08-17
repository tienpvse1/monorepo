-- migrate:up transaction:false
CREATE UNIQUE INDEX account_username ON public."account" USING btree(username);

CREATE UNIQUE INDEX account_email ON public."account" USING btree(email);

-- migrate:down
DROP INDEX account_email;

DROP INDEX account_username;

