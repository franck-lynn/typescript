"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFileToGqlExtensionsIndex = exports.writeFileToTargetIndex = void 0;
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
//! 辅助函数
const export_variables = (file) => {
    // 默认导出 export default 是不允许的
    let exports = [];
    // 这只是对于  export interface/const 并且后面有 = 号有效
    const matchEq = file.match(/(?<=^export\s+(const|interface)\s+)\w+\b/gm);
    if (matchEq) {
        exports = matchEq.map((item) => item.replace(/\{|\}/g, ""));
    }
    // 仅对于 export {C, D} 有效
    const matchBracket = file.match(/(?<=^export\s+\{).+(?=\})/gm);
    if (matchBracket) {
        matchBracket.forEach((item) => {
            exports.push(item);
        });
    }
    const matchConstBracket = file.match(/(?<=^export\s+const\s+\{).+(?=\})/gm);
    if (matchConstBracket) {
        matchConstBracket.forEach((item) => {
            exports.push(item);
        });
    }
    return exports;
};
// 读取文件并处理后写入目标文件
const _exportFiles = (from, to, ignore = "index") => __awaiter(void 0, void 0, void 0, function* () {
    // from 和 to 刚开始时相同的, to 是写入时的目录, 一般是将刚开始时的目录作为
    // 根目录, 递归时 to 目录保持不变.相对目录根据 to 目录获取,
    // 得到的路径 在window 下要改变下 '\'  为 '/'
    const files = yield (0, promises_1.readdir)(from, "utf-8");
    for (let i = 0; i < files.length; i++) {
        const statFile = yield (0, promises_1.stat)(from + path_1.default.sep + files[i]);
        if (statFile.isDirectory()) {
            yield _exportFiles(from + path_1.default.sep + files[i], to, ignore);
            // 最初的路径被改变了, 改成了多了一个下级路径, 所以要再返回上一级
        }
        else {
            // 排除掉 index 文件
            if (path_1.default.basename(files[i]).includes(ignore))
                continue;
            //! 排除掉 .ts或者js 结尾的文件
            if (/^.*(?<!ts|js)$/.test(path_1.default.extname(files[i])))
                continue;
            const file = yield (0, promises_1.readFile)(from + path_1.default.sep + files[i], "utf-8");
            // 采用负向后行断言, 行内后面的要匹配, 得到导出的部分
            const exports = export_variables(file);
            // 得到结果像这样: [ 'getUserByEmail', 'getUserByToken' ]
            let exportsObj = null;
            if (exports) {
                // 把导入的文件名按照相对路径的样子修改下
                // const filepath = (from + path.sep + files[i]).replace(from, ".").replace(/\\/g, "/").replace(".ts", "")
                const fileRelativePath = "./" +
                    path_1.default
                        .relative(to, from + path_1.default.sep + files[i])
                        .replace(/\\/g, "/")
                        .replace(".ts", "");
                // 把每一行的 [] 替换成 {}, 并去掉数组转成字符串前后的空格
                exportsObj = "export { " + exports.toString().trim() + " } from '" + fileRelativePath + "'";
                const indexFile = path_1.default.join(to, "index.ts");
                // 空一行
                yield (0, promises_1.writeFile)(indexFile, "\n", { flag: "a", encoding: "utf-8" });
                yield (0, promises_1.writeFile)(indexFile, exportsObj, { flag: "a", encoding: "utf-8" });
                // 再空一行
                yield (0, promises_1.writeFile)(indexFile, "\n", { flag: "a", encoding: "utf-8" });
            }
        }
    }
});
const writeFileToTargetIndex = (targetAbsoluteDir, ignore = "index") => __awaiter(void 0, void 0, void 0, function* () {
    // targetAbsoluteDir 要绝对路径
    const indexFile = path_1.default.join(targetAbsoluteDir, "index.ts");
    if ((0, fs_1.existsSync)(indexFile)) {
        // 先删除这个文件, 再重新写入
        yield (0, promises_1.unlink)(indexFile);
    }
    yield (0, promises_1.writeFile)(indexFile, "// 由 scripts/gen-exports 生成的导出文件", { flag: "a", encoding: "utf-8" });
    yield _exportFiles(targetAbsoluteDir, targetAbsoluteDir, ignore);
    console.log(`从目录 ${targetAbsoluteDir} 导出模块的 index.ts 文件写入完成 `);
});
exports.writeFileToTargetIndex = writeFileToTargetIndex;
// 专门为自定义指令导出写的导出文件函数
const _importFilesAndExportArray = (from, to, list = [], ignore = "index") => __awaiter(void 0, void 0, void 0, function* () {
    // from 和 to 刚开始时相同的, to 是写入时的目录, 一般是将刚开始时的目录作为
    // 根目录, 递归时 to 目录保持不变.相对目录根据 to 目录获取,
    // 得到的路径 在window 下要改变下 '\'  为 '/'
    const files = yield (0, promises_1.readdir)(from, "utf-8");
    for (let i = 0; i < files.length; i++) {
        const statFile = yield (0, promises_1.stat)(from + path_1.default.sep + files[i]);
        if (statFile.isDirectory()) {
            yield _importFilesAndExportArray(from + path_1.default.sep + files[i], to, list, ignore);
            // 最初的路径被改变了, 改成了多了一个下级路径, 所以要再返回上一级
        }
        else {
            // 排除掉 index 文件
            if (path_1.default.basename(files[i]).includes(ignore))
                continue;
            //! 排除掉 .ts或者js 结尾的文件
            if (/^.*(?<!ts|js)$/.test(path_1.default.extname(files[i])))
                continue;
            const file = yield (0, promises_1.readFile)(from + path_1.default.sep + files[i], "utf-8");
            // 采用负向后行断言, 行内后面的要匹配, 得到导出的部分
            const exports = export_variables(file);
            // 得到结果像这样: [ 'getUserByEmail', 'getUserByToken' ]
            let exportsObj = null;
            if (exports) {
                // 把导入的文件名按照相对路径的样子修改下
                // const filepath = (from + path.sep + files[i]).replace(from, ".").replace(/\\/g, "/").replace(".ts", "")
                const fileRelativePath = "./" +
                    path_1.default
                        .relative(to, from + path_1.default.sep + files[i])
                        .replace(/\\/g, "/")
                        .replace(".ts", "");
                // 把每一行的 [] 替换成 {}, 并去掉数组转成字符串前后的空格
                exportsObj = "import { " + exports.toString().trim() + " } from '" + fileRelativePath + "'";
                const key = path_1.default.basename(files[i], ".ts");
                list.push({ filename: key, import: exportsObj });
                // const indexFile = path.join(to, "index.ts")
                // // 空一行
                // await writeFile(indexFile, "\n", { flag: "a", encoding: "utf-8" })
                // await writeFile(indexFile, exportsObj, { flag: "a", encoding: "utf-8" })
                // // 再空一行
                // await writeFile(indexFile, "\n", { flag: "a", encoding: "utf-8" })
            }
        }
    }
    return list;
});
const writeFileToGqlExtensionsIndex = (targetAbsoluteDir, list = [], ignore = "index") => __awaiter(void 0, void 0, void 0, function* () {
    // targetAbsoluteDir 要绝对路径
    const indexFile = path_1.default.join(targetAbsoluteDir, "index.ts");
    if ((0, fs_1.existsSync)(indexFile)) {
        // 先删除这个文件, 再重新写入
        yield (0, promises_1.unlink)(indexFile);
    }
    const obj = yield _importFilesAndExportArray(targetAbsoluteDir, targetAbsoluteDir, list, ignore);
    const imports = obj.map((item) => item.import);
    yield (0, promises_1.writeFile)(indexFile, "// 由 scripts/gen-exports 生成的导出文件", { flag: "a", encoding: "utf-8" });
    yield (0, promises_1.writeFile)(indexFile, "\n", { flag: "a", encoding: "utf-8" });
    for (let i = 0; i < imports.length; i++) {
        yield (0, promises_1.writeFile)(indexFile, "\n", { flag: "a", encoding: "utf-8" });
        yield (0, promises_1.writeFile)(indexFile, imports[i], { flag: "a", encoding: "utf-8" });
        yield (0, promises_1.writeFile)(indexFile, "\n", { flag: "a", encoding: "utf-8" });
    }
    const typeDefs = obj.map((item) => {
        const filename = item.filename;
        return `${filename}Directive('${filename}').${filename}DirectiveTypeDefs`;
    });
    const transformers = obj.map((item) => {
        const filename = item.filename;
        return `${filename}Directive('${filename}').${filename}DirectiveTransformer`;
    });
    yield (0, promises_1.writeFile)(indexFile, "\n", { flag: "a", encoding: "utf-8" });
    const directiveTypeDefs = `export const directiveTypeDefs = [${typeDefs.join(", ")}]`;
    yield (0, promises_1.writeFile)(indexFile, directiveTypeDefs, { flag: "a", encoding: "utf-8" });
    yield (0, promises_1.writeFile)(indexFile, "\n", { flag: "a", encoding: "utf-8" });
    const directiveTransformers = `export const directiveTransformers = [${transformers.join(", ")}]`;
    yield (0, promises_1.writeFile)(indexFile, directiveTransformers, { flag: "a", encoding: "utf-8" });
    console.log(`从目录 ${targetAbsoluteDir} 导出模块的 index.ts 文件写入完成 `);
});
exports.writeFileToGqlExtensionsIndex = writeFileToGqlExtensionsIndex;
