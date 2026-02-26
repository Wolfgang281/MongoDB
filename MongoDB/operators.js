//! Operators ==> all operators in mongodb starts with "$"

//~ 1. Query Operators (used in filter objects for find, update, aggregate)
//? Comparison
//& $eq, $ne, $gt, $gte, $lt, $lte, $in, $nin
//? Logical
//& $and, $or, $not, $nor
//? Element
//& $exists, $type
//? Evaluation
//& $regex, $expr, $mod, $text, $where, $jsonSchema
//? Array
//& $all, $elemMatch, $size
//? Geospatial
//& $geoWithin, $geoIntersects, $near, $nearSphere, $box, $center, $centerSphere, $polygon
//? Bitwise
//& $bitsAllClear, $bitsAllSet, $bitsAnyClear, $bitsAnySet
//? Comments / Meta
//& $comment, $natural

let a = 10;

//~ 2. Update Operators (used in update documents)
//? Field Update
//& $set, $unset, $rename, $setOnInsert
//? Arithmetic / Field Manipulation
//& $inc, $mul, $min, $max, $currentDate
//? Array Update
//& $push (with $each, $slice, $sort, $position), $addToSet (with $each), $pop, $pull, $pullAll, $ (positional), $[] (all positional), $[<identifier>] (filtered positional)
//? Bitwise Update
//& $bit

//~ 3. Aggregation Operators (used inside aggregation pipelines)
//? Pipeline Stages
//& $match, $group, $project, $unwind, $lookup, $sort, $limit, $skip, $count, $sample, $facet, $bucket, $bucketAuto, $replaceRoot, $merge, $out, $unionWith, $graphLookup, $set, $unset, $addFields
//? Accumulators (in $group and $project)
//& $sum, $avg, $first, $last, $max, $min, $push, $addToSet, $stdDevPop, $stdDevSamp, $mergeObjects
//? Expression Operators (in $project, $addFields, etc.)
//? Arithmetic
//& $add, $subtract, $multiply, $divide, $mod, $abs, $ceil, $floor, $trunc, $round, $pow, $sqrt, $exp, $ln, $log, $log10
//? Date
//& $dateToString, $dateFromParts, $dateFromString, $dayOfYear, $dayOfMonth, $dayOfWeek, $year, $month, $week, $hour, $minute, $second, $millisecond, $isoDayOfWeek, $isoWeek, $isoWeekYear, $dateAdd, $dateSubtract, $dateDiff
//? String
//& $concat, $substr, $substrCP, $toLower, $toUpper, $trim, $ltrim, $rtrim, $split, $strLenCP, $strcasecmp, $regexMatch, $regexFind, $regexFindAll, $replaceOne, $replaceAll
//? Array
//& $arrayElemAt, $first, $last, $slice, $size, $concatArrays, $reverseArray, $filter, $map, $reduce, $zip, $in, $indexOfArray, $range
//? Comparison
//& $cmp, $eq, $ne, $gt, $gte, $lt, $lte
//? Logical
//& $and, $or, $not, $switch, $cond, $ifNull
//? Conditional
//& $switch, $cond, $ifNull
//? Type Conversion
//& $type, $convert, $toBool, $toDate, $toDecimal, $toDouble, $toInt, $toLong, $toObjectId, $toString
//? Set
//& $setEquals, $setIntersection, $setUnion, $setDifference, $setIsSubset, $anyElementTrue, $allElementsTrue
//? Object / Document
//& $mergeObjects, $objectToArray, $arrayToObject, $getField, $setField
//? Variable / Literal
//& $literal, $let

//~ 4. Projection Operators (used in find() projections)
//& $ (first matching array element), $elemMatch, $slice, $meta

//~ 5. Geospatial Operators (also in Query, but separate stage)
//? Query Geospatial (already listed under Query)
//? Aggregation Stage
//& $geoNear

//~ 6. Text Search Operators
//? Query
//& $text (with $search, $language, $caseSensitive, $diacriticSensitive)
//? Aggregation
//& $meta: "textScore"

//~ 7. Miscellaneous / Meta
//& $comment, $natural, $hint, $maxTimeMS, $query, $orderby (legacy)

//~ ================= OPERATORS =========================
//? a reserved symbol which performs a specific task on multiple operands (+, /)

let sum = 2 + 3;
//? + --> operator
//? 2 and 3 --> operands

//! in mongodb all operators starts with "$"

