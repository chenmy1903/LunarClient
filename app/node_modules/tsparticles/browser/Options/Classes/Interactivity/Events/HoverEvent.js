import { Parallax } from "./Parallax";
/**
 * [[include:Options/Interactivity/Hover.md]]
 * @category Options
 */
export class HoverEvent {
    constructor() {
        this.enable = false;
        this.mode = [];
        this.parallax = new Parallax();
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        this.parallax.load(data.parallax);
    }
}
