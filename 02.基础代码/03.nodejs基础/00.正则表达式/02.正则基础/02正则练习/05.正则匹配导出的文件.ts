// 一般导出分几种情况
const r1 = "export const A = {}"
const r2 = "export interface B = {}"
const r3 = "export {C, D}"
const r4 = "export default F"
const r5 = "eport const {G, H} = {}"
const r = `
export const A = {}
export interface B = {}
export {C, D}
export default F
export const getConsinees = async(ctx: Router.RouterContext, next?: Koa.Next) => {
    // return await ConsigneeAddress.find()
    const result = await ConsigneeAddress.find()
    console.log("数据库查找出的数据----> ", result)
    ctx.body = await ConsigneeAddress.find()
}
export const { dateDirectiveTypeDefs, dateDirectiveTransformer } = dateDirective('date')
`
const export_variables = (file: string) => {
    // 默认导出 export default 是不允许的
    let exports: string[] = []
    // 这只是对于  export interface/const 并且后面有 = 号有效
    const matchEq = file.match(/(?<=^export\s+(const|interface)\s+)\w+\b/gm)
    if(matchEq){
        exports =  matchEq.map(item => item.replace(/\{|\}/g, ''))
    }
    // 仅对于 export {C, D} 有效
    const matchBracket = file.match(/(?<=^export\s+\{).+(?=\})/gm)
    if(matchBracket){
        matchBracket.forEach(item => {
            exports.push(item)
        })
    }
    const matchConstBracket = file.match(/(?<=^export\s+const\s+\{).+(?=\})/gm)
 
    if(matchConstBracket) {
        matchConstBracket.forEach(item => {
            exports.push(item)
        })
    }
    return exports
}
console.log(
    export_variables(r)
)





// console.log(
//     r5.match(/(?<=^export\s+const\s+).+/)
// )
// // 如果用正则进行匹配
// r.match(/(?<=^export\s+(const|interface|default|\{)\s*).+\b/gm)
// console.log(
//     // 这只是对于  export interface/const 并且后面有 = 号有效
//     r.match(/(?<=^export\s+(const|interface|\{)\s*).+(?=\=)/gm)
// )
// console.log(
//     // 仅对于 export {C, D} 有效
//     r.match(/(?<=^export\s+\{).+(?=\})/gm)
// )
// console.log(
//     // 仅对于 export default F 有效 export default F
//     r.match(/(?<=^export\s+default\s+)\w+\b/gm)
// )