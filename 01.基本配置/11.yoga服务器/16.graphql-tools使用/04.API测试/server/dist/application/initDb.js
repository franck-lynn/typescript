"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDb = void 0;
const contstants_1 = require("../contstants");
// mongoose 连接封装
const mongoose_1 = __importDefault(require("mongoose"));
const initDb = () => {
    // 建立连接
    if (!contstants_1.MONGODB_URI) {
        console.error.bind(console, "mongodb 无连接地址, mongodb no url connected");
        throw new Error("mongodb 无连接地址, mongodb no url connected");
    }
    mongoose_1.default.connect(contstants_1.MONGODB_URI);
    // 判断连接状态
    const db = mongoose_1.default.connection;
    db.on("error", console.error.bind(console, "mongodb 连接异常, mongodb connect exception"));
    db.once("open", () => console.log("mongodb 连接成功, mongodb connected success."));
};
exports.initDb = initDb;
