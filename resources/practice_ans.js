//! find all emp names who are working in dept 10 as manager or clerk.
db.emp.aggregate([
  {
    $match: {
      $and: [
        { deptNo: 10 }, // c1
        { job: { $in: ["clerk", "manager"] } }, // c2
      ],
    },
  },
  {
    $project: { empName: 1, _id: 0, deptNo: 1, job: 1 },
  },
]);

//! Find all employees working on both "project_alpha" and "research_initiative" -> $all (fN: {$all: []})
db.emp.find(
  { projects: { $all: ["project_alpha", "research_initiative"] } },
  { projects: 1, _id: 0 },
);

//!  show the count of emp working on "project_alpha"
db.emp
  .find({ projects: { $all: ["project_alpha"] } }, { projects: 1, _id: 0 })
  .count();

//   aggregation -> unwind : projects, group: projects count

//! Find departments NOT located in "boston" or "chicago" -> $nin
db.dept.find({ loc: { $nin: ["boston", "chicago"] } });

//! Find all employees whose name contains "ar" (case insensitive)
//  /pattern/i => "i" ignore case sensitivity
db.emp.find({ empName: { $regex: /ar/i } }, { empName: 1 });

//! Find departments whose location starts with "new" (case insensitive)
db.dept.find({ loc: { $regex: /^new/i } }, { loc: 1 });

//! Find employees where sal+deptNo is greater than 3000
db.emp.find(
  {
    $expr: {
      $gt: [{ $add: ["$sal", "$deptNo"] }, 3000],
    },
  },
  { sal: 1, deptNo: 1, _id: 0 },
);

// $expr: {
//   $lte: [v1, v2]; v1 <= v2
// }

//! Find employees where comm is greater than bonus (use $expr)
//! Find departments where budget is greater than 150000 (use $expr)

//! Find employees with exactly 2 skills AND salary greater than 2000
db.emp.find(
  { $and: [{ skills: { $size: 5 } }, { sal: { $gt: 3000 } }] },
  { skills: 1, sal: 1, _id: 0 },
);
db.emp.find(
  { skills: { $size: 5 }, sal: { $gt: 3000 } },
  { skills: 1, sal: 1, _id: 0 },
);

//! Find departments with more than 2 facilities AND budget greater than 150000
db.dept.find(
  {
    $expr: { $gt: [{ $size: "$facilities" }, 4] },
    budget: { $gt: 150000 },
  },
  {
    facilities: 1,
    budget: 1,
    _id: 0,
  },
);

//! Find employees whose name starts with "s" OR ends with "d" (case insensitive)
// db.emp.find({ empName: { $regex: /^s/i }, empName: { $regex: /d$/i } });
db.emp.find(
  { empName: { $regex: /^s|d$/, $options: "i" } }, //? first or lst
  { empName: 1, _id: 0 },
);

db.emp.find(
  { empName: { $regex: /sd/, $options: "i" } }, // sd should pe present anywhere
  { empName: 1, _id: 0 },
);

db.emp.find(
  { empName: { $regex: /[sd]/, $options: "i" } }, // s or d should pe present anywhere
  { empName: 1, _id: 0 },
);

db.emp.find(
  { empName: { $regex: /^s.*d$/, $options: "i" } }, // name must contain first letter as s and last as d
  { empName: 1, _id: 0 },
);

//! Find employees working in dept 20 or 30 AND have "sql" skill
db.emp.find(
  { skills: "sql", deptNo: { $in: [20, 30] } },
  {
    skills: 1,
    deptNo: 1,
    _id: 0,
  },
);
db.emp.find(
  {
    $and: [
      { skills: { $all: ["sql"] } }, // c1
      { deptNo: { $in: [20, 30] } }, // c2
    ],
  },
  {
    skills: 1,
    deptNo: 1,
    _id: 0,
  },
);

//! Find all managers or analysts with performance rating above 4.5
db.emp.find(
  {
    "performance.rating": { $gt: 4.5 },
    job: { $in: ["manager", "analyst"] },
  },
  {
    "performance.rating": 1,
    job: 1,
    _id: 0,
  },
);

db.emp.updateOne({ filter }, { $push: { fieldName: "value" } });
db.emp.updateOne({ filter }, { $set: { fieldName: "value" } });
//!  Add a new facility "gym" to the facilities array of department 20 (update -> $set, $addToSet )
db.dept.find({ deptNo: 20 });
db.dept.updateOne({ dept: 20 }, { $push: { facilities: "gym" } });

//! Update the location of "accounting" department to "manhattan"
//? :-) $set
db.dept.updateOne({ dName: "accounting" }, { $set: { loc: "manhattan" } });

