function toHex(this: number) {
    return this.toString(16)
}
// toHex() 函数绑定调用者, 传入参数 5, 原来的this参数会被省略
const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5)
console.log(fiveToHex())