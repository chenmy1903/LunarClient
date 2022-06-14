import { Collider } from "./Collider";
export async function loadParticlesCollisionsInteraction(tsParticles) {
    await tsParticles.addInteractor("particlesCollisions", (container) => new Collider(container));
}