//! query operators (used in filter objects)
//? 1) comparison ->
$eq; //? (equals to)
$ne; //? not equals to
$gt; //? greater than
$gte; //? greater than or equals to
$lte; //? lesser than or equals to
$lt; //? less than

//? filter object --> (syntax for above 6 operators)
//~ { fieldName: {$op: value} }

//! display all the emp names and age whose age is greater than 27
db.emp.find({ age: { $gt: 27 } }, { empName: 1, _id: 0, age: 1 });

//! display the complete details of emp whose name is "smith"
db.emp.findOne({ empName: { $eq: "smith" } }); //? explicit use of $eq
db.emp.findOne({ empName: "smith" }); //? implicit use of $eq

$in; //& in -> this will fetch all the docs, which fulfills any one of the given values
$nin; //& not in -> this will fetch al the docs, which fails to fulfill any one of the given values

//? filter object --> (syntax for above 6 operators)
//~ { fieldName: {$op: [v1, v2, v3, ......]} }

db.emp.find({ age: { $in: [42, 45, 30] } }, { age: 1, _id: 0 });
db.emp.find(
  { job: { $nin: ["clerk", "manager"] } },
  { job: 1, empName: 1, _id: 0 },
);

//? to create a collection (createCollection("name"))
//? second way -> db.collectionName.insertOne/Many()
db.coll3.insertOne({ key: "value" });

//! Find employees with sal greater than 2000.
db.emp.find({ sal: { $gt: 2000 } });

//! Find departments with budget less than or equal to 150000.
db.dept.find({ budget: { $lte: 150000 } });

//! Query employees whose city equals "Chicago".
db.emp.find({ city: { $eq: "Chicago" } });

//~ 1) logical -> used when there are multiple conditions
//? $and,
//? $or
//? $nor

//& syntax for above three
//? filter object -> { $op: [{c1}, {c2}, {c3}, .....] }

//& Query employees with bonus >= 1000 and sal < 3000.
db.emp.find(
  {
    $and: [
      { sal: { $lt: 3000 } }, //? c1
      { bonus: { $gte: 1000 } }, //? c2
    ],
  },
  { bonus: 1, sal: 1, _id: 0 },
);

//& Query employees with age >= 25 or deptNo = 20
db.emp.find(
  { $nor: [{ age: { $gte: 25 } }, { deptNo: 20 }] },
  { age: 1, deptNo: 1, _id: 0 },
);

//? $not -> this inverts the expression
//& syntax for $not
//? filter object -> { $not: {fieldName: {expression} } } 2>8, 5==8

//& display all the emp who are not working as clerk ($ne, $not)
db.emp.find({ job: { $not: { $eq: "clerk" } } }, { job: 1 });
db.emp.find({ job: { $ne: "clerk" } }, { job: 1 });

db.emp.find({ age: { $not: { $gt: 28 } } }, { age: 1, _id: 0 });
//? op -> docs whose age is age<= 28

db.emp.find({ age: { $not: { $gte: 28 } } }, { age: 1, _id: 0 });
//? op -> docs whose age is age< 28

//! =============================================================================
//~ case1) when multiple conditions are applied on same field -> last condition will work
//& find all the emp who are having salary in range of 1000 to 2000 (both are included)
db.emp.find({ sal: { $gte: 1000 }, sal: { $lte: 2000 } }, { sal: 1, _id: 0 });
X;
db.emp.find(
  {
    $and: [{ sal: { $gte: 1000 } }, { sal: { $lte: 2000 } }],
  },
  { sal: 1, _id: 0, empName: 1 },
);
db.emp.find(
  {
    $and: [
      { sal: { $gte: 1000 } },
      { sal: { $lte: 2000 } },
      { empName: "adams" },
    ],
  },
  { sal: 1, _id: 0, empName: 1 },
);

db.emp.find({ job: "manager", job: "clerk" }, { job: 1, _id: 0 });

//~ case2) when multiple conditions are applied on different fields -> as LOGICAL AND
//! find all the emp who are working in dept 20 and having age greater than 30
db.emp.find({ age: { $gt: 30 }, deptNo: 20 }, { age: 1, deptNo: 1, _id: 0 });
db.emp.find(
  { $and: [{ age: { $gt: 30 } }, { deptNo: 20 }] },
  { age: 1, deptNo: 1, _id: 0 },
);

//! display all the names details of emp who are having performance rating greater than 4.3
db.emp.find({ "performance.rating": { $gt: 4.3 } }, { empName: 1, _id: 0 });

