import { MoveType } from "../../Enums";
export class Move {
    constructor() {
        this.radius = 10;
        this.type = MoveType.path;
    }
    load(data) {
        if (data !== undefined) {
            if (data.radius !== undefined) {
                this.radius = data.radius;
            }
            if (data.type !== undefined) {
                this.type = data.type;
            }
        }
    }
}
