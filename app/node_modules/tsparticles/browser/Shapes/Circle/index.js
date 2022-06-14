import { CircleDrawer } from "./CircleDrawer";
export async function loadCircleShape(tsParticles) {
    await tsParticles.addShape("circle", new CircleDrawer());
}
