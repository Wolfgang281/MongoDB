// [".net", "django", "ai/ml", "rest_api", "django"]
//! in mongodb, on arrays we can d the following things
//? update the first matched occurrence -> "$"
// [".net", "replaced", "ai/ml", "rest_api", "django"]
//? update the complete array -> $[]
//? update only the matched occurrence -> "$[variableName]"
// [".net", "replaced", "ai/ml", "rest_api", "replaced"]

//! 1) Q1. A developer just got React certified. Update the first skill named "React" for the employee named "Arjun Mehta" — set certified: true.

db.workHistory.findOne({
  name: "Arjun Mehta",
  skills: { $elemMatch: { name: "React" } },
});

db.workHistory.updateOne(
  {
    name: "Arjun Mehta",
    skills: { $elemMatch: { name: "React" } },
  },
  { $set: { "skills.$.certified": true } },
);
//! "skills.$" this is denoting the matched element
//? $, $[], $[e]

//! 2)

db.workHistory.findOne({
  name: "Sneha Patel",
  projects: { $elemMatch: { name: "PaymentGateway" } },
});

db.workHistory.updateOne(
  {
    name: "Sneha Patel",
    projects: { $elemMatch: { name: "PaymentGateway" } },
  },
  { $set: { "projects.$.bugs": 0 } },
);

db.workHistory.find({ department: "Engineering" });

db.workHistory.updateMany(
  {
    department: "Engineering",
    reviews: { $elemMatch: { bonus: 0 } },
  },
  {
    $set: {
      "reviews.$[].bonus": 30,
    },
  },
);

//! The "BillingSystem" project is critical and has too many bugs. For any employee working on it, flag all projects with bugs >= 5 as needsReview: true.

db.workHistory.find({ projects: { $elemMatch: { name: "BillingSystem" } } });

db.workHistory.updateMany(
  { projects: { $elemMatch: { name: "BillingSystem" } } },
  { $set: { "projects.$[ele].needsReview": true } },
  {
    arrayFilters: [{ "ele.bugs": { $gte: 5 } }],
  },
);

tableName.create({ name: "", age: "" });

//! "Ravi Kumar" just fixed all bugs in one of his active projects. Set bugs: 0 for the first project where status: "active" in his document.
// $

db.workHistory.findOne({
  name: "Ravi Kumar",
  projects: { $elemMatch: { status: "active" } },
});

db.workHistory.updateOne(
  {
    name: "Ravi Kumar",
    projects: { $elemMatch: { status: "active" } },
  },
  {
    $set: { "projects.$.bugs": 0 },
  },
);

db.workHistory.updateOne(
  {
    name: "Ravi Kumar",
    projects: { $elemMatch: { bugs: 0 } },
  },
  {
    $set: { "projects.$[e].remote": true },
  },
  {
    arrayFilters: [{ "e.bugs": 0 }],
  },
);

//! For all employees in the "AI" or "Data" departments, set deprecated: true on all skills where yearsUsed < 1 AND certified: false.

db.workHistory.find({ department: { $in: ["AI", "Data"] } }).count();

db.workHistory.updateMany(
  {
    department: { $in: ["AI", "Data"] },
  },
  {
    $set: { "skills.$[e].deprecated": true },
  },
  {
    arrayFilters: [
      {
        "e.yearsUsed": { $lt: 1 }, // 1
        "e.certified": false,
      }, //2
    ],
  },
);
