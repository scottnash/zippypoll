--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: poll_choice_votes; Type: TABLE; Schema: public; Owner: speedypoll
--

CREATE TABLE poll_choice_votes (
    id bigint NOT NULL,
    poll_id bigint NOT NULL,
    poll_choice_id bigint NOT NULL,
    pollster_id bigint NOT NULL,
    liked boolean,
    date_voted timestamp without time zone
);


ALTER TABLE poll_choice_votes OWNER TO speedypoll;

--
-- Name: poll_choice_votes_id_seq; Type: SEQUENCE; Schema: public; Owner: speedypoll
--

CREATE SEQUENCE poll_choice_votes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE poll_choice_votes_id_seq OWNER TO speedypoll;

--
-- Name: poll_choice_votes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: speedypoll
--

ALTER SEQUENCE poll_choice_votes_id_seq OWNED BY poll_choice_votes.id;


--
-- Name: poll_choice_votes_poll_choice_id_seq; Type: SEQUENCE; Schema: public; Owner: speedypoll
--

CREATE SEQUENCE poll_choice_votes_poll_choice_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE poll_choice_votes_poll_choice_id_seq OWNER TO speedypoll;

--
-- Name: poll_choice_votes_poll_choice_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: speedypoll
--

ALTER SEQUENCE poll_choice_votes_poll_choice_id_seq OWNED BY poll_choice_votes.poll_choice_id;


--
-- Name: poll_choice_votes_poll_id_seq; Type: SEQUENCE; Schema: public; Owner: speedypoll
--

CREATE SEQUENCE poll_choice_votes_poll_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE poll_choice_votes_poll_id_seq OWNER TO speedypoll;

--
-- Name: poll_choice_votes_poll_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: speedypoll
--

ALTER SEQUENCE poll_choice_votes_poll_id_seq OWNED BY poll_choice_votes.poll_id;


--
-- Name: poll_choice_votes_pollster_id_seq; Type: SEQUENCE; Schema: public; Owner: speedypoll
--

CREATE SEQUENCE poll_choice_votes_pollster_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE poll_choice_votes_pollster_id_seq OWNER TO speedypoll;

--
-- Name: poll_choice_votes_pollster_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: speedypoll
--

ALTER SEQUENCE poll_choice_votes_pollster_id_seq OWNED BY poll_choice_votes.pollster_id;


--
-- Name: poll_choices; Type: TABLE; Schema: public; Owner: speedypoll
--

CREATE TABLE poll_choices (
    id bigint NOT NULL,
    poll_id bigint NOT NULL,
    pollster_id bigint NOT NULL,
    poll_choice text,
    date_added timestamp without time zone
);


ALTER TABLE poll_choices OWNER TO speedypoll;

--
-- Name: poll_choices_id_seq; Type: SEQUENCE; Schema: public; Owner: speedypoll
--

CREATE SEQUENCE poll_choices_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE poll_choices_id_seq OWNER TO speedypoll;

--
-- Name: poll_choices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: speedypoll
--

ALTER SEQUENCE poll_choices_id_seq OWNED BY poll_choices.id;


--
-- Name: poll_choices_poll_id_seq; Type: SEQUENCE; Schema: public; Owner: speedypoll
--

CREATE SEQUENCE poll_choices_poll_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE poll_choices_poll_id_seq OWNER TO speedypoll;

--
-- Name: poll_choices_poll_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: speedypoll
--

ALTER SEQUENCE poll_choices_poll_id_seq OWNED BY poll_choices.poll_id;


--
-- Name: poll_choices_pollster_id_seq; Type: SEQUENCE; Schema: public; Owner: speedypoll
--

CREATE SEQUENCE poll_choices_pollster_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE poll_choices_pollster_id_seq OWNER TO speedypoll;

--
-- Name: poll_choices_pollster_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: speedypoll
--

ALTER SEQUENCE poll_choices_pollster_id_seq OWNED BY poll_choices.pollster_id;


--
-- Name: polls; Type: TABLE; Schema: public; Owner: speedypoll
--

