export class RollLight {
    constructor() {
        this.enable = false;
        this.value = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
