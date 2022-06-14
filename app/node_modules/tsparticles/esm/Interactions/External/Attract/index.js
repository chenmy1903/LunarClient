import { Attractor } from "./Attractor";
export async function loadExternalAttractInteraction(tsParticles) {
    await tsParticles.addInteractor("externalAttract", (container) => new Attractor(container));
}
