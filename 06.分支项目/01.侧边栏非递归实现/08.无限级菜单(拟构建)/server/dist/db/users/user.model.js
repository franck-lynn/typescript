"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String },
    meta: {
        createdAt: { type: mongoose_1.Schema.Types.Date, required: true },
        updatedAt: { type: mongoose_1.Schema.Types.Date, required: true },
    },
    avatar: { type: String },
});
exports.User = (0, mongoose_1.model)("User", userSchema);
