/**
 * The options to set the particles in the background using CSS `fixed` position
 * The [[zIndex]] property sets the background CSS `z-index` property
 * [[include:Options/FullScreen.md]]
 * @category Options
 */
export class FullScreen {
    constructor() {
        this.enable = true;
        this.zIndex = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.zIndex !== undefined) {
            this.zIndex = data.zIndex;
        }
    }
}
