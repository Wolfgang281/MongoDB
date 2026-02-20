# MongoDB Operators Reference

> All MongoDB operators are prefixed with `$`. This reference covers only operators commonly used in real-world production projects.

---

## 1. Query Operators

_Used inside filter objects in `find()`, `findOne()`, `updateOne()`, `aggregate()` `$match`, etc._

---

### Comparison Operators

| Operator | Definition                                                                                           | Example                                       |
| -------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `$eq`    | Matches documents where the field equals the specified value. Implicit when you write `{ age: 25 }`. | `{ age: { $eq: 25 } }`                        |
| `$ne`    | Matches documents where the field does **not** equal the specified value.                            | `{ status: { $ne: "inactive" } }`             |
| `$gt`    | Matches documents where the field is **greater than** the specified value.                           | `{ price: { $gt: 100 } }`                     |
| `$gte`   | Matches documents where the field is **greater than or equal to** the specified value.               | `{ age: { $gte: 18 } }`                       |
| `$lt`    | Matches documents where the field is **less than** the specified value.                              | `{ stock: { $lt: 10 } }`                      |
| `$lte`   | Matches documents where the field is **less than or equal to** the specified value.                  | `{ score: { $lte: 100 } }`                    |
| `$in`    | Matches documents where the field value exists in the given array.                                   | `{ role: { $in: ["admin", "editor"] } }`      |
| `$nin`   | Matches documents where the field value does **not** exist in the given array.                       | `{ status: { $nin: ["banned", "deleted"] } }` |

---

### Logical Operators

| Operator | Definition                                                                                                                | Example                                                    |
| -------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `$and`   | Joins query conditions — all conditions must be true. Used explicitly when multiple conditions target the **same field**. | `{ $and: [{ age: { $gte: 18 } }, { age: { $lte: 60 } }] }` |
| `$or`    | Joins query conditions — at least one condition must be true.                                                             | `{ $or: [{ status: "active" }, { role: "admin" }] }`       |
| `$not`   | Inverts the effect of a query expression. Wraps around a single condition.                                                | `{ age: { $not: { $lt: 18 } } }`                           |
| `$nor`   | Matches documents that fail **all** given conditions (opposite of `$or`).                                                 | `{ $nor: [{ status: "banned" }, { verified: false }] }`    |

---

### Element Operators

| Operator  | Definition                                                                                                 | Example                        |
| --------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `$exists` | Matches documents where the specified field exists (`true`) or does not exist (`false`).                   | `{ phone: { $exists: true } }` |
| `$type`   | Matches documents where the field is of the specified BSON type (e.g., `"string"`, `"number"`, `"array"`). | `{ age: { $type: "number" } }` |

---

### Evaluation Operators

| Operator | Definition                                                                                                                | Example                                                |
| -------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `$regex` | Matches documents where the field value matches the given regular expression.                                             | `{ email: { $regex: /@gmail\.com$/, $options: "i" } }` |
| `$expr`  | Allows the use of aggregation expressions inside query filters. Useful for comparing two fields within the same document. | `{ $expr: { $gt: ["$totalPrice", "$budget"] } }`       |
| `$mod`   | Matches documents where the field value divided by a divisor has the specified remainder.                                 | `{ quantity: { $mod: [4, 0] } }`                       |
| `$text`  | Performs a full-text search on fields indexed with a text index.                                                          | `{ $text: { $search: "mongodb tutorial" } }`           |

---

### Array Operators