//! $ -> to update the first matched occurrence, $[], $[el]
db.workHistory.findOne({ _id: 1, skills: { $elemMatch: { name: "React" } } });
db.workHistory.updateOne(
  { _id: 1, skills: { $elemMatch: { name: "React" } } },
  { $set: { "skills.$.certified": "true" } },
);

//! The "PaymentGateway" project has been cleared of all bugs. For the employee "Sneha Patel", find the first project named "PaymentGateway" and set bugs: 0.

db.workHistory.find({
  name: "Sneha Patel",
  projects: { $elemMatch: { name: "PaymentGateway" } },
});

db.workHistory.updateOne(
  {
    name: "Sneha Patel",
    projects: { $elemMatch: { name: "PaymentGateway" } },
  },
  {
    $set: { "projects.$.bugs": "cleared" },
  },
);

//! For "Priya Sharma", mark the first skill with level: "expert" as certified: true.
db.workHistory.findOne({ name: "Priya Sharma" });

db.workHistory.updateOne(
  {
    name: "Priya Sharma",
    skills: { $elemMatch: { level: "expert" } },
  },
  {
    $set: { "skills.$.certified": "true" },
  },
);

//? $[] -> updates the complete array
// A compliance rule says all skills listed under "Meera Iyer" must have a field securityCleared: true. Add this field to every skill in her document.

db.workHistory.findOne({ name: "Meera Iyer" });

db.workHistory.updateOne(
  { name: "Meera Iyer" },
  { $addToSet: { skills: { name: "docker", certified: true, yearsUsed: 2 } } },
);
db.workHistory.updateOne(
  { name: "Meera Iyer" },
  {
    $set: {
      "skills.$[].securityCleared": true,
    },
  },
);

//! For all employees in the "Infrastructure" department, add a field infrastructureTeam: true to every element in their skills array.
db.workHistory.updateMany(
  { department: "Infrastructure" },
  {
    $set: { "skills.$[].infrastructureTeam": true },
  },
);

//! For all employees in the "AI" or "Data" departments, set deprecated: true on all skills where yearsUsed < 1 AND certified: false.
db.workHistory.find(
  { department: { $in: ["AI", "Data"] } },
  { skills: 1, _id: 0 },
);

db.workHistory.updateMany(
  { department: { $in: ["AI", "Data"] } },
  {
    $set: { "skills.$[ele].deprecated": true },
  },
  {
    arrayFilters: [
      {
        "ele.yearsUsed": { $lt: 1 }, //c1
        "ele.certified": false, // c2
      },
    ],
  },
);

//! Write an update that does all three in one operation on the employees collection:

// For all employees in "Engineering" department:
// Set certified: true on skills where level: "expert" ($[expert])
// Set onWatch: true on projects where bugs > 5 ($[buggy])
// Set approved: true on reviews where rating >= 4 ($[good])
// Hint: you can have multiple identifiers in arrayFilters
// arrayFilters: [
//   { "expert.level": "expert" },
//   { "buggy.bugs": { $gt: 5 } },
//   { "good.rating": { $gte: 4 } },
// ];

//! Add skills ["nodejs", "express", "nestjs"] to employee "adams" at position/index 2

db.emp.updateOne(
  { empName: "adams" },
  {
    $push: { skills: { $each: ["nodejs", "express", "nestjs"], $position: 1 } },
  },
);

// Add projects ["refactoring", "documentation"] at position 0 to "clark", keep last 5, sort them
db.emp.updateOne(
  { empName: "clark" },
  {
    $push: {
      projects: {
        $each: ["refactoring", "documentation"], // ele
        $position: 0, // idx
        $sort: 1, // arrange in asc
        $slice: -5, // keep last 5 ele after sorting
      },
    },
  },
);

//! Add facility "printer" to all departments, but only if they don't have it already

db.dept.updateMany({}, { $addToSet: { facilities: "printer" } });

//  Employees with "expert" level skills that are not yet certified should have certificationPending: true added to those specific skill entries. Apply this across all employees.

// level = expert and certified is false -> $[id], ($, $[]) X
db.workHistory.updateMany(
  {},
  { $set: { "skills.$[e].certificationPending": true } },
  {
    arrayFilters: [{ "e.level": "expert", "e.certified": false }],
  },
);

//!  Find all employees working in department 20 or 30
($match, $group, $unwind, $addFields, $addition, $sub, $project);

db.emp.aggregate([
  {
    $project: {
      username: "$empName",
      _id: 0,
      isHigherEarner: { $gt: ["$sal", 2000] },
      sal: 1,
    },
  },
]);

db.emp.aggregate([
  { $match: { empName: { $regex: /a/ } } }, // s1
  {
    $project: {
      username: "$empName",
      _id: 0,
      anSal: { $multiply: ["$sal", 12] },
    },
  }, // s2
  {
    $match: { anSal: { $gt: 28000 } }, // s3
  },
]);

