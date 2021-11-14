// 结构：
// new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>

const main = new Promise<string>((resolve) => {
    setTimeout(() => {
        resolve("hello")
    }, 1000)
})
main.then((v) => console.log(v))


// main.then(v => {
//     console.log(v)
//     return new Promise((resolve => {
//         setTimeout(() => {
//             resolve('world')
//         }, 1000);
//     })).then(v => console.log(v))
// })

export {}
