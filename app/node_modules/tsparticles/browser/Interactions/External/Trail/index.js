import { TrailMaker } from "./TrailMaker";
export async function loadExternalTrailInteraction(tsParticles) {
    await tsParticles.addInteractor("externalTrail", (container) => new TrailMaker(container));
}