CREATE TABLE polls (
    id bigint NOT NULL,
    pollster_id bigint NOT NULL,
    topic text,
    date_added timestamp without time zone
);


ALTER TABLE polls OWNER TO speedypoll;

--
-- Name: polls_id_seq; Type: SEQUENCE; Schema: public; Owner: speedypoll
--

CREATE SEQUENCE polls_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE polls_id_seq OWNER TO speedypoll;

--
-- Name: polls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: speedypoll
--

ALTER SEQUENCE polls_id_seq OWNED BY polls.id;


--
-- Name: polls_pollster_id_seq; Type: SEQUENCE; Schema: public; Owner: speedypoll
--

CREATE SEQUENCE polls_pollster_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE polls_pollster_id_seq OWNER TO speedypoll;

--
-- Name: polls_pollster_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: speedypoll
--

ALTER SEQUENCE polls_pollster_id_seq OWNED BY polls.pollster_id;


--
-- Name: pollsters; Type: TABLE; Schema: public; Owner: speedypoll
--

CREATE TABLE pollsters (
    id bigint NOT NULL,
    initials character varying(3) NOT NULL,
    emailaddress character varying(50)
);


ALTER TABLE pollsters OWNER TO speedypoll;

--
-- Name: pollsters_id_seq; Type: SEQUENCE; Schema: public; Owner: speedypoll
--

CREATE SEQUENCE pollsters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE pollsters_id_seq OWNER TO speedypoll;

--
-- Name: pollsters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: speedypoll
--

ALTER SEQUENCE pollsters_id_seq OWNED BY pollsters.id;


--
-- Name: poll_choice_votes id; Type: DEFAULT; Schema: public; Owner: speedypoll
--

ALTER TABLE ONLY poll_choice_votes ALTER COLUMN id SET DEFAULT nextval('poll_choice_votes_id_seq'::regclass);


--
-- Name: poll_choice_votes poll_id; Type: DEFAULT; Schema: public; Owner: speedypoll
--

ALTER TABLE ONLY poll_choice_votes ALTER COLUMN poll_id SET DEFAULT nextval('poll_choice_votes_poll_id_seq'::regclass);


--
-- Name: poll_choice_votes poll_choice_id; Type: DEFAULT; Schema: public; Owner: speedypoll
--

ALTER TABLE ONLY poll_choice_votes ALTER COLUMN poll_choice_id SET DEFAULT nextval('poll_choice_votes_poll_choice_id_seq'::regclass);


--
-- Name: poll_choice_votes pollster_id; Type: DEFAULT; Schema: public; Owner: speedypoll
--

ALTER TABLE ONLY poll_choice_votes ALTER COLUMN pollster_id SET DEFAULT nextval('poll_choice_votes_pollster_id_seq'::regclass);


--
-- Name: poll_choices id; Type: DEFAULT; Schema: public; Owner: speedypoll
--

ALTER TABLE ONLY poll_choices ALTER COLUMN id SET DEFAULT nextval('poll_choices_id_seq'::regclass);


--
-- Name: poll_choices poll_id; Type: DEFAULT; Schema: public; Owner: speedypoll
--

ALTER TABLE ONLY poll_choices ALTER COLUMN poll_id SET DEFAULT nextval('poll_choices_poll_id_seq'::regclass);


--
-- Name: poll_choices pollster_id; Type: DEFAULT; Schema: public; Owner: speedypoll
--

ALTER TABLE ONLY poll_choices ALTER COLUMN pollster_id SET DEFAULT nextval('poll_choices_pollster_id_seq'::regclass);


--
-- Name: polls id; Type: DEFAULT; Schema: public; Owner: speedypoll
--

ALTER TABLE ONLY polls ALTER COLUMN id SET DEFAULT nextval('polls_id_seq'::regclass);


--
-- Name: polls pollster_id; Type: DEFAULT; Schema: public; Owner: speedypoll
--

ALTER TABLE ONLY polls ALTER COLUMN pollster_id SET DEFAULT nextval('polls_pollster_id_seq'::regclass);


