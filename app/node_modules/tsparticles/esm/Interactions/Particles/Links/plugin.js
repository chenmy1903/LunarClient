import { LinkInstance } from "./LinkInstance";
class Plugin {
    constructor() {
        this.id = "links";
    }
    getPlugin(container) {
        return new LinkInstance(container);
    }
    needsPlugin() {
        return true;
    }
    loadOptions() {
    }
}
export async function loadPlugin(tsParticles) {
    const plugin = new Plugin();
    await tsParticles.addPlugin(plugin);
}
