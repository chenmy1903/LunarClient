import { SquareDrawer } from "./SquareDrawer";
export async function loadSquareShape(tsParticles) {
    const drawer = new SquareDrawer();
    await tsParticles.addShape("edge", drawer);
    await tsParticles.addShape("square", drawer);
}
