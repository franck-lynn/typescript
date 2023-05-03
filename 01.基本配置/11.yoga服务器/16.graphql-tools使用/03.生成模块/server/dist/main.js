"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yoga_1 = require("./yoga");
const application_1 = __importDefault(require("./application"));
const contstants_1 = require("./contstants");
application_1.default.use("/graphql", yoga_1.yoga);
application_1.default.listen(contstants_1.PORT, () => {
    console.log(`Server is running at ${contstants_1.HOST_NAME}:${contstants_1.PORT}`);
});
