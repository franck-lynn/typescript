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
exports.getUserByToken = exports.getUserByEmail = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const contstants_1 = require("../../contstants");
const user_model_1 = require("./user.model");
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findOne({ email });
});
exports.getUserByEmail = getUserByEmail;
const getUserByToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const raw = token.split(" ").pop() || "";
        const { id } = contstants_1.SECRET ? jsonwebtoken_1.default.verify(raw, contstants_1.SECRET) : { id: null };
        return (yield user_model_1.User.findById(id));
    }
    catch (error) {
        throw new Error("授权token不可用, 请重新登录. " + error);
    }
});
exports.getUserByToken = getUserByToken;
