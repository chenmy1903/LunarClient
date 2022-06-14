"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticlesOptions = void 0;
const Links_1 = require("./Links/Links");
const Move_1 = require("./Move/Move");
const ParticlesNumber_1 = require("./Number/ParticlesNumber");
const Opacity_1 = require("./Opacity/Opacity");
const Shape_1 = require("./Shape/Shape");
const Size_1 = require("./Size/Size");
const Rotate_1 = require("./Rotate/Rotate");
const Shadow_1 = require("./Shadow");
const Stroke_1 = require("./Stroke");
const Collisions_1 = require("./Collisions/Collisions");
const Twinkle_1 = require("./Twinkle/Twinkle");
const AnimatableColor_1 = require("../AnimatableColor");
const Life_1 = require("./Life/Life");
const Bounce_1 = require("./Bounce/Bounce");
const Destroy_1 = require("./Destroy/Destroy");
const Wobble_1 = require("./Wobble/Wobble");
const Tilt_1 = require("./Tilt/Tilt");
const Roll_1 = require("./Roll/Roll");
const ZIndex_1 = require("./ZIndex/ZIndex");
const Utils_1 = require("../../../Utils");
const Orbit_1 = require("./Orbit/Orbit");
const Repulse_1 = require("./Repulse/Repulse");
const AnimatableGradient_1 = require("../AnimatableGradient");
class ParticlesOptions {
    constructor() {
        this.bounce = new Bounce_1.Bounce();
        this.collisions = new Collisions_1.Collisions();
        this.color = new AnimatableColor_1.AnimatableColor();
        this.destroy = new Destroy_1.Destroy();
        this.gradient = [];
        this.groups = {};
        this.life = new Life_1.Life();
        this.links = new Links_1.Links();
        this.move = new Move_1.Move();
        this.number = new ParticlesNumber_1.ParticlesNumber();
        this.opacity = new Opacity_1.Opacity();
        this.orbit = new Orbit_1.Orbit();
        this.reduceDuplicates = false;
        this.repulse = new Repulse_1.Repulse();
        this.roll = new Roll_1.Roll();
        this.rotate = new Rotate_1.Rotate();
        this.shadow = new Shadow_1.Shadow();
        this.shape = new Shape_1.Shape();
        this.size = new Size_1.Size();
        this.stroke = new Stroke_1.Stroke();
        this.tilt = new Tilt_1.Tilt();
        this.twinkle = new Twinkle_1.Twinkle();
        this.wobble = new Wobble_1.Wobble();
        this.zIndex = new ZIndex_1.ZIndex();
    }
    get line_linked() {
        return this.links;
    }
    set line_linked(value) {
        this.links = value;
    }
    get lineLinked() {
        return this.links;
    }
    set lineLinked(value) {
        this.links = value;
    }
    load(data) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (data === undefined) {
            return;
        }
        this.bounce.load(data.bounce);
        this.color.load(AnimatableColor_1.AnimatableColor.create(this.color, data.color));
        this.destroy.load(data.destroy);
        this.life.load(data.life);
        const links = (_b = (_a = data.links) !== null && _a !== void 0 ? _a : data.lineLinked) !== null && _b !== void 0 ? _b : data.line_linked;
        if (links !== undefined) {
            this.links.load(links);
        }
        if (data.groups !== undefined) {
            for (const group in data.groups) {
                const item = data.groups[group];
                if (item !== undefined) {
                    this.groups[group] = (0, Utils_1.deepExtend)((_c = this.groups[group]) !== null && _c !== void 0 ? _c : {}, item);
                }
            }
        }
        this.move.load(data.move);
        this.number.load(data.number);
        this.opacity.load(data.opacity);
        this.orbit.load(data.orbit);
        if (data.reduceDuplicates !== undefined) {
            this.reduceDuplicates = data.reduceDuplicates;
        }
        this.repulse.load(data.repulse);
        this.roll.load(data.roll);
        this.rotate.load(data.rotate);
        this.shape.load(data.shape);
        this.size.load(data.size);
        this.shadow.load(data.shadow);
        this.tilt.load(data.tilt);
        this.twinkle.load(data.twinkle);
        this.wobble.load(data.wobble);
        this.zIndex.load(data.zIndex);
        const collisions = (_e = (_d = data.move) === null || _d === void 0 ? void 0 : _d.collisions) !== null && _e !== void 0 ? _e : (_f = data.move) === null || _f === void 0 ? void 0 : _f.bounce;
        if (collisions !== undefined) {
            this.collisions.enable = collisions;
        }
        this.collisions.load(data.collisions);
        const strokeToLoad = (_g = data.stroke) !== null && _g !== void 0 ? _g : (_h = data.shape) === null || _h === void 0 ? void 0 : _h.stroke;
        if (strokeToLoad) {
            if (strokeToLoad instanceof Array) {
                this.stroke = strokeToLoad.map((s) => {
                    const tmp = new Stroke_1.Stroke();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                if (this.stroke instanceof Array) {
                    this.stroke = new Stroke_1.Stroke();
                }
                this.stroke.load(strokeToLoad);
            }
        }
        const gradientToLoad = data.gradient;
        if (gradientToLoad) {
            if (gradientToLoad instanceof Array) {
                this.gradient = gradientToLoad.map((s) => {
                    const tmp = new AnimatableGradient_1.AnimatableGradient();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                if (this.gradient instanceof Array) {
                    this.gradient = new AnimatableGradient_1.AnimatableGradient();
                }
                this.gradient.load(gradientToLoad);
            }
        }
    }
}
exports.ParticlesOptions = ParticlesOptions;
