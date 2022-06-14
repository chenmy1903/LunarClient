import { TiltUpdater } from "./TiltUpdater";
export async function loadTiltUpdater(tsParticles) {
    await tsParticles.addParticleUpdater("tilt", (container) => new TiltUpdater(container));
}
