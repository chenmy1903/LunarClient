import { TwinkleValues } from "./TwinkleValues";
/**
 * [[include:Options/Particles/Twinkle.md]]
 * @category Options
 */
export class Twinkle {
    constructor() {
        this.lines = new TwinkleValues();
        this.particles = new TwinkleValues();
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        this.lines.load(data.lines);
        this.particles.load(data.particles);
    }
}
