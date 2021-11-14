// ulitity types 实用类型
// https://www.typescriptlang.org/docs/handbook/utility-types.html
// Record<Keys,Type>
interface CatInfo {
    age: number
    breed: string
}
type CatName = "miffy" | "boris" | "mordred" // 联合类型 |

const Cats: Record<CatName, CatInfo> = {
    miffy: {age: 10, breed: "Persian"},
    boris: {age: 5, breed: "Maine Coon"},
    mordred: {age: 16, breed: "British Shorthair"}
}


console.log(Cats)


export {}
