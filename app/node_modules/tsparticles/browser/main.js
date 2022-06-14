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
import { Plugins } from "./Utils";
import { Loader } from "./Core/Loader";
/**
 * Main class for creating the singleton on window.
 * It's a singleton proxy to the static [[Loader]] class for initializing [[Container]] instances
 * @category Main
 */
export class Main {
    constructor() {
        _Main_initialized.set(this, void 0);
        __classPrivateFieldSet(this, _Main_initialized, false, "f");
    }
    /**
     * init method, used by imports
     */
    init() {
        if (!__classPrivateFieldGet(this, _Main_initialized, "f")) {
            __classPrivateFieldSet(this, _Main_initialized, true, "f");
        }
    }
    /**
     * Loads an options object from the provided array to create a [[Container]] object.
     * @param tagId The particles container element id
     * @param options The options array to get the item from
     * @param index If provided gets the corresponding item from the array
     * @returns A Promise with the [[Container]] object created
     */
    async loadFromArray(tagId, options, index) {
        return Loader.load(tagId, options, index);
    }
    /**
     * Loads the provided options to create a [[Container]] object.
     * @param tagId The particles container element id
     * @param options The options object to initialize the [[Container]]
     * @returns A Promise with the [[Container]] object created
     */
    async load(tagId, options) {
        return Loader.load(tagId, options);
    }
    /**
     * Loads the provided option to create a [[Container]] object using the element parameter as a container
     * @param id The particles container id
     * @param element The dom element used to contain the particles
     * @param options The options object to initialize the [[Container]]
     */
    async set(id, element, options) {
        return Loader.set(id, element, options);
    }
    /**
     * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
     * This method is async, so if you need a callback refer to JavaScript function `fetch`
     * @param tagId the particles container element id
     * @param pathConfigJson the json path (or paths array) to use in the GET request
     * @param index the index of the paths array, if a single path is passed this value is ignored
     * @returns A Promise with the [[Container]] object created
     */
    async loadJSON(tagId, pathConfigJson, index) {
        return Loader.loadJSON(tagId, pathConfigJson, index);
    }
    /**
     * Loads the provided option to create a [[Container]] object using the element parameter as a container
     * @param id The particles container id
     * @param element The dom element used to contain the particles
     * @param pathConfigJson the json path (or paths array) to use in the GET request
     * @param index the index of the paths array, if a single path is passed this value is ignored
     * @returns A Promise with the [[Container]] object created
     */
    async setJSON(id, element, pathConfigJson, index) {
        return Loader.setJSON(id, element, pathConfigJson, index);
    }
    /**
     * Adds an additional click handler to all the loaded [[Container]] objects.
     * @param callback The function called after the click event is fired
     */
    setOnClickHandler(callback) {
        Loader.setOnClickHandler(callback);
    }
    /**
     * All the [[Container]] objects loaded
     * @returns All the [[Container]] objects loaded
     */
    dom() {
        return Loader.dom();
    }
    /**
     * Retrieves a [[Container]] from all the objects loaded
     * @param index The object index
     * @returns The [[Container]] object at specified index, if present or not destroyed, otherwise undefined
     */
    domItem(index) {
        return Loader.domItem(index);
    }
    /**
     * Reloads all existing tsParticles loaded instances
     */
    async refresh() {
        for (const instance of this.dom()) {
            await instance.refresh();
        }
    }
    /**
     * addShape adds shape to tsParticles, it will be available to all future instances created
     * @param shape the shape name
     * @param drawer the shape drawer function or class instance that draws the shape in the canvas
     * @param init Optional: the shape drawer init function, used only if the drawer parameter is a function
     * @param afterEffect Optional: the shape drawer after effect function, used only if the drawer parameter is a function
     * @param destroy Optional: the shape drawer destroy function, used only if the drawer parameter is a function
     */
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
        Plugins.addShapeDrawer(shape, customDrawer);
        await this.refresh();
    }
    /**
     * addPreset adds preset to tsParticles, it will be available to all future instances created
     * @param preset the preset name
     * @param options the options to add to the preset
     * @param override if true, the preset will override any existing with the same name
     */
    async addPreset(preset, options, override = false) {
        Plugins.addPreset(preset, options, override);
        await this.refresh();
    }
    /**
     * addPlugin adds plugin to tsParticles, if an instance needs it it will be loaded
     * @param plugin the plugin implementation of [[IPlugin]]
     */
    async addPlugin(plugin) {
        Plugins.addPlugin(plugin);
        await this.refresh();
    }
    /**
     * addPathGenerator adds a named path generator to tsParticles, this can be called by options
     * @param name the path generator name
     * @param generator the path generator object
     */
    async addPathGenerator(name, generator) {
        Plugins.addPathGenerator(name, generator);
        await this.refresh();
    }
    /**
     *
     * @param name
     * @param interactorInitializer
     */
    async addInteractor(name, interactorInitializer) {
        Plugins.addInteractor(name, interactorInitializer);
        await this.refresh();
    }
    /**
     *
     * @param name
     * @param updaterInitializer
     */
    async addParticleUpdater(name, updaterInitializer) {
        Plugins.addParticleUpdater(name, updaterInitializer);
        await this.refresh();
    }
}
_Main_initialized = new WeakMap();
