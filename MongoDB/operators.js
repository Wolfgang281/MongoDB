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

//TODO:
//& this will fetch the documents based on the length of the array
//? syntax for $elemMatch
// filter part -> { fieldname: { $elemMatch: { conditions } } })
db.collectionName.find({ fieldname: { $elemMatch: { conditions } } });
db.prods.find({ cart: { $elemMatch: { name: "phone" } } });

//! =============================== element
//? Element
//& $exists, $type

//& this will fetch the documents based whether the field is present or not
//? syntax for $elemMatch
// filter part -> { fieldname: { $exists: { boolean } } })

//& this will fetch the documents based on the datatype of the field
//? syntax for $type
// filter part -> { fieldname: { $type: { "datatype" } } })