//? in order to access nested properties use double quotes

//~ fetching based on nested properties
//! display all the names and last review date of emp who are having performance rating greater than 4.3
db.emp.find(
  { "performance.rating": { $gt: 4.3 } },
  { empName: 1, _id: 0, "performance.lastReviewDate": 1 },
);

//~ fetching based on dates
//! ISO date format --> YYYY-MM-DD T HH:mm:ss.ms Z (+5 30)
//? utc --> it is based on the region
//? t -> separator (separates date from time)
//? Z -> offset value

//! find all the emp who were hired after 31 jan 1982
db.emp.find(
  { hireDate: { $gt: ISODate("1982-01-31") } },
  { hireDate: 1, _id: 0 },
);
//? while fetching based on dates we have to use this format -> ISODate("YYYY-MM-DD")

//~ fetching based on _id
//! fetch the details of emp whose id is 66a23517b5c6990483c4e49b
db.emp.findOne({ _id: ObjectId("66a23517b5c6990483c4e49b") });
//? while fetching based on _id use this format -> ObjectId("12 bytes id")
//? size should be exactly of 12 bytes

//~ fetching based on arrays
db.emp.find({ skills: "sql" }, { skills: 1, _id: 0 });
db.emp.find({ skills: "sql", skills: "python" }, { skills: 1, _id: 0 });
db.emp.find({ skills: ["sql", "python"] }, { skills: 1, _id: 0 });

db.emp.find(
  { $and: [{ skills: "sql" }, { skills: "python" }] },
  { skills: 1, _id: 0 },
);

//! ==================================== array op =====================
//& $all, $elemMatch, $size

//& this will fetch the documents which matches all the given values
//? syntax for $all
// filter part -> { fieldName: {$all: [v1, v2, v3,.....]} }

db.emp.find({ skills: { $all: ["sql", "python"] } }, { skills: 1, _id: 0 });
db.emp.find(
  { skills: { $all: ["html", "javascript"] } },
  { skills: 1, _id: 0 },
);

//! fetch all the docs who are having skills as sql or python
db.emp.find({ skills: { $in: ["sql", "python"] } }, { skills: 1, _id: 0 });

//? we can use $in on arrays and as well as on strings, numbers, etc whereas $all can only be used on arrays

//& this will fetch the documents based on the length of the array
//? syntax for $size
// filter part -> { fieldName: { $size: +ve INT } }

//! fetch all the emp who are having only two skills
db.emp.find({ skills: { $size: 2 } }, { skills: 1, _id: 0 });

let cart = [
  { name: "phone", price: 1200, qty: 2 },
  { name: "laptop", price: 39999, qty: 1 },
];

//& this will fetch the documents based on the length of the array

//? syntax for $elemMatch: it is used when we want to apply conditions on array of objects
// filter part -> { fieldname: { $elemMatch: { conditions } } })
db.collectionName.find({ fieldname: { $elemMatch: { conditions } } });
db.prods.find({ cart: { $elemMatch: { name: "phone" } } });

db.survey.insertMany([
  {
    _id: 1,
    results: [
      { product: "abc", score: 10 },
      { product: "xyz", score: 5 },
    ],
  },
  {
    _id: 2,
    results: [
      { product: "abc", score: 8 },
      { product: "xyz", score: 7 },
    ],
  },
  {
    _id: 3,
    results: [
      { product: "abc", score: 7 },
      { product: "xyz", score: 8 },
    ],
  },
  {
    _id: 4,
    results: [
      { product: "abc", score: 7 },
      { product: "def", score: 8 },
    ],
  },
  { _id: 5, results: { product: "xyz", score: 7 } },
]);

// ! fetch all the docs in which product "def" is present
db.survey.find({
  results: {
    $elemMatch: { $and: [{ product: "def" }, { score: { $gt: 7 } }] },
  },
});
db.survey.find({
  results: {
    $elemMatch: { product: "def" },
    score: { $gt: 7 },
  },
});

//! =============================== element
//? Element
//& $exists, $type

//& this will fetch the documents based whether the field is present or not
//? syntax for $elemMatch
// filter part -> { fieldname: { $exists: { boolean } } })

//& this will fetch the documents based on the datatype of the field
//? syntax for $type
// filter part -> { fieldname: { $type: { "datatype" } } })

//! ================= evaluation ===================
//?1)  $regex -> regular expression: for pattern matching and it only works on string
// syntax for $regex ->
//! filter part -> {fieldName: { $regex: /pattern/ }}
//! filter part -> {fieldName: { $regex: "pattern" }}

