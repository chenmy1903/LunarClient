import { isInArray } from "../../Utils";
import { Emitters } from "./Emitters";
import { EmitterClickMode, EmitterShapeType } from "./Enums";
import { Emitter } from "./Options/Classes/Emitter";
import { ShapeManager } from "./ShapeManager";
import { CircleShape } from "./Shapes/Circle/CircleShape";
import { SquareShape } from "./Shapes/Square/SquareShape";
/**
 * @category Emitters Plugin
 */
class EmittersPlugin {
    constructor() {
        this.id = "emitters";
    }
    getPlugin(container) {
        return new Emitters(container);
    }
    needsPlugin(options) {
        var _a, _b, _c;
        if (options === undefined) {
            return false;
        }
        const emitters = options.emitters;
        return ((emitters instanceof Array && !!emitters.length) ||
            emitters !== undefined ||
            (!!((_c = (_b = (_a = options.interactivity) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.onClick) === null || _c === void 0 ? void 0 : _c.mode) &&
                isInArray(EmitterClickMode.emitter, options.interactivity.events.onClick.mode)));
    }
    loadOptions(options, source) {
        var _a, _b;
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }
        const optionsCast = options;
        if (source === null || source === void 0 ? void 0 : source.emitters) {
            if ((source === null || source === void 0 ? void 0 : source.emitters) instanceof Array) {
                optionsCast.emitters = source === null || source === void 0 ? void 0 : source.emitters.map((s) => {
                    const tmp = new Emitter();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                let emitterOptions = optionsCast.emitters;
                if ((emitterOptions === null || emitterOptions === void 0 ? void 0 : emitterOptions.load) === undefined) {
                    optionsCast.emitters = emitterOptions = new Emitter();
                }
                emitterOptions.load(source === null || source === void 0 ? void 0 : source.emitters);
            }
        }
        const interactivityEmitters = (_b = (_a = source === null || source === void 0 ? void 0 : source.interactivity) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.emitters;
        if (interactivityEmitters) {
            if (interactivityEmitters instanceof Array) {
                optionsCast.interactivity.modes.emitters = interactivityEmitters.map((s) => {
                    const tmp = new Emitter();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                let emitterOptions = optionsCast.interactivity.modes.emitters;
                if ((emitterOptions === null || emitterOptions === void 0 ? void 0 : emitterOptions.load) === undefined) {
                    optionsCast.interactivity.modes.emitters = emitterOptions = new Emitter();
                }
                emitterOptions.load(interactivityEmitters);
            }
        }
    }
}
export async function loadEmittersPlugin(tsParticles) {
    const plugin = new EmittersPlugin();
    await tsParticles.addPlugin(plugin);
    if (!tsParticles.addEmitterShape) {
        tsParticles.addEmitterShape = (name, shape) => {
            ShapeManager.addShape(name, shape);
        };
    }
    tsParticles.addEmitterShape(EmitterShapeType.circle, new CircleShape());
    tsParticles.addEmitterShape(EmitterShapeType.square, new SquareShape());
}
export * from "./EmittersMain";
