declare function globalLib(options: globalLib.Options)
// 命名空间
declare namespace globalLib {
    const version: String
    function doSomething(): void
    // 全局化的接口, 放在命名空间
    interface Options {
        [key: string]: any
    }
}