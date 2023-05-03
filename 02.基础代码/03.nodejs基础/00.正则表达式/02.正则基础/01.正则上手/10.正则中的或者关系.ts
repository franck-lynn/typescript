
console.log("01. 以.ts 或者 .js 结尾吗? ---> ", /\.ts|js$/.test("index.ts"))
console.log("02. 以.ts 或者 .js 结尾吗? ---> ",/\.ts|js$/.test("indexts"))
console.log(/\.ts|js$/.test("index.js"))
console.log(/\.ts|js$/.test("indexjs"))
console.log(/\.ts|js$/.test("index.jpg"))
console.log(/\.ts|js$/.test("index.jpg"))
