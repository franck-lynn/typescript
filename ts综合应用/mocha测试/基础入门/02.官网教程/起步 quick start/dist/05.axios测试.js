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
const axios_1 = __importDefault(require("axios"));
const chai_1 = require("chai");
describe("Random", function () {
    return __awaiter(this, void 0, void 0, function* () {
        it("should get a new joke upon each request", function (done) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("打印一下看看 ---> ");
                const joke1 = yield axios_1.default.get("https://api.chucknorris.io/jokes/random");
                const joke2 = yield axios_1.default.get("https://api.chucknorris.io/jokes/random");
                console.log(joke1);
                (0, chai_1.expect)(joke1.data.value).not.to.be.equal(joke2.data.value);
                done();
            });
        });
    });
});
// cross-env TS_NODE_PROJECT='tsconfig.test.json' mocha src/05.axios测试.ts --timeout 5000
