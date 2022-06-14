"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollUpdater = void 0;
const Utils_1 = require("../../Utils");
const Enums_1 = require("../../Enums");
function updateRoll(particle, delta) {
    const roll = particle.options.roll;
    if (!particle.roll || !roll.enable) {
        return;
    }
    const speed = particle.roll.speed * delta.factor;
    const max = 2 * Math.PI;
    particle.roll.angle += speed;
    if (particle.roll.angle > max) {
        particle.roll.angle -= max;
    }
}
class RollUpdater {
    init(particle) {
        const rollOpt = particle.options.roll;
        if (rollOpt.enable) {
            particle.roll = {
                angle: Math.random() * Math.PI * 2,
                speed: (0, Utils_1.getRangeValue)(rollOpt.speed) / 360,
            };
            if (rollOpt.backColor) {
                particle.backColor = (0, Utils_1.colorToHsl)(rollOpt.backColor);
            }
            else if (rollOpt.darken.enable && rollOpt.enlighten.enable) {
                const alterType = Math.random() >= 0.5 ? Enums_1.AlterType.darken : Enums_1.AlterType.enlighten;
                particle.roll.alter = {
                    type: alterType,
                    value: alterType === Enums_1.AlterType.darken ? rollOpt.darken.value : rollOpt.enlighten.value,
                };
            }
            else if (rollOpt.darken.enable) {
                particle.roll.alter = {
                    type: Enums_1.AlterType.darken,
                    value: rollOpt.darken.value,
                };
            }
            else if (rollOpt.enlighten.enable) {
                particle.roll.alter = {
                    type: Enums_1.AlterType.enlighten,
                    value: rollOpt.enlighten.value,
                };
            }
        }
        else {
            particle.roll = { angle: 0, speed: 0 };
        }
    }
    isEnabled(particle) {
        const roll = particle.options.roll;
        return !particle.destroyed && !particle.spawning && roll.enable;
    }
    update(particle, delta) {
        if (!this.isEnabled(particle)) {
            return;
        }
        updateRoll(particle, delta);
    }
}
exports.RollUpdater = RollUpdater;
