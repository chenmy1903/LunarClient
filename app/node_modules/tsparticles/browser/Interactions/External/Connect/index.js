import { Connector } from "./Connector";
export async function loadExternalConnectInteraction(tsParticles) {
    await tsParticles.addInteractor("externalConnect", (container) => new Connector(container));
}
