import { validTypes, TextDrawer } from "./TextDrawer";
export async function loadTextShape(tsParticles) {
    const drawer = new TextDrawer();
    for (const type of validTypes) {
        await tsParticles.addShape(type, drawer);
    }
}
