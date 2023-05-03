"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.loader = exports.readFilesName = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const node_url_1 = require("node:url");
/**
 * Created by franck.lynn on 2021-12-09.
 * lry_demry@163.com
 * filename:  index
 * 同步或者异步读取路由(两种模式)
 */
// ! 异步读取文件名称
const readFilesName = (dir, ignore = ["index.ts"], list = [], deep = 0) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield promises_1.default.readdir(dir);
    for (let i = 0; i < files.length; i++) {
        const stat = yield promises_1.default.stat(dir + path_1.default.sep + files[i]);
        if (stat.isDirectory()) {
            // ! 这里也是异步, 要用到 await
            yield (0, exports.readFilesName)(dir + path_1.default.sep + files[i], ignore, list, deep + 1);
        }
        else {
            if (!deep && ignore && ignore.length > 0 && ignore.indexOf(files[i]) !== -1)
                continue;
            list.push(dir + path_1.default.sep + files[i]);
        }
    }
    return list;
});
exports.readFilesName = readFilesName;
// ! 异步动态导入模块, 并将这些模块放在一个数组里面
const loader = (dir, pattern = /^.*(?<=\.ts|js)$/, ignore = ["index.ts"], list = [], deep = 0) => __awaiter(void 0, void 0, void 0, function* () {
    // 获取文件名
    const files = yield (0, exports.readFilesName)(dir, ignore, list, deep);
    const resolvers = [];
    for (let i = 0; i < files.length; i++) {
        // 用循环 正则的含义与map正好相反
        if (pattern.test(files[i])) {
            const r = yield Promise.resolve(`${(0, node_url_1.pathToFileURL)(files[i]).href}`).then(s => __importStar(require(s)));
            for (const prop in r) {
                resolvers.push(r[prop]);
            }
        }
    }
    return resolvers;
});
exports.loader = loader;
