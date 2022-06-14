import { deepExtend } from "../../../Utils";
import { ThemeDefault } from "./ThemeDefault";
export class Theme {
    constructor() {
        this.name = "";
        this.default = new ThemeDefault();
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        this.default.load(data.default);
        if (data.options !== undefined) {
            this.options = deepExtend({}, data.options);
        }
    }
}
