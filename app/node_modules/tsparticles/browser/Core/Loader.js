import { Container } from "./Container";
import { Constants, itemFromArray } from "../Utils";
const tsParticlesDom = [];
function fetchError(statusCode) {
    console.error(`Error tsParticles - fetch status: ${statusCode}`);
    console.error("Error tsParticles - File config not found");
}
/**
 * Main class for creating the [[Container]] objects
 * @category Core
 */
export class Loader {
    /**
     * All the [[Container]] objects loaded
     */
    static dom() {
        return tsParticlesDom;
    }
    /**
     * Retrieves a [[Container]] from all the objects loaded
     * @param index the object index
     */
    static domItem(index) {
        const dom = Loader.dom();
        const item = dom[index];
        if (item && !item.destroyed) {
            return item;
        }
        dom.splice(index, 1);
    }
    static async loadOptions(params) {
        var _a, _b, _c;
        const tagId = (_a = params.tagId) !== null && _a !== void 0 ? _a : `tsparticles${Math.floor(Math.random() * 10000)}`;
        const { options, index } = params;
        /* elements */
        let domContainer = (_b = params.element) !== null && _b !== void 0 ? _b : document.getElementById(tagId);
        if (!domContainer) {
            domContainer = document.createElement("div");
            domContainer.id = tagId;
            (_c = document.querySelector("body")) === null || _c === void 0 ? void 0 : _c.append(domContainer);
        }
        const currentOptions = options instanceof Array ? itemFromArray(options, index) : options;
        const dom = Loader.dom();
        const oldIndex = dom.findIndex((v) => v.id === tagId);
        if (oldIndex >= 0) {
            const old = Loader.domItem(oldIndex);
            if (old && !old.destroyed) {
                old.destroy();
                dom.splice(oldIndex, 1);
            }
        }
        let canvasEl;
        let generatedCanvas;
        if (domContainer.tagName.toLowerCase() === "canvas") {
            canvasEl = domContainer;
            generatedCanvas = false;
        }
        else {
            const existingCanvases = domContainer.getElementsByTagName("canvas");
            /* get existing canvas if present, otherwise a new one will be created */
            if (existingCanvases.length) {
                canvasEl = existingCanvases[0];
                if (!canvasEl.className) {
                    canvasEl.className = Constants.canvasClass;
                }
                generatedCanvas = false;
            }
            else {
                generatedCanvas = true;
                /* create canvas element */
                canvasEl = document.createElement("canvas");
                canvasEl.className = Constants.canvasClass;
                /* set size canvas */
                canvasEl.style.width = "100%";
                canvasEl.style.height = "100%";
                /* append canvas */
                domContainer.appendChild(canvasEl);
            }
        }
        /* launch tsParticles */
        const newItem = new Container(tagId, currentOptions);
        if (oldIndex >= 0) {
            dom.splice(oldIndex, 0, newItem);
        }
        else {
            dom.push(newItem);
        }
        newItem.canvas.loadCanvas(canvasEl, generatedCanvas);
        await newItem.start();
        return newItem;
    }
    static async loadRemoteOptions(params) {
        const { url: jsonUrl, index } = params;
        const url = jsonUrl instanceof Array ? itemFromArray(jsonUrl, index) : jsonUrl;
        if (!url) {
            return;
        }
        const response = await fetch(url);
        if (!response.ok) {
            fetchError(response.status);
            return;
        }
        const data = await response.json();
        return await Loader.loadOptions({
            tagId: params.tagId,
            element: params.element,
            index,
            options: data,
        });
    }
    /**
     * Loads the provided options to create a [[Container]] object.
     * @param tagId the particles container element id
     * @param options the options object to initialize the [[Container]]
     * @param index if an options array is provided, this will retrieve the exact index of that array
     */
    static load(tagId, options, index) {
        const params = { index };
        if (typeof tagId === "string") {
            params.tagId = tagId;
        }
        else {
            params.options = tagId;
        }
        if (typeof options === "number") {
            params.index = options !== null && options !== void 0 ? options : params.index;
        }
        else {
            params.options = options !== null && options !== void 0 ? options : params.options;
        }
        return this.loadOptions(params);
    }
    /**
     * Loads the provided options to create a [[Container]] object.
     * @param id the particles container element id
     * @param domContainer the dom container
     * @param options the options object to initialize the [[Container]]
     * @param index if an options array is provided, this will retrieve the exact index of that array
     */
    static async set(id, domContainer, options, index) {
        const params = { index };
        if (typeof id === "string") {
            params.tagId = id;
        }
        else {
            params.element = id;
        }
        if (domContainer instanceof HTMLElement) {
            params.element = domContainer;
        }
        else {
            params.options = domContainer;
        }
        if (typeof options === "number") {
            params.index = options;
        }
        else {
            params.options = options !== null && options !== void 0 ? options : params.options;
        }
        return this.loadOptions(params);
    }
    /**
     * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
     * This method is async, so if you need a callback refer to JavaScript function `fetch`
     * @param tagId the particles container element id
     * @param jsonUrl the json path (or paths array) to use in the GET request
     * @param index the index of the paths array, if a single path is passed this value is ignored
     * @returns A Promise with the [[Container]] object created
     */
    static async loadJSON(tagId, jsonUrl, index) {
        let url, id;
        if (typeof jsonUrl === "number" || jsonUrl === undefined) {
            url = tagId;
        }
        else {
            id = tagId;
            url = jsonUrl;
        }
        return await Loader.loadRemoteOptions({ tagId: id, url, index });
    }
    /**
     * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
     * This method is async, so if you need a callback refer to JavaScript function `fetch`
     * @param id the particles container element id
     * @param domContainer the container used to contains the particles
     * @param jsonUrl the json path (or paths array) to use in the GET request
     * @param index the index of the paths array, if a single path is passed this value is ignored
     * @returns A Promise with the [[Container]] object created
     */
    static async setJSON(id, domContainer, jsonUrl, index) {
        let url, newId, newIndex, element;
        if (id instanceof HTMLElement) {
            element = id;
            url = domContainer;
            newIndex = jsonUrl;
        }
        else {
            newId = id;
            element = domContainer;
            url = jsonUrl;
            newIndex = index;
        }
        return await Loader.loadRemoteOptions({ tagId: newId, url, index: newIndex, element });
    }
    /**
     * Adds an additional click handler to all the loaded [[Container]] objects.
     * @param callback the function called after the click event is fired
     */
    static setOnClickHandler(callback) {
        const dom = Loader.dom();
        if (dom.length === 0) {
            throw new Error("Can only set click handlers after calling tsParticles.load() or tsParticles.loadJSON()");
        }
        for (const domItem of dom) {
            domItem.addClickHandler(callback);
        }
    }
}
