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
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersResolvers = void 0;
const users = [
    { id: "1", name: "franck.lynn", email: "lry_demry@163.com", password: "123456Aa" },
    { id: "2", name: "赵敏", email: "zm@163.com", password: "123456Aa" },
    { id: "3", name: "周芷若", email: "zzr@163.com", password: "123456Aa" },
];
exports.usersResolvers = {
    query: {
        allUsers: () => __awaiter(void 0, void 0, void 0, function* () {
            return users;
        }),
    },
};
