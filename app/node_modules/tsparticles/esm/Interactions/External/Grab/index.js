import { Grabber } from "./Grabber";
export async function loadExternalGrabInteraction(tsParticles) {
    await tsParticles.addInteractor("externalGrab", (container) => new Grabber(container));
}
