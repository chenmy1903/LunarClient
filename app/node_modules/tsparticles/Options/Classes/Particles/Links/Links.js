"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Links = void 0;
const LinksShadow_1 = require("./LinksShadow");
const LinksTriangle_1 = require("./LinksTriangle");
const OptionsColor_1 = require("../../OptionsColor");
class Links {
    constructor() {
        this.blink = false;
        this.color = new OptionsColor_1.OptionsColor();
        this.consent = false;
        this.distance = 100;
        this.enable = false;
        this.frequency = 1;
        this.opacity = 1;
        this.shadow = new LinksShadow_1.LinksShadow();
        this.triangles = new LinksTriangle_1.LinksTriangle();
        this.width = 1;
        this.warp = false;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.id !== undefined) {
            this.id = data.id;
        }
        if (data.blink !== undefined) {
            this.blink = data.blink;
        }
        this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
        if (data.consent !== undefined) {
            this.consent = data.consent;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.frequency !== undefined) {
            this.frequency = data.frequency;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
        this.shadow.load(data.shadow);
        this.triangles.load(data.triangles);
        if (data.width !== undefined) {
            this.width = data.width;
        }
        if (data.warp !== undefined) {
            this.warp = data.warp;
        }
    }
}
exports.Links = Links;
