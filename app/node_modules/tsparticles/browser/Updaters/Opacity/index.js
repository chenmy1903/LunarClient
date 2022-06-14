import { OpacityUpdater } from "./OpacityUpdater";
export async function loadOpacityUpdater(tsParticles) {
    await tsParticles.addParticleUpdater("opacity", (container) => new OpacityUpdater(container));
}
