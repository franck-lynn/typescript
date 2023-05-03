export const isOnlyBetween = (str: string, patten: string = "\/"): boolean => {
    // 正则 /^(?!.*条件+)[^条件]*条件[^条件]*$/
    // 解读: 以空格开头, 后面不是 点开头的条件一个或多个.
    //       后面不是这个条件(除掉了开头部分)
    //       中间有一个这个条件,
    // 后面不能是这个条件结尾
    // /^(?!\.*\/+)[^/]*\/[^/]*$/
    // /^(?!\.*\/+)[^/]*\/[^/]*$/
    // 加上了 \\.  表示 . 开头也不行, 只能是在中间满足条件
    const regExp = new RegExp("^(?!\\.*" + patten + "|\\.+)[^" + patten + "]*" + patten + "[^" + patten + "]*$")
    // console.log(regExp)
    return regExp.test(str)
}
