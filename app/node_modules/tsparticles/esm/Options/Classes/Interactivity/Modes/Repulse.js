import { RepulseDiv } from "./RepulseDiv";
import { RepulseBase } from "./RepulseBase";
export class Repulse extends RepulseBase {
    load(data) {
        super.load(data);
        if ((data === null || data === void 0 ? void 0 : data.divs) === undefined) {
            return;
        }
        if (data.divs instanceof Array) {
            this.divs = data.divs.map((s) => {
                const tmp = new RepulseDiv();
                tmp.load(s);
                return tmp;
            });
        }
        else {
            if (this.divs instanceof Array || !this.divs) {
                this.divs = new RepulseDiv();
            }
            this.divs.load(data.divs);
        }
    }
}
