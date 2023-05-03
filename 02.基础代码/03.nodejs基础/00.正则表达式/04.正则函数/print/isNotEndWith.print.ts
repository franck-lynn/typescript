
import { isNotEndWith } from "../isNotEndWith"

console.log(isNotEndWith("index.ts", ".js|ts"))
console.log(isNotEndWith("index.jpg", ".js|ts"))
console.log(isNotEndWith("index.jpg", ".js", ".ts"))
console.log(isNotEndWith("index.js", ".js", ".ts"))


// mocha --require ts-node/register isNotEndWith.print.ts   