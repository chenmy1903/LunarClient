import { Repulser } from "./Repulser";
export async function loadExternalRepulseInteraction(tsParticles) {
    await tsParticles.addInteractor("externalRepulse", (container) => new Repulser(container));
}
