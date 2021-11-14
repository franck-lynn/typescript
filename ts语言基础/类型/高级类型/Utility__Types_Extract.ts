// 与 Exclude 取补集不同, 这个取交集
type T0 = Extract<"a" | "b" | "c", "a" | "f">
// 与  type T0 = 'a' 相同