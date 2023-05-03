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
exports.plugins = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// 授权插件使用了 @envelop/generic-auth 这个插件
// https://the-guild.dev/graphql/envelop/plugins/use-generic-auth
const graphql_1 = require("graphql");
const core_1 = require("@envelop/core");
const generic_auth_1 = require("@envelop/generic-auth");
const contstants_1 = require("../contstants");
const db_1 = require("../db");
const resolveUserFn = (context) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. 先走这里
    try {
        const authorization = context.req.headers.authorization || "";
        const raw = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ").pop();
        // console.log("前端传过来的全局变量 ====> ", context.req)
        if (!raw)
            return { message: "没有授权" };
        if (!contstants_1.SECRET)
            return { messgae: "服务器错误" };
        const { id } = jsonwebtoken_1.default.verify(raw, contstants_1.SECRET);
        // if (id) return { id } // 作为 currentUser 保存在上下文中
        const user = yield db_1.User.findById(id);
        console.log("是否找到user?  ", user);
        if (user) {
            context.currentUser = user;
            return { id };
        }
        else {
            return { messgae: "其他未知错误" };
        }
    }
    catch (e) {
        return { message: "Failed to validate token, 口令错误" };
    }
});
const validateUser = (params) => {
    // 2. 再走这里
    // Here you can implement any custom to check if the user is valid and have access to the server.
    // 这里可以实现自定义的 user 检查
    // This method is being triggered in different flows,
    // based on the mode you chose to implement.
    // 根据不同模式下的实现, 触发不同的流程
    // If you are using the `protect-auth-directive` mode,
    // you'll also get 2 additional parameters: the resolver
    // parameters as object and the DirectiveNode of the auth directive.
    // In `protect-auth-directive` mode, this function will always
    // get called and you can use these parameters to check if the
    // field has the `@auth` or `@skipAuth` directive
    const user = params.user;
    console.log("第2步: user传递到这里 ======> ");
    if (!user) {
        throw new Error(`没有授权, Unauthenticated!`);
    }
};
// 导出给 express restful 路由使用
// 导出插件给 yoga 使用
exports.plugins = [
    (0, core_1.useEngine)({ parse: graphql_1.parse, validate: graphql_1.validate, specifiedRules: graphql_1.specifiedRules, execute: graphql_1.execute, subscribe: graphql_1.subscribe }),
    // 去掉 graphql-shield 授权
    // useGraphQLMiddleware([permissions]),
    (0, generic_auth_1.useGenericAuth)({
        resolveUserFn,
        validateUser,
        mode: "protect-granular",
    }),
];
