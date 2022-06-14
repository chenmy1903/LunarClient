"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPolygonShape = exports.loadTriangleShape = exports.loadGenericPolygonShape = void 0;
const PolygonDrawer_1 = require("./PolygonDrawer");
const TriangleDrawer_1 = require("./TriangleDrawer");
async function loadGenericPolygonShape(tsParticles) {
    await tsParticles.addShape("polygon", new PolygonDrawer_1.PolygonDrawer());
}
exports.loadGenericPolygonShape = loadGenericPolygonShape;
async function loadTriangleShape(tsParticles) {
    await tsParticles.addShape("triangle", new TriangleDrawer_1.TriangleDrawer());
}
exports.loadTriangleShape = loadTriangleShape;
async function loadPolygonShape(tsParticles) {
    await loadGenericPolygonShape(tsParticles);
    await loadTriangleShape(tsParticles);
}
exports.loadPolygonShape = loadPolygonShape;
