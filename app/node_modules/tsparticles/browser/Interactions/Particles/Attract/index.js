import { Attractor } from "./Attractor";
export async function loadParticlesAttractInteraction(tsParticles) {
    await tsParticles.addInteractor("particlesAttract", (container) => new Attractor(container));
}
