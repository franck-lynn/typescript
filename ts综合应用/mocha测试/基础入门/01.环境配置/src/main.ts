const add = <T extends string|number>(a: T, b: T): T extends string? string: number => <any> a + b

const minus = (a: number, b: number): number => a - b
export {add, minus}