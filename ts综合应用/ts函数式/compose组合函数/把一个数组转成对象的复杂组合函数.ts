import {compose, map, split, isEmpty, filter, not, zipObj, head, last, converge} from "ramda"
// 假设获取的是如下形式的数据
const paths = [
    "/example-layout/c1-layout.vue",
    "/example-layout/r1-layout.vue",
    "/flex-example/single-project.vue|弹性盒子实例/单个项目"
]

const arr2Object = compose(
    map(converge(zipObj, [head, last])),
    map(map(filter(compose(not, isEmpty)))),
    map(map(split("/"))),
    map(split("|"))
)
console.log(
    arr2Object(paths)
)
