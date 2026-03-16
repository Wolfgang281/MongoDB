// db.collection_name.aggregate([{$match/ stage-1}, {stage-2}, {$match}...]);
//! in every stage only one aggregation op is used
//? ip of stage1 -> collection_name
//? ip of stage2 -> op of stage-1

//! $match -> it is used to filter the docs
db.collection_name.aggregate([
  {
    $match: {
      // filter part
    },
  },
]);

//! display the details of emp whose age is greater than 30
db.emp.aggregate([
  {
    $match: {
      age: { $gt: 30 },
    },
  }, //? stage-1
]);

//! display the age and name of emp whose age is greater than 30
db.emp.aggregate([
  {
    $match: {
      age: { $gt: 30 },
    },
  }, //? stage-1
  {
    $project: {
      username: "$empName", //? aliasing
      age: 1,
      _id: 0,
      isAged: { $gt: ["$age", 50] },
    },
  }, //? stage-2
]);

//! show only names job and salary of all the employees
//! find salesman with comm > 500 and display hireDate only.
//! find all remote emp names as "usernames"

db.emp.aggregate([
  {
    $project: {
      comm: 1,
      _id: 0,
      hireDate: 1,
    },
  },
]);

db.emp.aggregate([
  {
    $group: {
      _id: "$value",
      // acc op
      variableName: { $sum: "$value" }, // total / sum --> $sum
      variableName1: { $sum: 1 }, // count --> $sum
      variableName2: { $max: "$value" }, // max -> $max
      variableName3: { $min: "$value" }, // min -> $min
      variableName4: { $avg: "$value" }, // avg -> $avg
    },
  },
]);

// count emp by contractType
// find avg totalHrsWorked by job role
// find max and min salary in each dept

// count the total emp in each dept
db.emp.aggregate([
  {
    $group: {
      _id: "$deptNo",
      empCount: { $sum: 1 },
      maxSal: { $max: "$sal" },
      minSal: { $min: "$sal" },
    },
  },
  {
    $project: {
      deptNo: "$_id",
      _id: 0,
      empCount: 1,
      maxSal: 1,
      minSal: 1,
    },
  },
]);

//? find the count of all emp along with total expenditure of money (sum of salary)
db.emp.aggregate([
  {
    $group: {
      _id: null,
      count: { $sum: 1 },
      totalEXP: { $sum: "$salary" },
    },
  },
]);

// find total sal expense in each dept
db.emp.aggregate([
  {
    $group: {
      _id: "$deptNo",
      totalSal: { $sum: "$salary" },
    },
  },
  {
    $project: {
      deptNo: "$_id",
      _id: 0,
      totalSal: 1,
    },
  },
]);

//! arithmetic agg op
// $add : [n1, n2, n3, ......]
// $multiply: [n1, n2] (n1 * n2)
// $divide: [n1,  n2] (n1/n2)
// $subtract: [n1, n2] (n1- n2)
// $mod:[n1,  n2] (n1%n2)

//? $addFields: - it is used to add a field in a document while fetching

db.emp.aggregate([
  {
    $addFields: {
      fieldName: value,
    },
  },
]);
//! get the emp names along with annual salary
db.emp.aggregate([
  {
    $addFields: {
      anSal: { $multiply: [12, "$salary"] },
    },
  },
  {
    $project: {
      empName: 1,
      anSal: 1,
      sal: 1,
      _id: 0,
    },
  },
]);

//! add field "isHighPerformer" to true if performance rating is greater than 4.5
db.emp.aggregate([
  {
    $match: {
      "performance.rating": { $gt: 4.5 },
    },
  },
  {
    $addFields: {
      isHighPerformer: true,
    },
  },
  {
    $project: {
      "performance.rating": 1,
      isHighPerformer: 1,
      _id: 0,
    },
  },
]);

///? $unwind -> it is used to remove to the array (used to flatten the array)
db.collection_name.aggregate([
  {
    $unwind: "$fieldName",
  },
]);

//! show the count of emp in each skills. in descending order
db.emp.aggregate([
  {
    $unwind: "$skills",
  },
  {
    $group: {
      _id: "$skills",
      count: { $sum: 1 },
    },
  },
  {
    $sort: {
      _id: 1,
    },
  },
]);

db.collection_name.aggregate([
  {
    $sort: { fieldName: 1 / -1 },
  },
]);

db.collection_name.aggregate([
  {
    $skip: number,
  },
]);

db.collection_name.aggregate([
  {
    $limit: number,
  },
]);

//! $sort, $skip, $limit

//! show the count second highest  skills
db.emp.aggregate([
  { $unwind: "$skills" },
  {
    $group: {
      _id: "$skills",
      count: { $sum: 1 },
    },
  },
  {
    $sort: { count: -1 },
  },
  { $skip: 1 },
  { $limit: 1 },
]);

//! show all the names and age of emp who are clerk
db.emp.aggregate([
  {
    $project: {
      empName: 1,
      age: 1,
      _id: 0,
      job: 1,
    },
  },
  { $match: { job: "clerk" } },
]);

//! show the maximumSalary in each dept along with emp names
//? (use (array op))
db.emp.aggregate([
  {
    $group: {
      _id: "$deptNo",
      maxSal: { $max: "$sal" },
      employeeNames: { $push: "$empName" },
    },
  }, //s1
]);

//! show the maximumSalary in each dept along with emp names and their jobs
//? (use (array op))
db.emp.aggregate([
  {
    $group: {
      _id: "$deptNo",
      maxSal: { $max: "$sal" },
      employeeNames: { $push: "$empName" },
      employeeJobs: { $addToSet: "$job" },
    },
  }, //s1
]);

//! show the emp names (in ascending order) and annualSalary of employees who have either letter "a" or "n" in their name, grouped by job, with annual salary greater than 22000
// addFields, group, sort, match, project

// match (a or n) -<  addF  -<  match (annualSal) -< group -< project

db.emp.aggregate([
  {
    $match: {
      empName: { $regex: /[an]/ },
    },
  },
  {
    $addFields: {
      annualSalary: { $multiply: ["$sal", 12] },
    },
  },
  {
    $match: {
      annualSalary: { $gt: 22000 },
    },
  },
  {
    $group: {
      _id: "$job",
      empName: { $push: "$empName" },
      anSal: { $push: "$annualSalary" },
    },
  },
]);
