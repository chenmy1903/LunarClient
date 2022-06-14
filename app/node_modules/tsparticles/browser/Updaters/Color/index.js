import { ColorUpdater } from "./ColorUpdater";
export async function loadColorUpdater(tsParticles) {
    await tsParticles.addParticleUpdater("color", (container) => new ColorUpdater(container));
}
