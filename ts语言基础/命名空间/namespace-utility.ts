// 特别重申: 不要对模块使用命名空间，使用命名空间是为了提供逻辑分组和避免命名冲突。
// 模块本身已经是一个逻辑分组，并且它的名字是由导入这个模块的代码指定，所以没有必要为
// 导出的对象增加额外的模块层。
// https://blog.csdn.net/yzzane/article/details/79075126
// Utility 公共的
namespace Utility {
    // 命名空间不允许导出声明, 如: export {log, err}
    export function log(msg: string) {
        console.log(msg);
    }
    export function error(msg: string) {
        console.log(msg);
    }
}

Utility.log("call me")
Utility.error('maybe')