//~ 1) display all the emp names who are having letter "a" in their name
db.emp.find({ empName: { $regex: /a/ } }, { empName: 1, _id: 0 });

//~ 2) display all the emp names who are having letters "ar" in their name
db.emp.find({ empName: { $regex: /ar/ } }, { empName: 1, _id: 0 });

//? /letters/ : by passing this, mongodb will look for the docs whose name contains the letters in the same order no matter the position

//~ 3) display all the emp names who are having letter "a" as the first char in their name
db.emp.find({ empName: { $regex: /^a/ } }, { empName: 1, _id: 0 });

//& cap symbol -> shift + 6 (^) used to match the pattern from the starting of the string

//~ 4) display all the emp names who are having letter "n" as the last char in their name
db.emp.find({ empName: { $regex: /n$/ } }, { empName: 1, _id: 0 });

//& dollar symbol -> shift + 4 ($) used to match the pattern from the ending of the string

//~ 5) display all the emp names who are having letter "n" as the second last char in their name
db.emp.find({ empName: { $regex: /n.$/ } }, { empName: 1, _id: 0 });
db.emp.find({ empName: { $regex: /^..l/ } }, { empName: 1, _id: 0 });
//& dot symbol (.) is used to skip the particular digit/character

//~ 6) display all the emp names who having exactly 4 letters in their name
db.emp.find({ empName: { $regex: /^\w{4}$/ } }, { empName: 1, _id: 0 });
db.emp.find({ empName: { $regex: /^....$/ } }, { empName: 1, _id: 0 });

//& {INT} -> defines the length of the pattern

//~ 7) display all the emp names who having first letter as "a" and last as "s"
db.emp.find({ empName: { $regex: /^a.*s$/ } }, { empName: 1, _id: 0 });
//& * -> skips n chars

//? 2) $expr -> a) it is used to write aggregation queries
//TODO:
//? b) it is used to compare the values within the document

// syntax for $expr ->
//! filter part -> {$expr: { $CO: ["f1", "f2"] }}

//! find all the emp who are having comm > bonus
// db.emp.find({ $expr: { $gt: [20, 10] } }); //? 20 > 10
// db.emp.find({ $expr: { $gt: [10, 20] } }); //? 10 > 20

db.emp.find(
  { $expr: { $gt: ["$comm", "$bonus"] } },
  { bonus: 1, comm: 1, _id: 0 },
);
//? whenever we are passing mongodb fields as a value, we need to use double quotes and prefix it with $.

//! display all the emp names, deptNo and age whose age is less than deptNo
db.emp.find(
  { $expr: { $lt: ["$age", "$deptNo"] } },
  { empName: 1, deptNo: 1, age: 1, _id: 0 },
);

//~ ===================== updateOne/Many() ==============
// {filter}, {new data}, {options} -> upsert/arrayFilters
//? update the existing value
//? update the existing key
//? add a new key-value pair
//? delete a key-value pair
//& cannot edit _id both key and value

//! Field Update Operators ($set, $unset, $rename, setOnInsert)
//? $set : it is used to update the existing value when the field is present and if not then it will add a new key-value pair
// syntax -> {new data/updation part}
// { $set: { fieldName: "value", fN2: value2, .......... } }

db.dept.updateOne(
  { dept: 10 },
  {
    $set: {
      loc: "NEW YORK",
      budget: 78723,
      floor: 56,
    },
  },
);

let resp = {
  acknowledged: true,
  // insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  // upsertedCount: 0,
};

db.dept.updateOne(
  { dept: 10 },
  {
    $set: { key5: "value5" },
  }, //~ here a new key value pair will be added
);

//? $rename : it is used to update the existing key.
// syntax -> {new data/updation part}
// { $rename: { oldFieldName: "newFieldName"} }

db.users.updateOne(
  { "user-name": "Rajesh Kumar" },
  { $rename: { email: "user-email" } },
);

//? $unset : it is used to delete a key-value pair.
// syntax -> {new data/updation part}
// { $unset: { fieldName: "",fieldName: "",fieldName: "",...} }
db.users.updateOne(
  { "user-name": "Rajesh Kumar" }, // filter
  { $unset: { age: "" } }, // update
);

