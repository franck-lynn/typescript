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
exports.userResolver = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { compare } = bcryptjs_1.default;
// import { MutationResolvers, UserResolvers } from "../../types"
const contstants_1 = require("../../contstants");
const locale_1 = require("../../locale");
const db_1 = require("../../db");
exports.userResolver = {
    Mutation: {
        login: (root, loginInput) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(root);
            try {
                const { email, password } = loginInput;
                // 先判断下 邮箱和密码是否满足规范要求, 再考虑是否进行服务器查询
                const hasUser = yield db_1.User.findOne({ email });
                if (!hasUser) {
                    // 返回 404 状态码, 未找到
                    return { status: contstants_1.HttpStatus.NOT_FOUND, msg: locale_1.ResMsg.NO_USER };
                }
                // 比较用户传入的密码和数据库中的密码比较, 看看是不是相同
                const isPassed = yield compare(password, hasUser.password);
                if (!isPassed) {
                    return { status: contstants_1.HttpStatus.NOT_FOUND, msg: locale_1.ResMsg.PASSWORD_ERROR };
                }
                // 如果密码检查通过, 且有加密字符串, 就签发 token 口令
                if (isPassed && contstants_1.SECRET) {
                    // 签发 token 给客户端
                    const token = jsonwebtoken_1.default.sign({ id: String(hasUser._id) }, contstants_1.SECRET);
                    return { status: contstants_1.HttpStatus.OK, msg: locale_1.ResMsg.LOGIN_SUCCESS, token };
                }
            }
            catch (error) {
                return { status: contstants_1.HttpStatus.FORBIDDEN, msg: locale_1.ResMsg.OTHER_SERVER_ERROR + error };
            }
        }),
    },
};
