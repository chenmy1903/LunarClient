"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalInteractorBase = void 0;
const Enums_1 = require("../Enums");
class ExternalInteractorBase {
    constructor(container) {
        this.container = container;
        this.type = Enums_1.InteractorType.External;
    }
}
exports.ExternalInteractorBase = ExternalInteractorBase;
