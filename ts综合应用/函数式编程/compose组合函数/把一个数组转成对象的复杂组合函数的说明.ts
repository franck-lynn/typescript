import {compose, map, split, isEmpty, filter, tap, not, zipObj, head, last, converge} from "ramda"
// 假设获取的是如下形式的数据
const paths = [
    "/example-layout/c1-layout.vue",
    "/example-layout/r1-layout.vue",
    "/flex-example/single-project.vue|弹性盒子实例/单个项目"
]

const arr2Object = compose(
    // 把数组组合成对象
    tap(console.log),
    map((converge(zipObj, [head, last]))),
    // tap(console.log),
    // 三维数组实际上有3层, filter 相当于 map, 
    // 也是处理数组的
    map(map(filter(compose(not, isEmpty)))), 
    // tap(console.log),
    // 2维数组处理要2个map, 对二维数组最里层进行分割, 
    // 又得到一个数组, 这样就有3维数组
    map(map(split('/'))), 
    // tap(console.log),
    map(split("|")) // 进来是一个一维数组, 出去的是二维数组
)

arr2Object(paths)
/*
[
  {
    'example-layout': 'example-layout',
    'c1-layout.vue': 'c1-layout.vue'
  },
  {
    'example-layout': 'example-layout',
    'r1-layout.vue': 'r1-layout.vue'
  },
  { 'flex-example': '弹性盒子实例', 'single-project.vue': '单个项目' }
]
*/