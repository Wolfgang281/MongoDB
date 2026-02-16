//! data and information

//? data are raw facts and figures
//~ ashwin, 34, 21, 23, varun, html, css, ashwin

//? information --> processed data : ()
//~ ashwin has scored 34 in html exam

//TODO: data or information what is stored in DB?

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