| Operator     | Definition                                                                                                                | Example                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `$all`       | Matches documents where an array field contains **all** the specified elements (order doesn't matter).                    | `{ tags: { $all: ["nodejs", "mongodb"] } }`           |
| `$elemMatch` | Matches documents where at least one element in an array field satisfies **all** the specified conditions simultaneously. | `{ scores: { $elemMatch: { $gte: 80, $lte: 100 } } }` |
| `$size`      | Matches documents where an array field has exactly the specified number of elements.                                      | `{ images: { $size: 3 } }`                            |

---

## 2. Update Operators

_Used in the update document of `updateOne()`, `updateMany()`, `findOneAndUpdate()`, etc._

---

### Field Update Operators

| Operator       | Definition                                                                                                                         | Example                                                 |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `$set`         | Sets the value of a field. If the field doesn't exist, it creates it. Most commonly used update operator.                          | `{ $set: { status: "active", updatedAt: new Date() } }` |
| `$unset`       | Removes the specified field from the document entirely.                                                                            | `{ $unset: { tempToken: "" } }`                         |
| `$rename`      | Renames a field. Useful for schema migrations.                                                                                     | `{ $rename: { "fname": "firstName" } }`                 |
| `$setOnInsert` | Sets field values only when a document is **inserted** (used with `upsert: true`). Has no effect on updates to existing documents. | `{ $setOnInsert: { createdAt: new Date() } }`           |

---

### Arithmetic & Field Manipulation Operators

| Operator       | Definition                                                                                 | Example                                    |
| -------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------ |
| `$inc`         | Increments a field by the specified amount. Use a negative value to decrement.             | `{ $inc: { views: 1, stock: -2 } }`        |
| `$mul`         | Multiplies the value of a field by the specified number.                                   | `{ $mul: { price: 1.1 } }`                 |
| `$min`         | Updates the field only if the specified value is **less than** the current field value.    | `{ $min: { lowestScore: 45 } }`            |
| `$max`         | Updates the field only if the specified value is **greater than** the current field value. | `{ $max: { highScore: 98 } }`              |
| `$currentDate` | Sets the field value to the current date, either as a `Date` or `Timestamp`.               | `{ $currentDate: { lastModified: true } }` |

---

### Array Update Operators

| Operator                                | Definition                                                                                                             | Example                                                                        |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `$push`                                 | Appends a value to an array. Combine with modifiers below for advanced control.                                        | `{ $push: { comments: { text: "Nice!", user: "ali" } } }`                      |
| `$push` + `$each`                       | Appends **multiple** values to an array at once.                                                                       | `{ $push: { tags: { $each: ["js", "ts"] } } }`                                 |
| `$push` + `$each` + `$slice`            | Appends elements and then trims the array to the specified size (negative = keep last N).                              | `{ $push: { logs: { $each: [newLog], $slice: -100 } } }`                       |
| `$push` + `$each` + `$sort`             | Appends elements and then sorts the array.                                                                             | `{ $push: { scores: { $each: [95], $sort: -1 } } }`                            |
| `$push` + `$each` + `$position`         | Appends elements at a specific index instead of the end.                                                               | `{ $push: { items: { $each: ["x"], $position: 0 } } }`                         |
| `$addToSet`                             | Adds a value to an array **only if it doesn't already exist** — ensures uniqueness.                                    | `{ $addToSet: { roles: "editor" } }`                                           |
| `$addToSet` + `$each`                   | Adds multiple unique values to an array.                                                                               | `{ $addToSet: { tags: { $each: ["a", "b"] } } }`                               |
| `$pop`                                  | Removes the first (`-1`) or last (`1`) element from an array.                                                          | `{ $pop: { queue: -1 } }`                                                      |
| `$pull`                                 | Removes all elements from an array that match a specified condition or value.                                          | `{ $pull: { scores: { $lt: 50 } } }`                                           |
| `$pullAll`                              | Removes all occurrences of the specified values from an array.                                                         | `{ $pullAll: { tags: ["spam", "test"] } }`                                     |
| `$` (positional)                        | Updates the **first** matching array element without knowing its index. Used with a query that identifies the element. | `{ $set: { "scores.$": 100 } }`                                                |
| `$[]` (all positional)                  | Updates **all** elements in an array field.                                                                            | `{ $inc: { "scores.$[]": 5 } }`                                                |
| `$[<identifier>]` (filtered positional) | Updates only the array elements that match the `arrayFilters` condition.                                               | `{ $set: { "scores.$[el]": 0 } }` with `arrayFilters: [{ "el": { $lt: 50 } }]` |

---

## 3. Aggregation Operators

_Used inside `aggregate()` pipelines._

---

### Pipeline Stages

| Stage          | Definition                                                                                                         | Example                                                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `$match`       | Filters documents — equivalent to a `find()` query. Always place early in the pipeline for performance.            | `{ $match: { status: "active" } }`                                                                                                       |
| `$group`       | Groups documents by a key and computes accumulations (sum, avg, count, etc.).                                      | `{ $group: { _id: "$category", total: { $sum: "$price" } } }`                                                                            |
| `$project`     | Reshapes documents — include, exclude, rename, or compute new fields.                                              | `{ $project: { name: 1, fullName: { $concat: ["$first", " ", "$last"] } } }`                                                             |
| `$sort`        | Sorts documents by one or more fields. `1` = ascending, `-1` = descending.                                         | `{ $sort: { createdAt: -1 } }`                                                                                                           |
| `$limit`       | Restricts the number of documents passed to the next stage.                                                        | `{ $limit: 10 }`                                                                                                                         |
| `$skip`        | Skips the first N documents. Used with `$limit` for pagination.                                                    | `{ $skip: 20 }`                                                                                                                          |
| `$unwind`      | Deconstructs an array field — outputs one document per array element.                                              | `{ $unwind: "$tags" }`                                                                                                                   |
| `$lookup`      | Performs a left outer join to another collection in the same database.                                             | `{ $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } }`                                                  |
| `$addFields`   | Adds new fields or overwrites existing ones without removing other fields (cleaner than `$project` for additions). | `{ $addFields: { totalWithTax: { $multiply: ["$price", 1.2] } } }`                                                                       |
| `$set`         | Alias for `$addFields`. Introduced for clarity.                                                                    | `{ $set: { isAdmin: { $eq: ["$role", "admin"] } } }`                                                                                     |
| `$unset`       | Removes specified fields from documents (opposite of `$addFields`).                                                | `{ $unset: ["password", "secret"] }`                                                                                                     |
| `$replaceRoot` | Replaces the root document with a specified embedded document.                                                     | `{ $replaceRoot: { newRoot: "$address" } }`                                                                                              |
| `$count`       | Counts the total number of documents and outputs a single document with the count.                                 | `{ $count: "totalOrders" }`                                                                                                              |
| `$sample`      | Randomly selects N documents from the input. Useful for random recommendations.                                    | `{ $sample: { size: 5 } }`                                                                                                               |
| `$facet`       | Runs multiple sub-pipelines on the same input in a single stage. Great for search results with filters + counts.   | `{ $facet: { byCategory: [...], total: [...] } }`                                                                                        |
| `$bucket`      | Categorizes documents into user-defined ranges (buckets) based on a field.                                         | `{ $bucket: { groupBy: "$price", boundaries: [0, 50, 100, 500] } }`                                                                      |
| `$bucketAuto`  | Like `$bucket` but MongoDB automatically determines bucket boundaries based on distribution.                       | `{ $bucketAuto: { groupBy: "$age", buckets: 4 } }`                                                                                       |
| `$out`         | Writes the result of the pipeline to a **new or existing collection**. Replaces the collection entirely.           | `{ $out: "monthly_reports" }`                                                                                                            |
| `$merge`       | Writes pipeline results into a collection — more flexible than `$out`, can merge/upsert instead of replace.        | `{ $merge: { into: "summaries", on: "_id", whenMatched: "merge" } }`                                                                     |
| `$unionWith`   | Combines the result of the current pipeline with documents from another collection.                                | `{ $unionWith: { coll: "archive_orders" } }`                                                                                             |
| `$graphLookup` | Performs a recursive lookup — useful for hierarchical data like org charts or nested categories.                   | `{ $graphLookup: { from: "categories", startWith: "$parentId", connectFromField: "parentId", connectToField: "_id", as: "ancestors" } }` |

---

### Accumulator Operators

_Used inside `$group`. Some also work in `$project` and `$addFields`._

| Operator        | Definition                                                                                         | Example                                      |
| --------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `$sum`          | Returns the sum of numeric values. In `$group`, sums across the group; use `1` to count documents. | `{ total: { $sum: "$amount" } }`             |
| `$avg`          | Returns the average of numeric values across the group.                                            | `{ avgPrice: { $avg: "$price" } }`           |
| `$first`        | Returns the value of the field from the **first** document in the group (respects `$sort` order).  | `{ firstOrder: { $first: "$orderId" } }`     |
| `$last`         | Returns the value of the field from the **last** document in the group.                            | `{ latestLogin: { $last: "$loginAt" } }`     |
| `$max`          | Returns the maximum value from the group.                                                          | `{ highestScore: { $max: "$score" } }`       |
| `$min`          | Returns the minimum value from the group.                                                          | `{ lowestPrice: { $min: "$price" } }`        |
| `$push`         | Returns an array of all values in the group (including duplicates).                                | `{ allTags: { $push: "$tag" } }`             |
| `$addToSet`     | Returns an array of **unique** values in the group.                                                | `{ uniqueRoles: { $addToSet: "$role" } }`    |
| `$mergeObjects` | Merges multiple documents into one. Useful when grouping embedded documents.                       | `{ merged: { $mergeObjects: "$metadata" } }` |

---

### Expression Operators

_Used inside `$project`, `$addFields`, `$set`, `$match` (with `$expr`), etc._

#### Arithmetic

| Operator    | Definition                                                                                         | Example                                  |
| ----------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `$add`      | Adds numbers or adds a duration (milliseconds) to a date.                                          | `{ $add: ["$price", "$tax"] }`           |
| `$subtract` | Subtracts the second value from the first. Can subtract two dates to get a millisecond difference. | `{ $subtract: ["$total", "$discount"] }` |
| `$multiply` | Multiplies two or more numbers together.                                                           | `{ $multiply: ["$price", "$quantity"] }` |
| `$divide`   | Divides the first number by the second.                                                            | `{ $divide: ["$totalMs", 3600000] }`     |
| `$mod`      | Returns the remainder of dividing the first number by the second.                                  | `{ $mod: ["$value", 2] }`                |
| `$abs`      | Returns the absolute (positive) value of a number.                                                 | `{ $abs: { $subtract: ["$a", "$b"] } }`  |
| `$ceil`     | Rounds a number **up** to the nearest integer.                                                     | `{ $ceil: "$rating" }`                   |
| `$floor`    | Rounds a number **down** to the nearest integer.                                                   | `{ $floor: "$price" }`                   |
| `$round`    | Rounds a number to a specified number of decimal places.                                           | `{ $round: ["$score", 2] }`              |
| `$pow`      | Raises a number to the specified exponent.                                                         | `{ $pow: ["$base", 2] }`                 |
| `$sqrt`     | Returns the square root of a number.                                                               | `{ $sqrt: "$area" }`                     |

---

#### Date Operators

| Operator          | Definition                                                           | Example                                                                   |
| ----------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `$year`           | Extracts the year (e.g., 2024) from a date.                          | `{ $year: "$createdAt" }`                                                 |
| `$month`          | Extracts the month (1–12) from a date.                               | `{ $month: "$createdAt" }`                                                |
| `$dayOfMonth`     | Extracts the day of the month (1–31) from a date.                    | `{ $dayOfMonth: "$createdAt" }`                                           |
| `$hour`           | Extracts the hour (0–23) from a date.                                | `{ $hour: "$createdAt" }`                                                 |
| `$minute`         | Extracts the minute (0–59) from a date.                              | `{ $minute: "$createdAt" }`                                               |
| `$second`         | Extracts the second (0–59) from a date.                              | `{ $second: "$createdAt" }`                                               |
| `$dayOfWeek`      | Extracts the day of the week (1 = Sunday, 7 = Saturday) from a date. | `{ $dayOfWeek: "$createdAt" }`                                            |
| `$dateToString`   | Formats a date as a string using a format specifier.                 | `{ $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }`           |
| `$dateFromString` | Parses a date string into a Date object.                             | `{ $dateFromString: { dateString: "$dateStr" } }`                         |
| `$dateAdd`        | Adds a specified amount of time (in a given unit) to a date.         | `{ $dateAdd: { startDate: "$createdAt", unit: "day", amount: 30 } }`      |
| `$dateSubtract`   | Subtracts a specified amount of time from a date.                    | `{ $dateSubtract: { startDate: "$expiresAt", unit: "hour", amount: 6 } }` |
| `$dateDiff`       | Returns the difference between two dates in a specified unit.        | `{ $dateDiff: { startDate: "$start", endDate: "$end", unit: "day" } }`    |

---

#### String Operators

| Operator      | Definition                                                                                        | Example                                                                |
| ------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `$concat`     | Concatenates two or more strings into one.                                                        | `{ $concat: ["$firstName", " ", "$lastName"] }`                        |
| `$toLower`    | Converts a string to lowercase.                                                                   | `{ $toLower: "$email" }`                                               |
| `$toUpper`    | Converts a string to uppercase.                                                                   | `{ $toUpper: "$countryCode" }`                                         |
| `$trim`       | Removes whitespace (or specified characters) from both ends of a string.                          | `{ $trim: { input: "$name" } }`                                        |
| `$split`      | Splits a string into an array of substrings by a delimiter.                                       | `{ $split: ["$fullAddress", ","] }`                                    |
| `$substrCP`   | Returns a substring using Unicode code point offsets (safer than `$substr` for multi-byte chars). | `{ $substrCP: ["$title", 0, 50] }`                                     |
| `$strLenCP`   | Returns the number of UTF-8 code points (characters) in a string.                                 | `{ $strLenCP: "$description" }`                                        |
| `$regexMatch` | Returns `true` if the string matches the given regex pattern.                                     | `{ $regexMatch: { input: "$email", regex: /@gmail\.com$/ } }`          |
| `$replaceOne` | Replaces the **first** occurrence of a substring with another string.                             | `{ $replaceOne: { input: "$text", find: "foo", replacement: "bar" } }` |
| `$replaceAll` | Replaces **all** occurrences of a substring with another string.                                  | `{ $replaceAll: { input: "$text", find: " ", replacement: "-" } }`     |

---

#### Array Expression Operators

| Operator        | Definition                                                                                           | Example                                                                                 |
| --------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `$arrayElemAt`  | Returns the element at the specified index from an array.                                            | `{ $arrayElemAt: ["$images", 0] }`                                                      |
| `$first`        | Returns the first element of an array.                                                               | `{ $first: "$scores" }`                                                                 |
| `$last`         | Returns the last element of an array.                                                                | `{ $last: "$history" }`                                                                 |
| `$size`         | Returns the number of elements in an array.                                                          | `{ $size: "$tags" }`                                                                    |
| `$slice`        | Returns a subset of an array (from a start index, for N items).                                      | `{ $slice: ["$comments", -5] }`                                                         |
| `$concatArrays` | Merges two or more arrays into one.                                                                  | `{ $concatArrays: ["$admins", "$editors"] }`                                            |
| `$filter`       | Returns only the elements of an array that satisfy a condition.                                      | `{ $filter: { input: "$scores", as: "s", cond: { $gte: ["$$s", 50] } } }`               |
| `$map`          | Applies an expression to each element of an array and returns a new array.                           | `{ $map: { input: "$prices", as: "p", in: { $multiply: ["$$p", 1.1] } } }`              |
| `$reduce`       | Applies an expression to each element of an array and accumulates a single result.                   | `{ $reduce: { input: "$nums", initialValue: 0, in: { $add: ["$$value", "$$this"] } } }` |
| `$in`           | Returns `true` if the specified value is found in an array.                                          | `{ $in: ["admin", "$roles"] }`                                                          |
| `$indexOfArray` | Returns the index of the first occurrence of a value in an array (`-1` if not found).                | `{ $indexOfArray: ["$tags", "featured"] }`                                              |
| `$range`        | Generates an array of numbers from a start (inclusive) to an end (exclusive), with an optional step. | `{ $range: [0, 10, 2] }`                                                                |
| `$reverseArray` | Returns the elements of an array in reverse order.                                                   | `{ $reverseArray: "$steps" }`                                                           |

---

#### Conditional Operators

| Operator  | Definition                                                                                            | Example                                                                                                       |
| --------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `$cond`   | A ternary operator — if condition is true, return the first value, otherwise the second.              | `{ $cond: { if: { $gte: ["$score", 50] }, then: "pass", else: "fail" } }`                                     |
| `$ifNull` | Returns the first expression if it is not null/missing, otherwise returns the fallback.               | `{ $ifNull: ["$nickname", "$username"] }`                                                                     |
| `$switch` | Evaluates a series of cases and returns the value of the first matching `then`. Supports a `default`. | `{ $switch: { branches: [{ case: { $eq: ["$role", "admin"] }, then: "Full Access" }], default: "Limited" } }` |

---

#### Comparison Expression Operators

_Return values (`-1`, `0`, `1` or `true`/`false`) for use inside expressions — not for query filters._

| Operator | Definition                                                                | Example                          |
| -------- | ------------------------------------------------------------------------- | -------------------------------- |
| `$eq`    | Returns `true` if two values are equal.                                   | `{ $eq: ["$status", "active"] }` |
| `$ne`    | Returns `true` if two values are not equal.                               | `{ $ne: ["$role", "guest"] }`    |
| `$gt`    | Returns `true` if the first value is greater than the second.             | `{ $gt: ["$score", 80] }`        |
| `$gte`   | Returns `true` if the first value is greater than or equal to the second. | `{ $gte: ["$age", 18] }`         |
| `$lt`    | Returns `true` if the first value is less than the second.                | `{ $lt: ["$stock", 10] }`        |
| `$lte`   | Returns `true` if the first value is less than or equal to the second.    | `{ $lte: ["$price", 500] }`      |
| `$cmp`   | Compares two values. Returns `-1` (less), `0` (equal), or `1` (greater).  | `{ $cmp: ["$a", "$b"] }`         |

---

#### Type Conversion Operators

| Operator      | Definition                                                                            | Example                                                  |
| ------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `$toString`   | Converts a value to a string.                                                         | `{ $toString: "$userId" }`                               |
| `$toInt`      | Converts a value to a 32-bit integer.                                                 | `{ $toInt: "$quantity" }`                                |
| `$toLong`     | Converts a value to a 64-bit integer.                                                 | `{ $toLong: "$timestamp" }`                              |
| `$toDouble`   | Converts a value to a double (floating-point number).                                 | `{ $toDouble: "$rating" }`                               |
| `$toDecimal`  | Converts a value to a 128-bit decimal (high-precision). Preferred for financial data. | `{ $toDecimal: "$price" }`                               |
| `$toBool`     | Converts a value to a boolean.                                                        | `{ $toBool: "$isActive" }`                               |
| `$toDate`     | Converts a value (string, number, or ObjectId) to a Date.                             | `{ $toDate: "$timestamp" }`                              |
| `$toObjectId` | Converts a string to an ObjectId.                                                     | `{ $toObjectId: "$userIdStr" }`                          |
| `$convert`    | General-purpose type conversion with support for `onError` and `onNull` fallbacks.    | `{ $convert: { input: "$val", to: "int", onError: 0 } }` |
| `$type`       | Returns the BSON type name of the field's value as a string.                          | `{ $type: "$value" }`                                    |

---

#### Object Operators

| Operator         | Definition                                                                                         | Example                                               |
| ---------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `$mergeObjects`  | Merges multiple objects into a single object. Later keys overwrite earlier ones.                   | `{ $mergeObjects: ["$defaults", "$userSettings"] }`   |
| `$objectToArray` | Converts a document (object) into an array of `{ k, v }` pairs. Useful for dynamic keys.           | `{ $objectToArray: "$metadata" }`                     |
| `$arrayToObject` | Converts an array of `{ k, v }` pairs (or two-element arrays) back into an object.                 | `{ $arrayToObject: "$pairs" }`                        |
| `$getField`      | Returns the value of a field — used when the field name is dynamic or contains special characters. | `{ $getField: { field: "my.field", input: "$doc" } }` |

---

#### Variable & Literal Operators

| Operator   | Definition                                                                                                                                                     | Example                                                                                    |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `$literal` | Returns a value exactly as written, preventing MongoDB from treating it as an expression. Useful when you need to project a literal `$` value or a raw object. | `{ $literal: { $gt: 10 } }` → outputs the object, not a comparison                         |
| `$let`     | Defines variables for use within a sub-expression, scoped to that expression only.                                                                             | `{ $let: { vars: { total: { $add: ["$a", "$b"] } }, in: { $multiply: ["$$total", 2] } } }` |

---

## 4. Projection Operators

_Used in the projection argument of `find()` and `findOne()`._

| Operator         | Definition                                                                                                                           | Example                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| `$` (positional) | Projects only the **first** array element that matches the query condition. Requires the array field to be part of the query filter. | `db.col.find({ "scores": { $gt: 80 } }, { "scores.$": 1 })` |
| `$elemMatch`     | Projects only the first array element that satisfies the specified condition (condition can differ from query).                      | `{ scores: { $elemMatch: { $gt: 80 } } }`                   |
| `$slice`         | Limits the number of elements returned in an array field — from the start (`N`), end (`-N`), or a range (`[skip, limit]`).           | `{ comments: { $slice: 5 } }`                               |
| `$meta`          | Projects metadata about the document, most commonly `"textScore"` for full-text search relevance ranking.                            | `{ score: { $meta: "textScore" } }`                         |

---

## 5. Text Search Operators

| Operator / Option                | Definition                                                                                                 | Example                                  |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `$text`                          | Performs a full-text search on fields with a text index. Requires a text index on the collection.          | `{ $text: { $search: "coffee latte" } }` |
| `$search` _(option)_             | The string to search for. Multiple words are treated as `OR` by default; wrap in `"..."` for exact phrase. | `{ $search: "\"exact phrase\"" }`        |
| `$language` _(option)_           | Specifies the language for stemming and stop words (e.g., `"english"`, `"french"`).                        | `{ $language: "english" }`               |
| `$caseSensitive` _(option)_      | Enables case-sensitive matching (`false` by default).                                                      | `{ $caseSensitive: false }`              |
| `$diacriticSensitive` _(option)_ | Enables diacritic-sensitive matching — treats `é` and `e` differently (`false` by default).                | `{ $diacriticSensitive: false }`         |
| `$meta: "textScore"`             | Projects the relevance score of a full-text search result. Used with `$sort` to rank results.              | `{ score: { $meta: "textScore" } }`      |

---

## 6. Geospatial Operators

_Requires a geospatial index (`2dsphere` for GeoJSON, `2d` for legacy coordinates)._

| Operator         | Definition                                                                                              | Example                                                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `$geoWithin`     | Matches documents with coordinates inside a given shape. No index required but benefits from one.       | `{ location: { $geoWithin: { $centerSphere: [[-73.9, 40.7], 10/3963.2] } } }`                                                                 |
| `$geoIntersects` | Matches documents whose geometry intersects with the specified GeoJSON object.                          | `{ area: { $geoIntersects: { $geometry: { type: "Point", coordinates: [-73.9, 40.7] } } } }`                                                  |
| `$near`          | Returns documents sorted by proximity to a point (nearest first). Requires a `2dsphere` index.          | `{ location: { $near: { $geometry: { type: "Point", coordinates: [-73.9, 40.7] }, $maxDistance: 1000 } } }`                                   |
| `$geoNear`       | Aggregation pipeline stage — like `$near` but outputs distance as a field. Must be the **first** stage. | `{ $geoNear: { near: { type: "Point", coordinates: [-73.9, 40.7] }, distanceField: "dist.calculated", maxDistance: 1000, spherical: true } }` |

---

## Quick Cheat Sheet

```
QUERY         → $eq $ne $gt $gte $lt $lte $in $nin
               $and $or $not $nor
               $exists $type $regex $expr
               $all $elemMatch $size
               $text

UPDATE FIELD  → $set $unset $rename $setOnInsert
               $inc $mul $min $max $currentDate

UPDATE ARRAY  → $push $addToSet $pop $pull $pullAll
               $each $slice $sort $position
               $ $[] $[<id>]

AGG STAGES    → $match $group $project $unwind $lookup
               $sort $limit $skip $addFields $set $unset
               $replaceRoot $count $facet $out $merge
               $sample $unionWith $graphLookup $geoNear

ACCUMULATORS  → $sum $avg $first $last $max $min
               $push $addToSet $mergeObjects

EXPRESSIONS   → $add $subtract $multiply $divide $mod
               $concat $toLower $toUpper $split $trim
               $cond $ifNull $switch
               $dateToString $dateAdd $dateSubtract $dateDiff
               $filter $map $size $arrayElemAt
               $toString $toInt $toDate $convert
               $mergeObjects $objectToArray
```
