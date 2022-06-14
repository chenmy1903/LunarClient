import { PolygonDrawer } from "./PolygonDrawer";
import { TriangleDrawer } from "./TriangleDrawer";
export async function loadGenericPolygonShape(tsParticles) {
    await tsParticles.addShape("polygon", new PolygonDrawer());
}
export async function loadTriangleShape(tsParticles) {
    await tsParticles.addShape("triangle", new TriangleDrawer());
}
export async function loadPolygonShape(tsParticles) {
    await loadGenericPolygonShape(tsParticles);
    await loadTriangleShape(tsParticles);
}
