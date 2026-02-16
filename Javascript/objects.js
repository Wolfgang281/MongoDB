//? it is a data structure --> in form key-value pair ({})
let user1 = {
  name: "varun", //? key, field, property (single word, camel casing)
  age: 34,
  mobileNo: "8786768786798",
  address: {
    city: "noida",
    state: "up",
    pincode: "201301",
  },
  10: "this is number 10",
  "user-agent": "chrome", //? if using spaces or hyphen use double quotes to enclose the key
};

//! using dot notation --> when the keys are string
//! using square braces --> when the keys are numbers

//! it is not recommended to use duplicate keys in objects

// console.log(user1);
// console.log(user1.age);
// console.log(user1.mobileNo);
// console.log(user1.email);

// console.log(user1.address.pincode);

// console.log(user1[10]);
// console.log(user1["age"]);

// console.log(user1["user-agent"]);

let user2 = {
  name: "string",
  age: 23,
  salary: 123.345,
  isMarried: true,
  skills: ["mongodb", "sql"],
  address: {
    city: "noida",
    state: "up",
  },
  printFullName: function () {
    console.log("hi");
  },
  bonus: undefined,
  comm: null,
  hireDate: new Date(),
};

console.log(user2);

//? in js objects, we can pass every data-type
