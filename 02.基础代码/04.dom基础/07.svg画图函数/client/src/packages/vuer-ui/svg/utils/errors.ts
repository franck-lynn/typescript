/**
 *
 * @param thing 错误处理
 */
export function fail(thing: string) {
  throw new Error(thing)
}
/**
 *
 * @param thing 警告处理
 */
export function warn(thing: string) {
  console.log(["Warning: ", thing].join(" "))
}
/**
 *
 * @param thing 注意处理
 */
export function note(thing: string) {
  console.log(["Note: ", thing].join(" "))
}
