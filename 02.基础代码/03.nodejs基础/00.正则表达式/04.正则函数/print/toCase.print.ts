import { toCamelCase, toTitleCase, toPascalCase, toKababCase, toSnakeCase } from "../src/toCase"

// console.log(toCamelCase("aAA_bbb-ccc"))
// console.log(toCamelCase("aAA_BBB-ccc.ddd.Eee.fFF"))
// console.log(
//     "aAA_BBB-ccc.ddd.Eee.fFF".match(/[-_.](\w)/g)
// )


// console.log(toTitleCase('aAA_bbb-ccc'))

// console.log(toPascalCase("aAA_BBB-ccc.ddd.Eee.fFF"))

// console.log(
//     "AaaBBB".match(/\B([A-Z])/)
// )

console.log(
    toKababCase('AaaBbb')
)
console.log(
    toSnakeCase('AaaBbb')
)
