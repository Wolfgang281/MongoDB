import fs from "node:fs";

console.log(0);

process.nextTick(() => {
  console.log(1);
});

Promise.resolve().then(() => {
  console.log(2);
});

setTimeout(() => {
  console.log(3);
});

fs.readFile("./demo.js", (err, data) => {
  console.log(4);
}); //? pending callbacks

setImmediate(() => {
  console.log(5);
});

console.log(6);

for (let i = 0; i < 10000000; i++) {}

// https://github.com/utk-281/node_0900

// inside .txt file