//? options -> upsert:true/false (default:false)
db.users.updateOne(
  { "user-name": "Rajesh Kumar" }, // filter
  { $unset: { age: "" } }, // update
);
db.users.updateOne(
  { "user-name": "Rajesh Kumar" }, // filter
  { $unset: { age: "" } }, // update
  { upsert: false },
);

//! scenario-1) when the filter condition gets matched
//~ (when condition gets matched doc will get updated)
//? a) upsert : true -> doc will get updated
db.students.updateOne(
  { email: "aman@gmail.com" },
  { $set: { age: 18, k2: v2, k3: v3 } },
  { upsert: true },
);

//? b) upsert : false (default) -> doc will get updated
db.students.updateOne(
  { email: "abc@gmail.com" },
  { $set: { email: "aman@gmail.com" } },
  { upsert: false },
);

//! scenario-2) when the filter condition does not get matched
//? a) upsert : true -> doc will get inserted with the given values
db.students.updateOne(
  { email: "098@gmail.com", age: 34, phone: "876879898", isMarried: true },
  { $set: { phone: 87688698 } },
  { upsert: true },
);

//? b) upsert : false -> no updates is happening
db.students.updateOne(
  { email: "123@gmail.com" },
  { $set: { phone: 87688698 } },
  { upsert: false },
);
db.students.updateOne(
  { email: "123@gmail.com" },
  { $set: { phone: 87688698 } },
);

//? $setOnInsert: this is used to set the fields in a document whenever a new doc gets upserted. If no doc is upserted, this setOnInsert will not execute

db.students.updateOne(
  { email: "467@gmail.com" },
  { $set: { phone: 87688698 }, $setOnInsert: { haveID: true } },
);
db.students.updateOne(
  { email: "498798@gmail.com" },
  { $set: { phone: 87688698 }, $setOnInsert: { haveID: true } },
  { upsert: true },
);

db.students.updateOne(
  { email: "aman@gmail.com" },
  { $set: { age: 20 }, $setOnInsert: { haveID: true } },
  { upsert: true },
);

//! class collection -> feesReceipt (old students)
db.students.find({ username: "Priya Gupta" });
db.students.find({ username: { $regex: /priya/i } });

db.students.updateOne(
  { username: { $regex: /priya/i } }, //~ "i" is for ignore
  { $set: { feeReceipt: 16000 }, $setOnInsert: { id: 8 } },
  { upsert: true },
);
//? here, if the student is present, then only feeReceipt will be updated
//! and if the student is not present in db, then id will also be inserted

db.students.updateOne(
  { username: { $regex: /priya/i } },
  { $set: { feeReceipt: 16000, id: 8 } },
  { upsert: true },
);
//! here, if student is present or not id will be inserted

db.students.updateOne(
  { _id: ObjectId("6971e7d8fcb2b0e3f7735119") },
  { $set: { subjects: "PCM" }, $setOnInsert: { _id: "12345" } },
  { upsert: true },
); //? error as _id is immutable

//! $currentDate -> used to add the current date
// updation part { $currentDate: { fieldName: true } }
db.emp.find({ empName: { $regex: /^[sk]/ } }, { empName: 1, _id: 0 });

db.emp.find(
  { hireDate: { $lt: ISODate("1982-01-01") } },
  { empName: 1, lastIncrement: 1, _id: 0 },
);

db.emp.updateMany(
  { hireDate: { $lt: ISODate("1982-01-01") } },
  {
    $set: {
      lastIncrement: new Date(),
    },
  },
);
db.emp.updateMany(
  { hireDate: { $lt: ISODate("1982-01-01") } },
  {
    $currentDate: {
      lastIncrement: true,
    },
  },
);

//? Arithmetic / Field Manipulation
//& $inc, $mul, $min, $max, $currentDate

//! 1) $inc -> it is used to increment/decrement the amount by the specified value
//~ syntax -> updation part {}
// { $inc: {fieldName: +/-value }

db.students.updateMany({ city: "Gurugram" }, { $inc: { age: -30 } });
db.students.updateMany({ city: "Gurugram" }, { $inc: { age: 2 } });

db.students.updateMany({ city: "Gurugram" }, { $inc: { salary: 2 } });
// if the field is not present, then the field will be added with the specified value
//! we cannot use null with $inc

//! 2) $mul -> it is used to multiple the field by the specified value
//~ syntax -> updation part {}
// { $mul: {fieldName: +/-value }
db.students.updateMany({}, { $mul: { age: 2 } });
// if the field is not present, then the field will be added with the  value as 0

