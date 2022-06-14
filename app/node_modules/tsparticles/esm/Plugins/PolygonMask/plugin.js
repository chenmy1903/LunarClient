import { PolygonMaskInstance } from "./PolygonMaskInstance";
import { PolygonMask } from "./Options/Classes/PolygonMask";
import { Type } from "./Enums";
import { isSsr } from "../../Utils";
class Plugin {
    constructor() {
        this.id = "polygonMask";
    }
    getPlugin(container) {
        return new PolygonMaskInstance(container);
    }
    needsPlugin(options) {
        var _a, _b, _c;
        return (_b = (_a = options === null || options === void 0 ? void 0 : options.polygon) === null || _a === void 0 ? void 0 : _a.enable) !== null && _b !== void 0 ? _b : (((_c = options === null || options === void 0 ? void 0 : options.polygon) === null || _c === void 0 ? void 0 : _c.type) !== undefined && options.polygon.type !== Type.none);
    }
    loadOptions(options, source) {
        if (!this.needsPlugin(source)) {
            return;
        }
        const optionsCast = options;
        let polygonOptions = optionsCast.polygon;
        if ((polygonOptions === null || polygonOptions === void 0 ? void 0 : polygonOptions.load) === undefined) {
            optionsCast.polygon = polygonOptions = new PolygonMask();
        }
        polygonOptions.load(source === null || source === void 0 ? void 0 : source.polygon);
    }
}
export async function loadPolygonMaskPlugin(tsParticles) {
    if (!isSsr() && !window.SVGPathSeg) {
        await import("./pathseg");
    }
    const plugin = new Plugin();
    await tsParticles.addPlugin(plugin);
}
