import { LifeUpdater } from "./LifeUpdater";
export async function loadLifeUpdater(tsParticles) {
    await tsParticles.addParticleUpdater("life", (container) => new LifeUpdater(container));
}
