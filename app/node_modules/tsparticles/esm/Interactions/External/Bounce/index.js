import { Bouncer } from "./Bouncer";
export async function loadExternalBounceInteraction(tsParticles) {
    await tsParticles.addInteractor("externalBounce", (container) => new Bouncer(container));
}
