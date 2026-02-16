let arr = ["mongodb", "react", "html", "css"];
//? indexing --> 0 , last ele: n-1
//? 0 , 3 , length = 4

console.log(arr[2]);
console.log(arr[3]);
console.log(arr[9]); //? undefined
console.log(arr[-9]); //? undefined

//~ if we are accessing any index which is not present then result will be "undefined"

//! mobile phone, headphones

let cart = [
  { brand: "samsung", name: "galaxy", price: 1244000, qty: 2, color: "blue" },
  { brand: "sony", name: "buds-6", price: 1244, qty: 2, color: "black" },
];

console.log(cart[1].name);
console.log(cart[1]["name"]);
