import { StrokeColorUpdater } from "./StrokeColorUpdater";
export async function loadStrokeColorUpdater(tsParticles) {
    await tsParticles.addParticleUpdater("strokeColor", (container) => new StrokeColorUpdater(container));
}
