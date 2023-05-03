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
exports.verifyJwt = exports.authenticateEmail = void 0;
// import { compare } from "bcryptjs"
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const locale_1 = require("../../locale");
// https://www.qycn.com/xzx/article/7134.html
// 这是由于 bcryptjs 导出是 commonjs 写的, 不适应 esm,
// 需要这样转一下
const compare = bcryptjs_1.default.compare;
// 以数组假设数据库
const users = [
    { _id: "1", name: "林芮应", email: "lry_demry@163.com", password: "123456" },
    { _id: "2", name: "任盈盈", email: "ryy@163.com", password: "123456" },
    { _id: "3", name: "周芷若", email: "zzr@163.com", password: "123456" },
];
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () { return users.find((item) => item.email === email); });
// 本文件定义的验证函数是给策略构造函数使用的.
//! 当 restful 登录时, 就会调用, 而验证时不会调用这个函数
// 本地策略验证函数, 登录时调用  passport.authenticate 会先进入这个函数
const authenticateEmail = (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield getUserByEmail(email);
        if (!user) {
            return done(null, false, { message: locale_1.ResMsg.NO_EMAIL });
        }
        const isPassed = (user === null || user === void 0 ? void 0 : user.password) ? yield compare(password, user.password) : null;
        // const isPassed = password === user.password
        if (isPassed) {
            return done(null, user);
        }
        else {
            return done(null, false, { message: locale_1.ResMsg.PASSWORD_ERROR });
        }
    }
    catch (err) {
        done(err);
    }
});
exports.authenticateEmail = authenticateEmail;
// jwt 策略验证函数
// 访问受保护的路由时要检查 token, 就需要用到这个函数
const verifyJwt = (jwt_payload, // jwt_payload 一般为用户的 id
done) => __awaiter(void 0, void 0, void 0, function* () {
    // 得到 user 的 id, 是否需要在数据里再查找一下呢?
    // 应该是不需要的, 因为 token 不好伪造
    // 由于解码的是用户 id, 所以这里取出来的只是用户 id
    if (jwt_payload) {
        // 解析出签名的用户 id
        return done(null, jwt_payload);
    }
    else {
        return done(null, false);
    }
});
exports.verifyJwt = verifyJwt;
