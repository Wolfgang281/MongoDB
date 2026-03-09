db.emp.find({ age: { $gt: 700 } }); // -> [] (return type depends on the driver)
//? mongosh -> 20 docs

//? cursor -> it is an object which is returned by the find() and the default behavior of mongosh is to fetch the first 20 docs (default batch)
//? it -> this will fetch the set of 20 docs (next batch)

db.emp.findOne({ age: { $gt: 700 } }); // findOne -> datatype -> (object)

db.emp.insertMany([
  { count: 15 },
  { count: 16 },
  { count: 17 },
  { count: 18 },
  { count: 19 },
  { count: 19 },
  { count: 20 },
]);

db.emp.find({ age: { $gt: 700 } }).count();

let cursor = {
  // find()
  count: function () {},
  pretty: function () {},
  forEach: function () {},
  sort: function () {},
  skip: function () {},
  limit: function () {},
};

db.collection_name.find().forEach((doc) => {
  print(doc.title);
  print(doc.year);
});

//! sort -> it will sort the documents based on the field, -1 for descending and 1 for ascending
// find().sort({fieldname:1/-1, filedName2: 1/-1})

//! limit -> it will restrict the op to the given number of documents
// find().limit(+INT)

//! skip -> it will skip the given number of documents
// find().skip(+INT)

//! display the name of highest earned employee
db.emp
  .find({}, { salary: 1, _id: 0, empName: 1 })
  .sort({ salary: -1, empName: -1 })
  .limit(3);

db.emp.find({}, { salary: 1, _id: 0, empName: 1 }).limit(3);

db.emp
  .find({}, { salary: 1, _id: 0, empName: 1 })
  .sort({ salary: -1, empName: -1 })
  .skip(1)
  .limit(1);
