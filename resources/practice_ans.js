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
