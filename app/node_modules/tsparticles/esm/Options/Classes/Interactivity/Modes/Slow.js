export class Slow {
    constructor() {
        this.factor = 3;
        this.radius = 200;
    }
    get active() {
        return false;
    }
    set active(_value) {
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.factor !== undefined) {
            this.factor = data.factor;
        }
        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}
