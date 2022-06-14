export class Push {
    constructor() {
        this.default = true;
        this.groups = [];
        this.quantity = 4;
    }
    get particles_nb() {
        return this.quantity;
    }
    set particles_nb(value) {
        this.quantity = value;
    }
    load(data) {
        var _a;
        if (data === undefined) {
            return;
        }
        if (data.default !== undefined) {
            this.default = data.default;
        }
        if (data.groups !== undefined) {
            this.groups = data.groups.map((t) => t);
        }
        if (!this.groups.length) {
            this.default = true;
        }
        const quantity = (_a = data.quantity) !== null && _a !== void 0 ? _a : data.particles_nb;
        if (quantity !== undefined) {
            this.quantity = quantity;
        }
    }
}
