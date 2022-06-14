"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Absorber = void 0;
const AbsorberSize_1 = require("./AbsorberSize");
const OptionsColor_1 = require("../../../../Options/Classes/OptionsColor");
class Absorber {
    constructor() {
        this.color = new OptionsColor_1.OptionsColor();
        this.color.value = "#000000";
        this.draggable = false;
        this.opacity = 1;
        this.destroy = true;
        this.orbits = false;
        this.size = new AbsorberSize_1.AbsorberSize();
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.color !== undefined) {
            this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
        }
        if (data.draggable !== undefined) {
            this.draggable = data.draggable;
        }
        this.name = data.name;
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
        if (data.position !== undefined) {
            this.position = {
                x: data.position.x,
                y: data.position.y,
            };
        }
        if (data.size !== undefined) {
            this.size.load(data.size);
        }
        if (data.destroy !== undefined) {
            this.destroy = data.destroy;
        }
        if (data.orbits !== undefined) {
            this.orbits = data.orbits;
        }
    }
}
exports.Absorber = Absorber;
