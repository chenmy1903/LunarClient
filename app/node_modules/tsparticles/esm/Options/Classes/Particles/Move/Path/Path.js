import { PathDelay } from "./PathDelay";
import { deepExtend } from "../../../../../Utils";
export class Path {
    constructor() {
        this.clamp = true;
        this.delay = new PathDelay();
        this.enable = false;
        this.options = {};
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.clamp !== undefined) {
            this.clamp = data.clamp;
        }
        this.delay.load(data.delay);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.generator = data.generator;
        if (data.options) {
            this.options = deepExtend(this.options, data.options);
        }
    }
}
