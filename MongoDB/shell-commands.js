//! database level commands

//~ by default --> we have test db

//? 1) to display all the databases
//~  show databases
//~  show dbs

//? 2) to create a new database or to switch to a db
//~ use database-name (if database-name is already present, then it will be switched, otherwise a new db will be created)
//& example -> use library
//& 1) we can insert a collection
//& 2) we can insert a document

//? 3) to create a collection
//~ db.createCollection("collection-name")
//& db.createCollection("books")

//! after every operation in shell, refresh the compass to see the updates

//? 4) to display all the collections
//~ show collections
//~ show tables

//? 5) to delete a collection
//~ db.collectionName.drop()
//& example -> db.books.drop()

//? 6) to rename a collection
//~ db.collectionName.renameCollection("the new name")
//& example -> db.books.renameCollection("newName")

//? 7) to delete a database
//~ db.dropDatabase()

//TODO:
//? 8) db.getCollection()

//! renaming database is not possible in mongodb.

//!=================================== CRUD on documents ===========================

//? 9) inserting a single document
//~ db.collection-name.insertOne({key:value,.......})

//~ BSON -> binary JSON>
//? 1) this is a binary representation of JSON
//? 2) BSON will allow more datatypes to be passed like ObjectIdm, undefined etc..
//? 3) it is not human readable

//~ objectId --> it acts as a unique identifier in mongodb
//? no two docs can have same _id
//? it is a 12 byte (12*8 bits) hexadecimal(0-9 and a-f) string ObjectID
//? it will be added to the doc whenever a new doc is inserted in database
//? if we are giving _id as input, then mongodb will not generate it
//? it is immutable (both key and value)

//~ _id: ObjectId("69959910aba5099b6c73518a")
//! _id has 3 parts
//? 1) first 4 bytes: it represents the timestamp (ms). this timestamp is measured from 1 jan 1970
//? 2) next 5 bytes : PUI (process unique identifier) combination of processId+machineId
//? 3) last 3 bytes: it starts with a random value and increments each time by one when a doc is inserted (counter)
