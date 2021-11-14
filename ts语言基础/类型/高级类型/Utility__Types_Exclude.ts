// ulitity types 实用类型
// https://www.typescriptlang.org/docs/handbook/utility-types.html
// Exclude<Type, ExcludedUnion>
type T0 = Exclude<"a" | "b" | "c", "a">
// 联合类型中排除了 "a" 类型, 取两个集合的补集
// type T0 = "b" | "c"


