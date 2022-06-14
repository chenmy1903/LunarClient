import { Bubbler } from "./Bubbler";
export async function loadExternalBubbleInteraction(tsParticles) {
    await tsParticles.addInteractor("externalBubble", (container) => new Bubbler(container));
}
