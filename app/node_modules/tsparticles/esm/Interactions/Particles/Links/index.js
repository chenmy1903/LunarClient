import { Linker } from "./Linker";
import { loadPlugin } from "./plugin";
export async function loadInteraction(tsParticles) {
    await tsParticles.addInteractor("particlesLinks", (container) => new Linker(container));
}
export async function loadParticlesLinksInteraction(tsParticles) {
    await loadInteraction(tsParticles);
    await loadPlugin(tsParticles);
}
