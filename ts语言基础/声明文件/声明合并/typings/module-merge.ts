// https://www.cnblogs.com/ys-ys/p/5256208.html

// 模块合并
module Animals {
    let haveMuscles = true; // 非导出成员只在原始(未合并)模块可见
    // 这意味着，在合并之后，来自其他声明的合并后成员不能访问到非导出成员
    export class Zebra { }
}

module Animals {
    export interface Legged { numberOfLegs: number; }
    export class Dog { }
}
// 相当于 
// module Animals {
//     export interface Legged { numberOfLegs: number; }

//     export class Zebra { }
//     export class Dog { }
// }
