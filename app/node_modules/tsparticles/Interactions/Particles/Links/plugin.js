"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPlugin = void 0;
const LinkInstance_1 = require("./LinkInstance");
class Plugin {
    constructor() {
        this.id = "links";
    }
    getPlugin(container) {
        return new LinkInstance_1.LinkInstance(container);
    }
    needsPlugin() {
        return true;
    }
    loadOptions() {
    }
}
async function loadPlugin(tsParticles) {
    const plugin = new Plugin();
    await tsParticles.addPlugin(plugin);
}
exports.loadPlugin = loadPlugin;
