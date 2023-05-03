"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const helloRouter_1 = require("./hello/helloRouter");
const routesArray = [helloRouter_1.helloRouter];
const routes = (app) => {
    routesArray.forEach((route) => {
        app.use(route);
    });
};
exports.routes = routes;
