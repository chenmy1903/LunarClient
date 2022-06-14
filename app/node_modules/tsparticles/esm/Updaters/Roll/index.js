import { RollUpdater } from "./RollUpdater";
export async function loadRollUpdater(tsParticles) {
    await tsParticles.addParticleUpdater("roll", () => new RollUpdater());
}
