import { ShapeType } from "../../../../Enums";
import { deepExtend } from "../../../../Utils";
export class Shape {
    constructor() {
        this.options = {};
        this.type = ShapeType.circle;
    }
    get image() {
        var _a;
        return ((_a = this.options[ShapeType.image]) !== null && _a !== void 0 ? _a : this.options[ShapeType.images]);
    }
    set image(value) {
        this.options[ShapeType.image] = value;
        this.options[ShapeType.images] = value;
    }
    get custom() {
        return this.options;
    }
    set custom(value) {
        this.options = value;
    }
    get images() {
        return this.image;
    }
    set images(value) {
        this.image = value;
    }
    get stroke() {
        return [];
    }
    set stroke(_value) {
    }
    get character() {
        var _a;
        return ((_a = this.options[ShapeType.character]) !== null && _a !== void 0 ? _a : this.options[ShapeType.char]);
    }
    set character(value) {
        this.options[ShapeType.character] = value;
        this.options[ShapeType.char] = value;
    }
    get polygon() {
        var _a;
        return ((_a = this.options[ShapeType.polygon]) !== null && _a !== void 0 ? _a : this.options[ShapeType.star]);
    }
    set polygon(value) {
        this.options[ShapeType.polygon] = value;
        this.options[ShapeType.star] = value;
    }
    load(data) {
        var _a, _b, _c;
        if (data === undefined) {
            return;
        }
        const options = (_a = data.options) !== null && _a !== void 0 ? _a : data.custom;
        if (options !== undefined) {
            for (const shape in options) {
                const item = options[shape];
                if (item !== undefined) {
                    this.options[shape] = deepExtend((_b = this.options[shape]) !== null && _b !== void 0 ? _b : {}, item);
                }
            }
        }
        this.loadShape(data.character, ShapeType.character, ShapeType.char, true);
        this.loadShape(data.polygon, ShapeType.polygon, ShapeType.star, false);
        this.loadShape((_c = data.image) !== null && _c !== void 0 ? _c : data.images, ShapeType.image, ShapeType.images, true);
        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
    loadShape(item, mainKey, altKey, altOverride) {
        var _a, _b, _c, _d;
        if (item === undefined) {
            return;
        }
        if (item instanceof Array) {
            if (!(this.options[mainKey] instanceof Array)) {
                this.options[mainKey] = [];
                if (!this.options[altKey] || altOverride) {
                    this.options[altKey] = [];
                }
            }
            this.options[mainKey] = deepExtend((_a = this.options[mainKey]) !== null && _a !== void 0 ? _a : [], item);
            if (!this.options[altKey] || altOverride) {
                this.options[altKey] = deepExtend((_b = this.options[altKey]) !== null && _b !== void 0 ? _b : [], item);
            }
        }
        else {
            if (this.options[mainKey] instanceof Array) {
                this.options[mainKey] = {};
                if (!this.options[altKey] || altOverride) {
                    this.options[altKey] = {};
                }
            }
            this.options[mainKey] = deepExtend((_c = this.options[mainKey]) !== null && _c !== void 0 ? _c : {}, item);
            if (!this.options[altKey] || altOverride) {
                this.options[altKey] = deepExtend((_d = this.options[altKey]) !== null && _d !== void 0 ? _d : {}, item);
            }
        }
    }
}
