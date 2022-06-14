import { CollisionMode } from "../../../../Enums";
import { Bounce } from "../Bounce/Bounce";
import { CollisionsOverlap } from "./CollisionsOverlap";
/**
 * @category Options
 * [[include:Collisions.md]]
 */
export class Collisions {
    constructor() {
        this.bounce = new Bounce();
        this.enable = false;
        this.mode = CollisionMode.bounce;
        this.overlap = new CollisionsOverlap();
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        this.bounce.load(data.bounce);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        this.overlap.load(data.overlap);
    }
}
