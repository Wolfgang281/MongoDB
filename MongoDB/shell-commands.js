//! database level commands

//~ by default --> we have test db

//? 1) to display all the databases
//~  show databases
//~  show dbs

//? 2) to create a new database or to switch to a db
//~ use database-name (if database-name is already present, then it will be switched, otherwise a new db will be created)
//& example -> use library
//& 1) we can insert a collection
//& 2) we can insert a document : db.collectionName.insertOne/Many()

//? 3) to create a collection
//~ db.createCollection("collection-name")
//& db.createCollection("books")

//! after every operation in shell, refresh the compass to see the updates

//? 4) to display all the collections
//~ show collections
//~ show tables
//~ db.getCollectionNames()

//? 5) to delete a collection
//~ db.collectionName.drop()
//& example -> db.books.drop()

//? 6) to rename a collection
//~ db.collectionName.renameCollection("the new name")
//& example -> db.books.renameCollection("newName")

//? 7) to delete a database
//~ db.dropDatabase()

//! renaming database is not possible in mongodb.

//~ 8) to get collection info along with meta data
//?  db.getCollectionInfos()

//!=================================== CRUD on documents ===========================

//? 10) inserting a single document
//~ db.collection-name.insertOne({key:value,.......}, {options})

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

db.students.insertOne({ name: "varun", age: 23 });

//? 10) inserting a multiple documents
//~ db.collection-name.insertMany([{}, {}, .....], {options})

db.students.insertMany([
  { name: "ashwin", age: 12, _id: "1" },
  { name: "sri", age: 11, _id: "2" },
  { name: "varun", age: 23, _id: "3" },
]);

db.students.insertMany(
  [
    { name: "sirisha", age: 11, _id: "4" },
    { name: "ajay", age: 10, _id: "2" },
    { name: "ajay", age: 10, _id: "5" },
  ],
  {
    ordered: false, //? ordered:false is used to skip the error part and it keeps inserting the net documents (by default, it is true)
    writeConcern: { w: 0, j: 1, wtimeout: 5000 },
  },
);

//& "w": boolean -> acknowledgement (from db)
//& "j": boolean -> represents a journal(series of write operations) maintained by mongodb (for it;s internal working)
//& "wtimeout":"__ms" --> this will be representing the number of seconds to skip the operation if it is not completed within the given time period

//? 11) fetching/reading a single document -> returns {}
//~ db.collection-name.findOne({filter}, {projection})
//& filter --> in this, we pass the filter condition

//? in case of no condition, the top most document will be fetched
db.students.findOne();
db.students.findOne({});
db.students.findOne({}, {});

// ? simple condition ==
//& find the details of student whose name is "sirisha" (mongodb is sensitive)
db.students.findOne({ name: "sirisha" });
db.students.findOne({ age: 10 });
//& when multiple docs are fulfilling the condition, findOne will return only the first matched doc

//& projection --> this is used to show/hide fields/keys from the matched docs
//? to hide a field : { keyName: 0 }
//? to display a field : { keyName: 1 }
//? while using projection -> _id will be always set to 1
db.students.findOne({ age: 10 }, { name: 1, _id: 0 });

//? 12) fetching/reading multiple documents -> returns [{}, ....]
//TODO: Cursor
//~ db.collection-name.find({filter}, {projection/ option})
db.emp.find({ deptNo: 10 }, { empName: 1, deptNo: 1, _id: 0 });

//! show the names of all the emp
db.emp.find({}, { empName: 1, _id: 0 });

//? 13) deleting a single document
//~ db.collection-name.deleteOne({filter})

db.emp.deleteOne(); //? this will give an error
db.emp.deleteOne({}); //? if we are not passing any filter, then the first doc will get deleted

//? 14) deleting multiple documents
//~ db.collection-name.deleteMany({filter})
//& if we are not passing any filter, then all the docs will get deleted

//TODO: operators
//? 15) updating a single document
//~ db.collection-name.updateOne({filter}, {new data}, {options})

//? 16) updating multiple documents
//~ db.collection-name.updateMany({filter}, {new data}, {options})

//? https://fastdl.mongodb.org/tools/db/mongodb-database-tools-windows-x86_64-100.14.1.msi
//! mongoimport "path of the file" -d dbName -c collName2 --jsonArray

//! capped collections -> to limit the number of docs
db.createCollection("capColl", {
  capped: true,
  size: 1024 * 1024 * 1024, //? overall size of the collection
  max: 3, //? number of docs allowed
});

db.capColl.insertMany([{ id: 1 }, { id: 2 }]);

//! bulkWrite() --> to combine multiple query into a single operation
