"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baby = exports.Baby = void 0;
var Baby = (function () {
    function Baby(name) {
        this._name = name;
        console.log("小宝贝正在哭泣，哇哇哇哇哇~~~");
    }
    Baby.smile = function () {
        console.log('O(∩_∩)O哈！');
    };
    Baby.prototype.getBabyName = function () {
        return this._name;
    };
    return Baby;
}());
exports.Baby = Baby;
exports.baby = new Baby('Nico');
//# sourceMappingURL=baby.js.map