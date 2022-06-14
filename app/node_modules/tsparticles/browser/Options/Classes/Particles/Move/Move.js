import { Attract } from "./Attract";
import { MoveDirection } from "../../../../Enums";
import { Trail } from "./Trail";
import { Path } from "./Path/Path";
import { MoveAngle } from "./MoveAngle";
import { MoveGravity } from "./MoveGravity";
import { OutModes } from "./OutModes";
import { deepExtend, setRangeValue } from "../../../../Utils";
import { Spin } from "./Spin";
/**
 * [[include:Options/Particles/Move.md]]
 * @category Options
 */
export class Move {
    constructor() {
        this.angle = new MoveAngle();
        this.attract = new Attract();
        this.decay = 0;
        this.distance = {};
        this.direction = MoveDirection.none;
        this.drift = 0;
        this.enable = false;
        this.gravity = new MoveGravity();
        this.path = new Path();
        this.outModes = new OutModes();
        this.random = false;
        this.size = false;
        this.speed = 2;
        this.spin = new Spin();
        this.straight = false;
        this.trail = new Trail();
        this.vibrate = false;
        this.warp = false;
    }
    /**
     * @deprecated this property is obsolete, please use the new collisions object on particles options
     */
    get collisions() {
        return false;
    }
    /**
     * @deprecated this property is obsolete, please use the new collisions object on particles options
     * @param value
     */
    set collisions(value) {
        // deprecated
    }
    /**
     * @deprecated this property is obsolete, please use the new collisions object on particles options
     */
    get bounce() {
        return this.collisions;
    }
    /**
     * @deprecated this property is obsolete, please use the new collisions object on particles options
     * @param value
     */
    set bounce(value) {
        this.collisions = value;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new outMode
     */
    get out_mode() {
        return this.outMode;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new outMode
     * @param value
     */
    set out_mode(value) {
        this.outMode = value;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new outMode
     */
    get outMode() {
        return this.outModes.default;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new outMode
     * @param value
     */
    set outMode(value) {
        this.outModes.default = value;
    }
    /**
     * @deprecated use the new [[path]] property instead
     */
    get noise() {
        return this.path;
    }
    /**
     * @deprecated use the new [[path]] property instead
     */
    set noise(value) {
        this.path = value;
    }
    load(data) {
        var _a, _b, _c;
        if (data === undefined) {
            return;
        }
        if (data.angle !== undefined) {
            if (typeof data.angle === "number") {
                this.angle.value = data.angle;
            }
            else {
                this.angle.load(data.angle);
            }
        }
        this.attract.load(data.attract);
        if (data.decay !== undefined) {
            this.decay = data.decay;
        }
        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
        if (data.distance !== undefined) {
            this.distance =
                typeof data.distance === "number"
                    ? {
                        horizontal: data.distance,
                        vertical: data.distance,
                    }
                    : deepExtend({}, data.distance);
        }
        if (data.drift !== undefined) {
            this.drift = setRangeValue(data.drift);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.gravity.load(data.gravity);
        const outMode = (_a = data.outMode) !== null && _a !== void 0 ? _a : data.out_mode;
        if (data.outModes !== undefined || outMode !== undefined) {
            if (typeof data.outModes === "string" || (data.outModes === undefined && outMode !== undefined)) {
                this.outModes.load({
                    default: (_b = data.outModes) !== null && _b !== void 0 ? _b : outMode,
                });
            }
            else {
                this.outModes.load(data.outModes);
            }
        }
        this.path.load((_c = data.path) !== null && _c !== void 0 ? _c : data.noise);
        if (data.random !== undefined) {
            this.random = data.random;
        }
        if (data.size !== undefined) {
            this.size = data.size;
        }
        if (data.speed !== undefined) {
            this.speed = setRangeValue(data.speed);
        }
        this.spin.load(data.spin);
        if (data.straight !== undefined) {
            this.straight = data.straight;
        }
        this.trail.load(data.trail);
        if (data.vibrate !== undefined) {
            this.vibrate = data.vibrate;
        }
        if (data.warp !== undefined) {
            this.warp = data.warp;
        }
    }
}
