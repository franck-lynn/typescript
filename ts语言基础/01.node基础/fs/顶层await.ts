// https://typescript.tv/new-features/top-level-await-in-typescript-3-8/
// https://www.stefanjudis.com/today-i-learned/top-level-await-is-available-in-node-js-modules/
// https://github.com/standard-things/esm/issues/580
// TypeScript 3.7 的 5 大特性以及如何使用它们
// https://httptoolkit.tech/blog/5-big-features-of-typescript-3.7/


import { unlink } from "fs/promises"
// promise api
;(async () => {
    try {
        await unlink("./tmp/hello")
        console.log("successfully deleted /tmp/hello")
    } catch (error) {
        console.error("there was an error:", error)
    }
})()
