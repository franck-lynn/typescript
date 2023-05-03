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
const graphql_1 = require("graphql");
const graphql_2 = require("./graphql");
const yoga_1 = require("./yoga");
// https://the-guild.dev/graphql/codegen/docs/guides/api-testing
function executeOperation(operation, ...[variables]) {
    return Promise.resolve(yoga_1.yoga.fetch("http://yoga/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            query: (0, graphql_1.print)(operation),
            variables: variables !== null && variables !== void 0 ? variables : undefined,
        }),
    })).then((response) => response.json());
}
describe("Yoga Tests", () => {
    it("execute query operation", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const HelloQuery = (0, graphql_2.graphql)(/* GraphQL */ `
      query HelloQuery {
        hello
      }
    `);
        const result = yield executeOperation(HelloQuery);
        expect((_a = result.data) === null || _a === void 0 ? void 0 : _a.hello).toEqual("Hello world!");
    }));
    it("execute mutation operation", () => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const EchoMutation = (0, graphql_2.graphql)(/* GraphQL */ `
      mutation EchoMutation($message: String!) {
        echo(message: $message)
      }
    `);
        const result = yield executeOperation(EchoMutation, {
            message: "Ohayoo!",
        });
        expect((_b = result.data) === null || _b === void 0 ? void 0 : _b.echo).toEqual("Ohayoo!");
    }));
    it("execute mutation operation (variant)", () => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const EchoMutation = (0, graphql_2.graphql)(/* GraphQL */ `
      mutation EchoMutation($message: String!) {
        echo(message: $message)
      }
    `);
        const result = yield executeOperation(EchoMutation, {
            message: "Konbanwa",
        });
        expect((_c = result.data) === null || _c === void 0 ? void 0 : _c.echo).toEqual("Konbanwa");
    }));
});
