/* eslint-disable @typescript-eslint/no-explicit-any */
import { keys, props, compose, map, pluck, zipObj } from "ramda"

type V = any
type F = (v: V) => any

/**
 * 将函数列表分别作用于值列表, 注意, 是分别作用于
 * 返回列表: [f1(v1), f2(v2), f3(v3), ....]
 * @param fs 函数列表
 * @returns
 */
export const apyPart = (fs: F[]) => {
  if (!fs || fs.length === 0) return
  return (vs: V) => {
    const arr: F[] = []
    for (let i = 0; i < fs.length; i++) {
      arr.push(fs[i]!(vs[i]))
    }
    return arr
  }
}

type Xls = Record<string, any>
type JsonType = Record<string, { text: string; type: string }>
type FunctionsType = Record<string, F>

/**
 *
 * @param xls excel 读取过来的数据
 * @param type 适合网络传输的 json 数据类型,
 * @param fn 根据 type 中定义的类型, 对值进行转化的函数, 格式是一个对象,
 *           key是 type 中定义的 type, value是 函数
 * @returns
 */
type Result = Record<keyof JsonType, any>[]

export const excel2Json = (
  xls: Xls[], //
  type: JsonType,
  fn: FunctionsType
): Result => {
  // 采用函数式编程
  const a = keys(type)
  // const a: (keyof JsonType)[] = keys<JsonType>(type)
  // a = [ 'name', 'phone', 'email' ]
  const b = props(a)(type)
  // const b: JsonType[keyof JsonType][] = props(a)(type)
  // b = [{ text: '姓名', type: 'string' },...]
  // 获取 JsonType 类型中定义的所有 text 值,
  // 也即 excel 表中对应的值
  // const c = pluck("text")(b) //
  const c = pluck("text")(b) // 例如 [ '姓名', '电话', '邮件' ]
  // c =   [ '姓名', '电话', '邮件' ]
  const d = pluck("type")(b) // 例如
  // d = [ 'string', 'string' ]
  // 获取 fn 中的函数并组成列表
  const e = props(d)(fn) // [f1, f2, f3]
  // e = [ [Function: string], [Function: number],... ]
  // const f = map(props(c), xls)
  // const g = map(apyPart(e)!, f)
  // const h = map(zipObj(a), g)

  const composition = compose(
    map(zipObj(a)), //
    map(apyPart(e)!), // apyPart(e) 为空是不能调用的
    map(props(c))
  )
  return composition(xls)
}
