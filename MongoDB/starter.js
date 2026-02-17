//! data and information

//? data are raw facts and figures
//~ ashwin, 34, 21, 23, varun, html, css, ashwin

//? information --> processed data : ()
//~ ashwin has scored 34 in html exam

//? or information what is stored in DB?
//! data

//? database --> collection of information, container used to store data, fetch, manage

//? DBMS --> database management system (mysql, oracle, mongodb): it is used to perform operations on database
//~ CRUD (create, read, update delete)

//! in database, data can be stored in two ways
//? sql --> structured query language (mysql, oracle, postgres, sqllite)
//? no-sql --> not only structured query language (mongodb, redisDB)

//! sql --> 1) in sql databases, in order to store data we have to create a table(structure/schema) first
//! 2) data are stored in tabular structure( rows an cols)
//! 3) here the schema is fixed or static
//! 4) mysql, oracle sql, sql-lite, etc...

//! no-sql --> 1) in no-sql databases, in order to store data we don't have to define a schema
//! 2) in no-sql dbs, data is stored in document, key-value pair, graph and wide
//! 3) here structure dynamic.
//! 4) mongodb, redis, cassendra, neo4j , etc...

//! types of nosql dbs
//~ 1) document based no sql db
//~ 2) key-value based no sql db
//~ 3) graph based no sql db
//~ 4) wide column/columnar based no sql db

//& 1) document based no sql db --> in this, data is stored in document format (JSON like structure: BSON), example -< mongodb, couchDB
//~ entry number 1
let e1 = {
  name: "abc",
  id: 123,
  email: "abc@gmail.com",
};

let e2 = {
  name: "def",
  id: 345,
};

let e3 = {
  name: "yz",
  email: "y@gmail.com",
  id: 34,
  age: 34,
  sal: 124,
};

//& 2) key-value based no sql db: (caching -> optimize), here data is stored in key-value pair format, used for data caching. example redisDB
let e4 = "something";
let e5 = "another value";

//& 3) graph based no sql db -> here data is stored in nodes and nodes are connected through edges. example -< noe4j

//& 4) wide column -> here data is stored in table format, table is dynamic.example --> cassendra DB, used in ai model training
// let userEntry1
//     col1: name -> "abc"
//     col2: id -> 123,
//     col3: age -> 23

// let userEntry2
//     col1: name -> "abc"
//     col2: id -> 123,
//     col3: age -> 23
//     col4:email -> ""

//! difference between sql and no-sql dbs

//? sql (RDBMS)
//! schema is fixed or static
//! data is stored in tables (rows and cols)
//! it supports vertical scaling
//! suitable for cases where data integrity and reference is important
//! supports ACID transaction
//! it supports data rollback (deleted << undo)
//! examples -> mysql, postgres, ect..

//? no-sql
//! schema is dynamic or flexible
//! data is stored in documents, key-value, graphs, wide columns
//! it supports horizontal scaling
//! suitable for cases where data is unstructured or semi-structured
//! it supports BASE transaction (and some concepts of ACID)
//! it does not support data rollback
//! examples -> mongodb, redis, hBase..

//? data integrity -> emp table (name, id, deptNo); dept table (id, dName, location)
//~ "abc", 123, 20
//~ "abc", 123, 80
//! 10 ,20 ,30 deptNos

//! ++++++++++++++ scaling ++++++++++++++++++++++++++
//? --> scaling refers to the altering the capacity or size (RAM, storage) of the system

let myLaptop = {
  ram: 8,
  storage: 512,
};

//? availableResource = 1 gb ram left and 1 gb storage left

//! 1) DELETE THE EXISTING RESOURCES X

//! 2) UPGRADE THE EXISTING SYSTEM : vertical scaling
//? in this new resources are added to the existing system
let myLaptopUpgraded = {
  ram: 16,
  storage: 1024,
};

//! 3) BUY A NEW SYSTEM : horizontal scaling
//? in this new resources are added with the existing system
let myNewLaptop = {
  ram: 8,
  storage: 512,
};

//? distributed and highly available (db)

//! acid -> atomicity (all or none, no checkpoints), consistency, isolation, durability (persistence)
//? back application
//! bank app

//! base -> basically available, soft state, eventually consistent
//? any social media app instagram
//~ soft state : data will change without any user interference

//!
//? CAP theorem -> consistency, availability, partial tolerance(must)
//? pa: social media
//? pc: bank app

//! sql and nosql --> data is structured, relation : sql
//? unstructured, large amount -> nosql

//? netflix --> cassendraDb, sql
//? polyglot applications: node, java, python
// ? polyglot persistence

//! =========================== MONGODB --> ======================================
//~ it is a document based no-sql database which stores data in JSON like format (BSON)

//! sql
//? database (name) >> table (name) >> cols (input value) >> rows

//! mongodb
//? database (name) >> collections (name) >> documents{} >> key-value pair

//? mongodb server

//? https://www.google.com

//? mongodb://localhost:27017
//~ "mongodb": protocol
//~ "localhost": domain name
//~ "27017": port number

//! mongodb compass is a GUI (graphical user interface) through which we can interact with database without writing any piece of code (we can interact visually)
