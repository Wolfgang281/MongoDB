//! data-modelling -> in this we define two things
// a) how data is stored
// b) what will be the relation between data - embedded and reference
// 1 to 1
// 1 to N
// N to N

//! dynamic -> structure ()

//! collection -> createCollection()

/* 
  {
      name:"string",
      email:"string"
  }

  */

db.createCollection("c2", {
  validator: {
    $jsonSchema: {
      type: "object",
      required: ["name", "hasInsurance"],
      properties: {
        name: {
          type: "string",
        },
        hasInsurance: {
          type: "string",
        },
      },
    },
  },
});

//! example of embedded or nested ->
let user = {
  name: "",
  age: "",
  address: {
    city: "",
    sate: "",
  },

  dname: "accounting",
};

let c1 = {
  email: "",
  phone: "999999999",
};

let dept = {
  name: "accounting",
  loc: "",
  floor: 8,
  head: "new head",
};
