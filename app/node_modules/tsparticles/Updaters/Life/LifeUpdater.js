"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifeUpdater = void 0;
const Utils_1 = require("../../Utils");
class LifeUpdater {
    constructor(container) {
        this.container = container;
    }
    init() {
    }
    isEnabled(particle) {
        return !particle.destroyed;
    }
    update(particle, delta) {
        if (!this.isEnabled(particle)) {
            return;
        }
        const life = particle.life;
        let justSpawned = false;
        if (particle.spawning) {
            life.delayTime += delta.value;
            if (life.delayTime >= particle.life.delay) {
                justSpawned = true;
                particle.spawning = false;
                life.delayTime = 0;
                life.time = 0;
            }
            else {
                return;
            }
        }
        if (life.duration === -1) {
            return;
        }
        if (particle.spawning) {
            return;
        }
        if (justSpawned) {
            life.time = 0;
        }
        else {
            life.time += delta.value;
        }
        if (life.time < life.duration) {
            return;
        }
        life.time = 0;
        if (particle.life.count > 0) {
            particle.life.count--;
        }
        if (particle.life.count === 0) {
            particle.destroy();
            return;
        }
        const canvasSize = this.container.canvas.size, widthRange = (0, Utils_1.setRangeValue)(0, canvasSize.width), heightRange = (0, Utils_1.setRangeValue)(0, canvasSize.width);
        particle.position.x = (0, Utils_1.randomInRange)(widthRange);
        particle.position.y = (0, Utils_1.randomInRange)(heightRange);
        particle.spawning = true;
        life.delayTime = 0;
        life.time = 0;
        particle.reset();
        const lifeOptions = particle.options.life;
        life.delay = (0, Utils_1.getRangeValue)(lifeOptions.delay.value) * 1000;
        life.duration = (0, Utils_1.getRangeValue)(lifeOptions.duration.value) * 1000;
    }
}
exports.LifeUpdater = LifeUpdater;
