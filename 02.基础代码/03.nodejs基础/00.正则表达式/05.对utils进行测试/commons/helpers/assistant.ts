import { splitEvery } from "ramda"
// 求商运算, 输入一个 数组
export const quitient = <T>(arr: T[], n = 2) => {
    const N = Math.ceil(arr.length / n)
    return N < 2 ? 1 : N
}

// 对links 进行分割
// 把 links 安装指定长度进行分割
export const splitByNumber = (pp: [string, string?, string?][]) => {
    // 这部相当于已经把数组 [["en1", "cn1", "icon1"], ["en2", "cn2", "icon2"], ["en2", "cn2", "icon3"]] 分割成了
    //  [ [ ["en1", "cn1", "icon1"], ["en2", "cn2", "icon2"] ], [["en2", "cn2", "icon3"]]] 不同的分组
    const N = quitient(pp)
    return splitEvery(N, pp)
}
