import { StarDrawer } from "./StarDrawer";
export async function loadStarShape(tsParticles) {
    await tsParticles.addShape("star", new StarDrawer());
}
