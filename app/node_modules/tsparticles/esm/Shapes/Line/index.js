import { LineDrawer } from "./LineDrawer";
export async function loadLineShape(tsParticles) {
    await tsParticles.addShape("line", new LineDrawer());
}
