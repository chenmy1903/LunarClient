"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Main_initialized;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const Utils_1 = require("./Utils");
const Loader_1 = require("./Core/Loader");
class Main {
    constructor() {
        _Main_initialized.set(this, void 0);
        __classPrivateFieldSet(this, _Main_initialized, false, "f");
    }
    init() {
        if (!__classPrivateFieldGet(this, _Main_initialized, "f")) {
            __classPrivateFieldSet(this, _Main_initialized, true, "f");
        }
    }
    async loadFromArray(tagId, options, index) {
        return Loader_1.Loader.load(tagId, options, index);
    }
    async load(tagId, options) {
        return Loader_1.Loader.load(tagId, options);
    }
    async set(id, element, options) {
        return Loader_1.Loader.set(id, element, options);
    }
    async loadJSON(tagId, pathConfigJson, index) {
        return Loader_1.Loader.loadJSON(tagId, pathConfigJson, index);
    }
    async setJSON(id, element, pathConfigJson, index) {
        return Loader_1.Loader.setJSON(id, element, pathConfigJson, index);
    }
    setOnClickHandler(callback) {
        Loader_1.Loader.setOnClickHandler(callback);
    }
    dom() {
        return Loader_1.Loader.dom();
    }
    domItem(index) {
        return Loader_1.Loader.domItem(index);
    }
    async refresh() {
        for (const instance of this.dom()) {
            await instance.refresh();
        }
    }
    async addShape(shape, drawer, init, afterEffect, destroy) {
        let customDrawer;
        if (typeof drawer === "function") {
            customDrawer = {
                afterEffect: afterEffect,
                destroy: destroy,
                draw: drawer,
                init: init,
            };
        }
        else {
            customDrawer = drawer;
        }
        Utils_1.Plugins.addShapeDrawer(shape, customDrawer);
        await this.refresh();
    }
    async addPreset(preset, options, override = false) {
        Utils_1.Plugins.addPreset(preset, options, override);
        await this.refresh();
    }
    async addPlugin(plugin) {
        Utils_1.Plugins.addPlugin(plugin);
        await this.refresh();
    }
    async addPathGenerator(name, generator) {
        Utils_1.Plugins.addPathGenerator(name, generator);
        await this.refresh();
    }
    async addInteractor(name, interactorInitializer) {
        Utils_1.Plugins.addInteractor(name, interactorInitializer);
        await this.refresh();
    }
    async addParticleUpdater(name, updaterInitializer) {
        Utils_1.Plugins.addParticleUpdater(name, updaterInitializer);
        await this.refresh();
    }
}
exports.Main = Main;
_Main_initialized = new WeakMap();
