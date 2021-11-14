// https://www.typescriptlang.org/docs/handbook/2/generics.html
// Partial<Type>

// Required<Type>

// Readonly<Type>
// Record<Keys,Type>
// Pick<Type, Keys>
// Omit<Type, Keys>
// Exclude<Type, ExcludedUnion>
// Extract<Type, Union>
// NonNullable<Type>
// Parameters<Type>
// ConstructorParameters<Type>
// ReturnType<Type>
// InstanceType<Type>
// ThisParameterType<Type>
function toHex1(this: number) {
    return this.toString(16)
}
function numberToString(n: ThisParameterType<typeof toHex1>) {
    return toHex1.apply(n)
}
console.log(numberToString(12))
// OmitThisParameter<Type>
function toHex2(this: number) {
    return this.toString(16)
}
const fiveToHex: OmitThisParameter<typeof toHex2> = toHex2.bind(11)
console.log(fiveToHex())

// ThisType<Type>
type ObjectDescriptor<D, M> = {
    data?: D
    methods?: M & ThisType<D & M>
}
const makeObject = <D, M>(desc: ObjectDescriptor<D, M>): D & M => {
    const data: D = desc.data || ({} as D)
    const methods: M = desc.methods || ({} as M)
    return { ...data, ...methods } as D & M
}
const obj = makeObject({
    data: { x: 0, y: 0 },
    methods: {
        moveBy(dx: number, dy: number) {
            this.x += dx // Strongly typed this
            this.y += dy // Strongly typed this
            return this.x + "..." + this.y
        },
    },
})
obj.x = 10
obj.y = 20
console.log(obj.moveBy(5, 5))

// 内在字符串操作类型
// Uppercase<StringType>
// Lowercase<StringType>
// Capitalize<StringType>
// Uncapitalize<StringType>
type Greeting = "hello World"
type ShoutyGreeting = Uppercase<Greeting>
const sg: ShoutyGreeting = "HELLO WORLD"
console.log(sg)