//! 2) $max -> it is used to update the maximum value
//~ syntax -> updation part {}
// { $max: {fieldName: +/-value }
/// IN ORDER TO PERFORM AN UPDATE OPERATION, PASS STRICTLY GREATER VALUE THAT IS STORED IN DB
// in db we have 100 and we are passing 200 (update)
// in db we have 100 and we are passing 99, 100 (no updates)

db.students.updateOne({ city: "Gurugram" }, { $max: { bonus: 16 } });
// if the field is not present, then the field will be added with the specified value

//! 3) $min -> it is used to update the minimum value
//~ syntax -> updation part {}
// { $min: {fieldName: +/-value }
/// IN ORDER TO PERFORM AN UPDATE OPERATION, PASS STRICTLY lower VALUE THAT IS STORED IN DB
// in db we have 100 and we are passing 200, 100 (no-update)
// in db we have 100 and we are passing 99 (updates)
db.students.updateOne({ city: "Gurugram" }, { $min: { bonus: 16 } });
// if the field is not present, then the field will be added with the specified value

db.emp.find({ comm: null });
db.students.updateMany({ city: "Gurugram" }, { $inc: { age: null } });
db.students.updateOne({ city: "Gurugram" }, { $max: { bonus: null } });

db.arrayUpdate.insertMany([
  {
    _id: 1,
    name: "sri",
    skills: ["mongodb", "sql", "nodejs"],
  },
  {
    _id: 2,
    name: "sirisha",
    skills: ["postgres", "sql", "php"],
  },
  {
    _id: 3,
    name: "varun",
    skills: ["python", "sql", "fast_api"],
  },
  {
    _id: 4,
    name: "ashwin",
    skills: ["python", "django", "fast_api"],
  },
]);
//! ================= Array Update Operators ====================

//! $push -> this will add an element at the last of the array
// { $push: {fieldName: "value" }

db.arrayUpdate.updateOne({ _id: 1 }, { $push: { skills: "express" } });

db.arrayUpdate.updateOne(
  { _id: 2 },
  { $push: { skills: [".net", "laravel"] } },
);
// it will create a nested array
// we cannot specify a particular index of insertion

db.arrayUpdate.updateOne({ _id: 1 }, { $push: { hobbies: "gaming" } });
// if the field is not present, then the field will be created and the datatype will be an array

//! 2) $push + $each -> using these two operators we can add multiple elements to an array and we can also specify the position ($each cannot be used without $push), sort the elements, slice the array.
// { $push: {fieldName:{ $each: ["v1", "v2", ....] } }
db.arrayUpdate.updateOne(
  { _id: 2 },
  { $push: { skills: [".net", "laravel"] } },
);

db.arrayUpdate.updateOne(
  { _id: 3 },
  { $push: { skills: { $each: [".net", "django", "ai/ml"] } } },
);

// to specify the index ($position, $slice, $sort) -> without $each we cannot use $position, $slice, $sort

db.arrayUpdate.updateOne(
  { _id: 4 },
  { $push: { skills: { $each: ["html"] } } },
);
// if no position is specified then it will be added at last

db.arrayUpdate.updateOne(
  { _id: 2 },
  { $push: { skills: { $each: ["react"], $sort: -1 } } },
);

db.arrayUpdate.updateOne(
  { _id: 1 },
  { $push: { skills: { $each: ["react"], $sort: 1 } } },
);

// sort : -1 -> in descending order
// sort : 1 -> in ascending order

db.arrayUpdate.updateOne(
  { _id: 1 },
  { $push: { skills: { $each: ["html"], $slice: -2 } } },
);

// $slice -> it will keep the given number of elements (from first or last)
// $slice:3 -> it will keep the first 3 ele, rest will be removed
// $slice:-3 -> it will keep the last 3 ele, rest will be removed

//! 2) $addToSet -> using this we can only insert unique elements
// { $addToSet: {fieldName:{ $each: ["v1", "v2", ....] } }

// { $addToSet: {fieldName:"value" }

db.arrayUpdate.updateOne({ _id: 1 }, { $addToSet: { skills: "express" } });

db.arrayUpdate.updateOne(
  { _id: 3 },
  { $addToSet: { skills: { $each: [".net", "django", "ai/ml", "rest_api"] } } },
);

//! we cannot use $position, $slice, $sort with $addToSet

db.arrayUpdate.updateOne(
  { _id: 1 },
  { $addToSet: { skills: { $each: ["react"], $position: 1 } } },
);
