export const fail = (thing: string) => {
  throw new Error(thing)
}
export const warn = (thing: string) => {
  console.log(["Warning: ", thing].join(" "))
}
export const note = (thing: string) => {
  console.log(["Note: ", thing].join(" "))
}
