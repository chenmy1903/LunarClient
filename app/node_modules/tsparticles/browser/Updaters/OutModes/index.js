import { OutOfCanvasUpdater } from "./OutOfCanvasUpdater";
export async function loadOutModesUpdater(tsParticles) {
    await tsParticles.addParticleUpdater("outModes", (container) => new OutOfCanvasUpdater(container));
}