//! show each employee names and their skills count as totalSkills
db.emp.aggregate([
  {
    $project: {
      empName: 1,
      _id: 0,
      totalSkills: { $size: "$skills" },
    },
  },
]);
//TODO: ifNull

//! / count emp by contractType
db.emp.aggregate([
  {
    $group: {
      _id: "$contractType",
      count: { $sum: 1 },
    },
  },
  {
    $project: {
      type: "$_id",
      _id: 0,
      count: 1,
    },
  },
]);

//? find avg totalHrsWorked by job role
db.emp.aggregate([
  {
    $group: {
      _id: "$job",
      averageTotalHrsWorked: { $avg: "$totalHoursWorked" },
    },
  },
  {
    $project: {
      job: "$_id",
      averageTotalHrsWorked: 1,
      _id: 0,
    },
  },
]);

// find max and min salary in each dept
db.emp.aggregate([
  {
    $group: {
      _id: "$deptNo",
      maxSal: { $max: "$sal" },
      minSal: { $min: "$sal" },
      count: { $sum: 1 },
    },
  },
]);

//! find the highest bonus in each job category

//! show the names of each employee for each department along with jobs.
db.emp.aggregate([
  {
    $group: {
      _id: "$deptNo",
      names: { $push: "$empName" },
      jobs: { $addToSet: "$job" },
    },
  },
  {
    $project: {
      dept: "$_id",
      names: 1,
      jobs: 1,
      _id: 0,
    },
  },
]);

//! show emp name and job in each department only if count is greater than 3 per department
db.emp.aggregate([
  {
    $group: {
      _id: "$deptNo",
      names: { $push: "$empName" },
      count: { $sum: 1 },
    },
  },
  {
    $match: {
      count: { $gt: 3 },
    },
  },
]);

//! using $match before $group stage -> this will act on documents
//! using $match after group stage -> this will act on grouped documents

//! show total expenses made by the company per month (calculate sum of salary for all emp)
db.emp.aggregate([
  {
    $group: {
      _id: null,
      //& if we want to group all the documents under one category use null in _id
      count: { $sum: 1 },
      totalExpenses: { $sum: "$sal" },
    },
  },
  {
    $project: {
      totalExpenses: 1,
      _id: 0,
    },
  },
]);

//! display all the emp names and their salary in descending order
db.emp.aggregate([
  {
    $sort: {
      sal: -1,
      empName: 1, //! if two or more emp have same salary, then sorting will be based on emp names. sorting based on empName will only be there if two or more docs will have same salary
    },
  },
  {
    $project: {
      _id: 0,
      empName: 1,
      sal: 1,
    },
  },
]);

//! display the name and salary of highest paid emp
db.emp.aggregate([
  {
    $sort: { sal: -1 },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      sal: 1,
      empName: 1,
      _id: 0,
    },
  },
]);

//! display the name and salary of third highest paid emp
db.emp.aggregate([
  {
    $sort: { sal: -1 },
  },
  // {
  //   $skip: 2,
  // },
  // {
  //   $limit: 1,
  // },
  {
    $project: {
      sal: 1,
      empName: 1,
      _id: 0,
    },
  },
]);

// highest -> king
// second highest -> scott ford
// third highest ->  jones

//! display the name and salary of third highest paid emp -> group (sal)
db.emp.aggregate([
  {
    $group: {
      _id: "$sal",
      count: { $sum: 1 },
      names: { $push: "$empName" },
    },
  },
  { $sort: { _id: -1 } },
  { $skip: 2 },
  { $limit: 1 },
]);

//! display the name and salary of second lowest paid emp -> group (sal)

//! get top 3 department names by budget
db.dept.aggregate([
  {
    $group: {
      _id: "$budget",
      name: { $push: "$dName" },
    },
  },
  { $sort: { _id: -1 } },
  { $limit: 3 },
]);

//! get emp names ranked 4 to 7 by salary
/* 
blake', sal: 2850 },
  { empName: 'clark', sal: 2450 },
  { empName: 'allen', sal: 1600 },
  { empName: 'turner


*/

db.emp.aggregate([
  {
    $group: {
      _id: "$sal",
      name: { $push: "$empName" },
    },
  },
  { $sort: { _id: -1 } },
  { $skip: 3 },
  { $limit: 4 },
]);

//! show first 3 characters of empName
// ==> $substrCP
db.emp.aggregate([
  {
    $project: {
      firstThreeChars: { $substrCP: ["$empName", 0, 3] },
      _id: 0,
    },
  },
]);
//  $substrCP: ["$fieldName", startingIdx, count]

