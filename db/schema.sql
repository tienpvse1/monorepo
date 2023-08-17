SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: fuzzystrmatch; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS fuzzystrmatch WITH SCHEMA public;


--
-- Name: EXTENSION fuzzystrmatch; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION fuzzystrmatch IS 'determine similarities and distance between strings';


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: assign_update_date(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.assign_update_date() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = 'now()';
  RETURN NEW;
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.account (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp with time zone DEFAULT '2023-08-17 07:56:38.585367+00'::timestamp with time zone,
    updated_at timestamp with time zone,
    username text NOT NULL,
    first_name text,
    last_name text,
    active boolean DEFAULT true,
    image text,
    email text NOT NULL,
    password text NOT NULL,
    is_leader boolean DEFAULT false,
    team_index integer,
    team_id uuid,
    role text
);


--
-- Name: base_table; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.base_table (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp with time zone DEFAULT '2023-08-17 07:56:38.579699+00'::timestamp with time zone,
    updated_at timestamp with time zone
);


--
-- Name: contact; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.contact (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp with time zone DEFAULT '2023-08-17 07:56:38.599547+00'::timestamp with time zone,
    updated_at timestamp with time zone,
    name text NOT NULL,
    birth date,
    phone text,
    email text,
    image jsonb,
    address text,
    job_position text,
    internal_notes text,
    deleted_at timestamp with time zone
);


--
-- Name: pipeline; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pipeline (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp with time zone DEFAULT '2023-08-17 08:45:25.625565+00'::timestamp with time zone,
    updated_at timestamp with time zone,
    name text NOT NULL,
    team_id uuid,
    account_id uuid,
    description text,
    deleted_at timestamp with time zone
);


--
-- Name: pipeline_column; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pipeline_column (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp with time zone DEFAULT '2023-08-17 08:40:05.074166+00'::timestamp with time zone,
    updated_at timestamp with time zone,
    name text NOT NULL,
    is_won boolean DEFAULT false,
    pipeline_id uuid,
    deleted_at timestamp with time zone
);


--
-- Name: pipeline_item; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pipeline_item (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp with time zone DEFAULT '2023-08-17 07:56:38.602404+00'::timestamp with time zone,
    updated_at timestamp with time zone,
    name text NOT NULL,
    index double precision DEFAULT 0,
    priority integer DEFAULT 0,
    expected_closing timestamp without time zone,
    expected_revenue double precision DEFAULT 0,
    description text DEFAULT ''::text,
    lost boolean DEFAULT false,
    contact_id uuid,
    pipeline_column_id uuid,
    deleted_at timestamp with time zone
);


--
-- Name: product; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp with time zone DEFAULT '2023-08-17 09:20:35.261095+00'::timestamp with time zone,
    updated_at timestamp with time zone,
    name text NOT NULL,
    start_date date,
    end_date date,
    price double precision DEFAULT '0'::double precision,
    deleted_at timestamp with time zone,
    CONSTRAINT product_check CHECK ((end_date >= start_date))
);


--
-- Name: product_account; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_account (
    product_id uuid NOT NULL,
    account_id uuid NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: role; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.role (
    name text NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying(128) NOT NULL
);


--
-- Name: tag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tag (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp with time zone DEFAULT '2023-08-17 09:50:07.001779+00'::timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    label text NOT NULL,
    styles jsonb DEFAULT jsonb_build_object()
);


--
-- Name: tag_product; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tag_product (
    product_id uuid NOT NULL,
    tag_id uuid NOT NULL
);


--
-- Name: team; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.team (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp with time zone DEFAULT '2023-08-17 08:51:53.0661+00'::timestamp with time zone,
    updated_at timestamp with time zone,
    name text NOT NULL,
    created_by_id uuid NOT NULL,
    leader_id uuid NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- Name: base_table base_table_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.base_table
    ADD CONSTRAINT base_table_pkey PRIMARY KEY (id);


--
-- Name: contact contact_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT contact_pkey PRIMARY KEY (id);


--
-- Name: pipeline_column pipeline_column_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pipeline_column
    ADD CONSTRAINT pipeline_column_pkey PRIMARY KEY (id);


--
-- Name: pipeline_item pipeline_item_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pipeline_item
    ADD CONSTRAINT pipeline_item_pkey PRIMARY KEY (id);


--
-- Name: pipeline pipeline_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pipeline
    ADD CONSTRAINT pipeline_pkey PRIMARY KEY (id);


--
-- Name: product_account product_account_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_account
    ADD CONSTRAINT product_account_pkey PRIMARY KEY (product_id, account_id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (name);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (id);


--
-- Name: tag_product tag_product_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tag_product
    ADD CONSTRAINT tag_product_pkey PRIMARY KEY (product_id, tag_id);


--
-- Name: team team_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_pkey PRIMARY KEY (id);


--
-- Name: account_email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX account_email ON public.account USING btree (email);


--
-- Name: account_username; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX account_username ON public.account USING btree (username);


--
-- Name: base_table assign_update_date_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER assign_update_date_trigger BEFORE UPDATE ON public.base_table FOR EACH ROW EXECUTE FUNCTION public.assign_update_date();


--
-- Name: product_account account_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_account
    ADD CONSTRAINT account_fk FOREIGN KEY (account_id) REFERENCES public.account(id);


--
-- Name: pipeline_item contact_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pipeline_item
    ADD CONSTRAINT contact_fk FOREIGN KEY (contact_id) REFERENCES public.contact(id);


--
-- Name: team created_by_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT created_by_fk FOREIGN KEY (created_by_id) REFERENCES public.account(id);


--
-- Name: team leader_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT leader_fk FOREIGN KEY (leader_id) REFERENCES public.account(id);


--
-- Name: pipeline_item pipeline_column_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pipeline_item
    ADD CONSTRAINT pipeline_column_fk FOREIGN KEY (pipeline_column_id) REFERENCES public.pipeline_column(id);


--
-- Name: pipeline_column pipeline_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pipeline_column
    ADD CONSTRAINT pipeline_fk FOREIGN KEY (pipeline_id) REFERENCES public.pipeline(id);


--
-- Name: product_account product_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_account
    ADD CONSTRAINT product_fk FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: tag_product product_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tag_product
    ADD CONSTRAINT product_fk FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: account role_account_fk_role; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT role_account_fk_role FOREIGN KEY (role) REFERENCES public.role(name);


--
-- Name: tag_product tag_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tag_product
    ADD CONSTRAINT tag_fk FOREIGN KEY (tag_id) REFERENCES public.tag(id);


--
-- Name: account team_account_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT team_account_fk FOREIGN KEY (team_id) REFERENCES public.team(id);


--
-- PostgreSQL database dump complete
--


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20230817023806'),
    ('20230817025139'),
    ('20230817030617'),
    ('20230817033457'),
    ('20230817033756'),
    ('20230817064653'),
    ('20230817065450'),
    ('20230817073658'),
    ('20230817073808'),
    ('20230817083334'),
    ('20230817083730'),
    ('20230817084018'),
    ('20230817084353'),
    ('20230817084557'),
    ('20230817084958'),
    ('20230817091457'),
    ('20230817092115'),
    ('20230817093655'),
    ('20230817094447'),
    ('20230817094756');
