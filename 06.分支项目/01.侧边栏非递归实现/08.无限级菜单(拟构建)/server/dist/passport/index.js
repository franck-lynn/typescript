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
exports.checkAuthenticated = exports.loginAuthenticated = exports.initializePassport = void 0;
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("./config");
const strategy_1 = require("./strategy");
const contstants_1 = require("../contstants");
const locale_1 = require("../locale");
// 初始化 passport
const initializePassport = (app) => {
    app.use(passport_1.default.initialize());
    passport_1.default.use(new passport_local_1.Strategy(config_1.loacalStrategyOptions, strategy_1.authenticateEmail));
    passport_1.default.use(new passport_jwt_1.Strategy(config_1.jwtStrategyOptions, strategy_1.verifyJwt));
};
exports.initializePassport = initializePassport;
// 授权, 签发 token
const loginAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return passport_1.default.authenticate("local", (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        // 用户登录时, 先走的时 authenticateEmail, 只有 authenticateEmail 都通过了,
        // 才执行这里的流程
        if (user && user.email && contstants_1.SECRET) {
            // 签发 token
            const token = jsonwebtoken_1.default.sign({ id: String(user._id) }, contstants_1.SECRET);
            res.send({ status: 200, token, msg: locale_1.ResMsg.LOGIN_SUCCESS });
            return next();
        }
        else {
            res.send({ msg: locale_1.ResMsg.PASSWORD_ERROR });
        }
    }))(req, res, next);
});
exports.loginAuthenticated = loginAuthenticated;
// 访问受保护的路由时要先检查下是否有授权
const checkAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return passport_1.default.authenticate("jwt", (err, user /* , info */) => __awaiter(void 0, void 0, void 0, function* () {
        // 这里的函数参数就是 verifyJwt 函数里的 done() 函数参数
        // 当访问受保护的路由时, 请求头必须要带上 token,
        if (user) {
            // 说明通过了,进行后续的操作
            return next();
        }
        else {
            res.send({ msg: locale_1.ResMsg.NO_AUTHN });
        }
    }))(req, res, next);
});
exports.checkAuthenticated = checkAuthenticated;
