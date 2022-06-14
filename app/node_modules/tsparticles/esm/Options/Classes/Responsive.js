import { deepExtend } from "../../Utils";
import { ResponsiveMode } from "../../Enums";
export class Responsive {
    constructor() {
        this.maxWidth = Infinity;
        this.options = {};
        this.mode = ResponsiveMode.canvas;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.maxWidth !== undefined) {
            this.maxWidth = data.maxWidth;
        }
        if (data.mode !== undefined) {
            if (data.mode === ResponsiveMode.screen) {
                this.mode = ResponsiveMode.screen;
            }
            else {
                this.mode = ResponsiveMode.canvas;
            }
        }
        if (data.options !== undefined) {
            this.options = deepExtend({}, data.options);
        }
    }
}
