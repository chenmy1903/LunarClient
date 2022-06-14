import { ThemeMode } from "../../../Enums";
export class ThemeDefault {
    constructor() {
        this.auto = false;
        this.mode = ThemeMode.any;
        this.value = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.auto !== undefined) {
            this.auto = data.auto;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