//! show Dname in uppercase
db.dept.aggregate([
  {
    $project: {
      name: { $toUpper: "$dName" },
      _id: 0,
    },
  },
]);

db.emp.aggregate([
  {
    $match: { empName: "WARD" },
  },
  {
    $unwind: "$skills",
  },
  {
    $project: { empName: 1, _id: 0, skills: 1 },
  },
]);

//! count total unique skills in the company
db.emp.aggregate([
  { $unwind: "$skills" },
  {
    $group: {
      _id: "$skills",
    },
  },
  {
    $group: {
      _id: null,
      totalUniqueSkills: { $sum: 1 },
    },
  },
  { $project: { _id: 0 } },
]);

// count how many emp have office equipments
db.emp.aggregate([
  { $unwind: "$officeEquipment" },
  {
    $group: {
      _id: "$officeEquipment",
      count: { $sum: 1 },
      empNames: { $push: "$empName" },
    },
  },
]);

db.books.insertMany([
  {
    _id: "B123",
    name: "the alchemist",
    pages: 200,
    price: 340,
    authorId: "PC1",
    detailsOfAuthor: [{ _id: "PC1", name: "Paulo" }],
  },
  {
    _id: "H234",
    name: "Harry Potter",
    pages: 300,
    price: 700,
    authorId: "JKR",
  },
]);

db.authors.insertMany([
  {
    _id: "PC1",
    name: "Paulo",
  },
  {
    _id: "JKR",
    name: "JK Rowling",
  },
]);

// {name:"b1", authorName:"a1"}

db.books.aggregate([
  {
    $lookup: {
      from: "authors",
      foreignField: "",
      localField: "",
      as: "",
    },
  },
]);

//! display al the details along with the details of the author
db.books.aggregate([
  {
    $lookup: {
      from: "authors",
      foreignField: "_id",
      localField: "authorId",
      as: "authorId", // here we name same as local field
    },
  },
  {
    $unwind: "$authorId",
  },
]);

//! display all the details of the book alchemist along with the details of the author name

db.books.aggregate([
  {
    $match: { name: "the alchemist" },
  },
  {
    $lookup: {
      from: "authors",
      foreignField: "_id",
      localField: "authorId",
      as: "authorId",
    },
  },
]);

//! display all the emp names and their working locations
db.emp.aggregate([
  {
    $lookup: {
      from: "dept",
      foreignField: "dept",
      localField: "deptNo",
      as: "deptNo",
    },
  },
  { $unwind: "$deptNo" },
  { $project: { empName: 1, location: "$deptNo.loc", _id: 0 } },
]);

//! For each employee, show their name, department name and location
db.emp.aggregate([
  {
    $lookup: {
      from: "dept",
      foreignField: "dept",
      localField: "deptNo",
      as: "deptNo",
    },
  },
  { $unwind: "$deptNo" },
  {
    $project: {
      empName: 1,
      location: "$deptNo.loc",
      dName: "$deptNo.dName",
      _id: 0,
      "deptNo.dept": 1,
    },
  },
]);

db.dept.aggregate([
  {
    $lookup: {
      from: "emp",
      foreignField: "deptNo",
      localField: "dept",
      as: "dept",
    },
  },
  {
    $unwind: {
      path: "$dept",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $project: {
      loc: 1,
      dName: 1,
      "dept.empName": 1,
      _id: 0,
      "dept.deptNo": 1,
    },
  },
]);

{
  $unwind: "$fieldname";
}

{
  $unwind: {
    path: "$fieldname";
    preserveNullAndEmptyArrays: boolean;
  }
}

//! to get the annual sal (12*sal + bonus + comm)
db.emp.aggregate([
  {
    $addFields: {
      totalAnSal: {
        $add: [
          { $multiply: ["$sal", 12] },
          { $ifNull: ["$bonus", 0] },
          // "$bonus",
          { $ifNull: ["$comm", 0] },
          // "$comm",
        ],
      },
    },
  },
  {
    $project: { totalAnSal: 1, _id: 0 },
  },
]);

{
  $ifNull: ["$bonus", 0];
}

// {
//   $addFields: {
//     keyname: {
//       $add: [{monthly * 12} ,{ comm} , {bonus}];
//     }
//   }
// }

//! display all the empNames along with their month of joining
db.emp.aggregate([
  {
    $addFields: {
      month: { $month: "$hireDate" },
      year: { $year: "$hireDate" },
      day: { $dayOfMonth: "$hireDate" },
    },
  },
  {
    $project: {
      empName: 1,
      _id: 0,
      month: 1,
      year: 1,
      day: 1,
    },
  },
]);

db.movies.find({ year: { $gt: 2013 } }).explain("executionStats");
