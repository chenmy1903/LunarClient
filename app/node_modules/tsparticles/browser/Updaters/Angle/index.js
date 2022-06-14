import { AngleUpdater } from "./AngleUpdater";
export async function loadAngleUpdater(tsParticles) {
    await tsParticles.addParticleUpdater("angle", (container) => new AngleUpdater(container));
}
