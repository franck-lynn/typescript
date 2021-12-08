// https://www.edutechional.com/2018/08/18/typescript-tutorial-practical-way-to-work-with-promises/
// https://www.cnblogs.com/wchrt/p/7257072.html
// ts promise
const performUpload = (imgStatus: string): Promise<{imgStatus: string}> => {
    //! 1. 立即执行,  所以, performUpload('uploading...') 会首先打印出来
    return new Promise((resolve) => {
        console.log(`状态: ${imgStatus}`)
        //! 2. 一段时间后才发生的结果
        //! 3. then() 后, 部署在 promise 内的函数 resolve 就会启动, 
        //!    改变状态, 
        setTimeout(() => {
            //!  4. then() 里的回调函数返回值会作为参数给 resolve()
            //!  5. resolve() 会返回改变的状态和 回调中的值 给外界
           resolve({imgStatus}) 
        }, 1000);
    })
}
let upload 
let compress 
let transfer 

performUpload('uploading...').then((res) => {
    // 这里的 res 是 resolve() 函数里的返回值, 即: {imgStatus: 'loading...等'}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    upload= res
    return performUpload('compressing...')
}).then((res) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    compress= res
    return performUpload('transfering...')
}).then((res) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transfer= res
    return performUpload('image uploaded completed...')
})