--
-- Name: pollsters id; Type: DEFAULT; Schema: public; Owner: speedypoll
--

ALTER TABLE ONLY pollsters ALTER COLUMN id SET DEFAULT nextval('pollsters_id_seq'::regclass);


--
-- Data for Name: poll_choice_votes; Type: TABLE DATA; Schema: public; Owner: speedypoll
--

COPY poll_choice_votes (id, poll_id, poll_choice_id, pollster_id, liked, date_voted) FROM stdin;
\.


--
-- Name: poll_choice_votes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: speedypoll
--

SELECT pg_catalog.setval('poll_choice_votes_id_seq', 1, false);


--
-- Name: poll_choice_votes_poll_choice_id_seq; Type: SEQUENCE SET; Schema: public; Owner: speedypoll
--

SELECT pg_catalog.setval('poll_choice_votes_poll_choice_id_seq', 1, false);


--
-- Name: poll_choice_votes_poll_id_seq; Type: SEQUENCE SET; Schema: public; Owner: speedypoll
--

SELECT pg_catalog.setval('poll_choice_votes_poll_id_seq', 1, false);


--
-- Name: poll_choice_votes_pollster_id_seq; Type: SEQUENCE SET; Schema: public; Owner: speedypoll
--

SELECT pg_catalog.setval('poll_choice_votes_pollster_id_seq', 1, false);


--
-- Data for Name: poll_choices; Type: TABLE DATA; Schema: public; Owner: speedypoll
--

COPY poll_choices (id, poll_id, pollster_id, poll_choice, date_added) FROM stdin;
\.


--
-- Name: poll_choices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: speedypoll
--

SELECT pg_catalog.setval('poll_choices_id_seq', 1, false);


--
-- Name: poll_choices_poll_id_seq; Type: SEQUENCE SET; Schema: public; Owner: speedypoll
--

SELECT pg_catalog.setval('poll_choices_poll_id_seq', 1, false);


--
-- Name: poll_choices_pollster_id_seq; Type: SEQUENCE SET; Schema: public; Owner: speedypoll
--

SELECT pg_catalog.setval('poll_choices_pollster_id_seq', 1, false);


--
-- Data for Name: polls; Type: TABLE DATA; Schema: public; Owner: speedypoll
--

COPY polls (id, pollster_id, topic, date_added) FROM stdin;
\.


--
-- Name: polls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: speedypoll
--

SELECT pg_catalog.setval('polls_id_seq', 1, false);


--
-- Name: polls_pollster_id_seq; Type: SEQUENCE SET; Schema: public; Owner: speedypoll
--

SELECT pg_catalog.setval('polls_pollster_id_seq', 1, false);


--
-- Data for Name: pollsters; Type: TABLE DATA; Schema: public; Owner: speedypoll
--

COPY pollsters (id, initials, emailaddress) FROM stdin;
\.


--
-- Name: pollsters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: speedypoll
--

SELECT pg_catalog.setval('pollsters_id_seq', 1, false);


--
-- Name: poll_choice_votes poll_choice_votes_pkey; Type: CONSTRAINT; Schema: public; Owner: speedypoll
--

ALTER TABLE ONLY poll_choice_votes
    ADD CONSTRAINT poll_choice_votes_pkey PRIMARY KEY (id);


--
-- Name: poll_choices poll_choices_pkey; Type: CONSTRAINT; Schema: public; Owner: speedypoll
--

ALTER TABLE ONLY poll_choices
    ADD CONSTRAINT poll_choices_pkey PRIMARY KEY (id);


--
-- Name: polls polls_pkey; Type: CONSTRAINT; Schema: public; Owner: speedypoll
--

ALTER TABLE ONLY polls
    ADD CONSTRAINT polls_pkey PRIMARY KEY (id);


--
-- Name: pollsters pollsters_pkey; Type: CONSTRAINT; Schema: public; Owner: speedypoll
--

ALTER TABLE ONLY pollsters
    ADD CONSTRAINT pollsters_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

