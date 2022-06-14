import { Links } from "./Links/Links";
import { Move } from "./Move/Move";
import { ParticlesNumber } from "./Number/ParticlesNumber";
import { Opacity } from "./Opacity/Opacity";
import { Shape } from "./Shape/Shape";
import { Size } from "./Size/Size";
import { Rotate } from "./Rotate/Rotate";
import { Shadow } from "./Shadow";
import { Stroke } from "./Stroke";
import { Collisions } from "./Collisions/Collisions";
import { Twinkle } from "./Twinkle/Twinkle";
import { AnimatableColor } from "../AnimatableColor";
import { Life } from "./Life/Life";
import { Bounce } from "./Bounce/Bounce";
import { Destroy } from "./Destroy/Destroy";
import { Wobble } from "./Wobble/Wobble";
import { Tilt } from "./Tilt/Tilt";
import { Roll } from "./Roll/Roll";
import { ZIndex } from "./ZIndex/ZIndex";
import { deepExtend } from "../../../Utils";
import { Orbit } from "./Orbit/Orbit";
import { Repulse } from "./Repulse/Repulse";
import { AnimatableGradient } from "../AnimatableGradient";
/**
 * [[include:Options/Particles.md]]
 * @category Options
 */
export class ParticlesOptions {
    constructor() {
        this.bounce = new Bounce();
        this.collisions = new Collisions();
        this.color = new AnimatableColor();
        this.destroy = new Destroy();
        this.gradient = [];
        this.groups = {};
        this.life = new Life();
        this.links = new Links();
        this.move = new Move();
        this.number = new ParticlesNumber();
        this.opacity = new Opacity();
        this.orbit = new Orbit();
        this.reduceDuplicates = false;
        this.repulse = new Repulse();
        this.roll = new Roll();
        this.rotate = new Rotate();
        this.shadow = new Shadow();
        this.shape = new Shape();
        this.size = new Size();
        this.stroke = new Stroke();
        this.tilt = new Tilt();
        this.twinkle = new Twinkle();
        this.wobble = new Wobble();
        this.zIndex = new ZIndex();
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new links
     */
    get line_linked() {
        return this.links;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new links
     * @param value
     */
    set line_linked(value) {
        this.links = value;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     */
    get lineLinked() {
        return this.links;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     * @param value
     */
    set lineLinked(value) {
        this.links = value;
    }
    load(data) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (data === undefined) {
            return;
        }
        this.bounce.load(data.bounce);
        this.color.load(AnimatableColor.create(this.color, data.color));
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
                    this.groups[group] = deepExtend((_c = this.groups[group]) !== null && _c !== void 0 ? _c : {}, item);
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
                    const tmp = new Stroke();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                if (this.stroke instanceof Array) {
                    this.stroke = new Stroke();
                }
                this.stroke.load(strokeToLoad);
            }
        }
        const gradientToLoad = data.gradient;
        if (gradientToLoad) {
            if (gradientToLoad instanceof Array) {
                this.gradient = gradientToLoad.map((s) => {
                    const tmp = new AnimatableGradient();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                if (this.gradient instanceof Array) {
                    this.gradient = new AnimatableGradient();
                }
                this.gradient.load(gradientToLoad);
            }
        }
    }
}
