import { WobbleUpdater } from "./WobbleUpdater";
export async function loadWobbleUpdater(tsParticles) {
    await tsParticles.addParticleUpdater("wobble", (container) => new WobbleUpdater(container));
}
