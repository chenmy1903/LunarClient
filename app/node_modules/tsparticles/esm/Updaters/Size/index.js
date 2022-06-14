import { SizeUpdater } from "./SizeUpdater";
export async function loadSizeUpdater(tsParticles) {
    await tsParticles.addParticleUpdater("size", () => new SizeUpdater());
}
