import { ImageDrawer } from "./ImageDrawer";
export async function loadImageShape(tsParticles) {
    const imageDrawer = new ImageDrawer();
    await tsParticles.addShape("image", imageDrawer);
    await tsParticles.addShape("images", imageDrawer);
}
