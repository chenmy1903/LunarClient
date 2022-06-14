"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsorberInstance = void 0;
const Utils_1 = require("../../Utils");
const Vector_1 = require("../../Core/Particle/Vector");
const Enums_1 = require("../../Enums");
class AbsorberInstance {
    constructor(absorbers, container, options, position) {
        var _a, _b, _c, _d, _e;
        this.absorbers = absorbers;
        this.container = container;
        this.initialPosition = position ? Vector_1.Vector.create(position.x, position.y) : undefined;
        this.options = options;
        this.dragging = false;
        this.name = this.options.name;
        this.opacity = this.options.opacity;
        this.size = (0, Utils_1.getRangeValue)(options.size.value) * container.retina.pixelRatio;
        this.mass = this.size * options.size.density * container.retina.reduceFactor;
        const limit = options.size.limit;
        this.limit =
            typeof limit === "number"
                ? {
                    radius: limit * container.retina.pixelRatio * container.retina.reduceFactor,
                    mass: 0,
                }
                : {
                    radius: ((_a = limit === null || limit === void 0 ? void 0 : limit.radius) !== null && _a !== void 0 ? _a : 0) * container.retina.pixelRatio * container.retina.reduceFactor,
                    mass: (_b = limit === null || limit === void 0 ? void 0 : limit.mass) !== null && _b !== void 0 ? _b : 0,
                };
        const color = typeof options.color === "string" ? { value: options.color } : options.color;
        this.color = (_c = (0, Utils_1.colorToRgb)(color)) !== null && _c !== void 0 ? _c : {
            b: 0,
            g: 0,
            r: 0,
        };
        this.position = (_e = (_d = this.initialPosition) === null || _d === void 0 ? void 0 : _d.copy()) !== null && _e !== void 0 ? _e : this.calcPosition();
    }
    attract(particle) {
        const container = this.container;
        const options = this.options;
        if (options.draggable) {
            const mouse = container.interactivity.mouse;
            if (mouse.clicking && mouse.downPosition) {
                const mouseDist = (0, Utils_1.getDistance)(this.position, mouse.downPosition);
                if (mouseDist <= this.size) {
                    this.dragging = true;
                }
            }
            else {
                this.dragging = false;
            }
            if (this.dragging && mouse.position) {
                this.position.x = mouse.position.x;
                this.position.y = mouse.position.y;
            }
        }
        const pos = particle.getPosition();
        const { dx, dy, distance } = (0, Utils_1.getDistances)(this.position, pos);
        const v = Vector_1.Vector.create(dx, dy);
        v.length = (this.mass / Math.pow(distance, 2)) * container.retina.reduceFactor;
        if (distance < this.size + particle.getRadius()) {
            const sizeFactor = particle.getRadius() * 0.033 * container.retina.pixelRatio;
            if ((this.size > particle.getRadius() && distance < this.size - particle.getRadius()) ||
                (particle.absorberOrbit !== undefined && particle.absorberOrbit.length < 0)) {
                if (options.destroy) {
                    particle.destroy();
                }
                else {
                    particle.needsNewPosition = true;
                    this.updateParticlePosition(particle, v);
                }
            }
            else {
                if (options.destroy) {
                    particle.size.value -= sizeFactor;
                }
                this.updateParticlePosition(particle, v);
            }
            if (this.limit.radius <= 0 || this.size < this.limit.radius) {
                this.size += sizeFactor;
            }
            if (this.limit.mass <= 0 || this.mass < this.limit.mass) {
                this.mass += sizeFactor * this.options.size.density * container.retina.reduceFactor;
            }
        }
        else {
            this.updateParticlePosition(particle, v);
        }
    }
    resize() {
        const initialPosition = this.initialPosition;
        this.position =
            initialPosition && (0, Utils_1.isPointInside)(initialPosition, this.container.canvas.size)
                ? initialPosition
                : this.calcPosition();
    }
    draw(context) {
        context.translate(this.position.x, this.position.y);
        context.beginPath();
        context.arc(0, 0, this.size, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle = (0, Utils_1.getStyleFromRgb)(this.color, this.opacity);
        context.fill();
    }
    calcPosition() {
        var _a, _b;
        const container = this.container;
        const percentPosition = this.options.position;
        return Vector_1.Vector.create((((_a = percentPosition === null || percentPosition === void 0 ? void 0 : percentPosition.x) !== null && _a !== void 0 ? _a : Math.random() * 100) / 100) * container.canvas.size.width, (((_b = percentPosition === null || percentPosition === void 0 ? void 0 : percentPosition.y) !== null && _b !== void 0 ? _b : Math.random() * 100) / 100) * container.canvas.size.height);
    }
    updateParticlePosition(particle, v) {
        var _a;
        if (particle.destroyed) {
            return;
        }
        const container = this.container;
        const canvasSize = container.canvas.size;
        if (particle.needsNewPosition) {
            particle.position.x = Math.floor(Math.random() * canvasSize.width);
            particle.position.y = Math.floor(Math.random() * canvasSize.height);
            particle.velocity.setTo(particle.initialVelocity);
            particle.absorberOrbit = undefined;
            particle.needsNewPosition = false;
        }
        if (this.options.orbits) {
            if (particle.absorberOrbit === undefined) {
                particle.absorberOrbit = Vector_1.Vector.create(0, 0);
                particle.absorberOrbit.length = (0, Utils_1.getDistance)(particle.getPosition(), this.position);
                particle.absorberOrbit.angle = Math.random() * Math.PI * 2;
            }
            if (particle.absorberOrbit.length <= this.size && !this.options.destroy) {
                const minSize = Math.min(canvasSize.width, canvasSize.height);
                particle.absorberOrbit.length = minSize * (1 + (Math.random() * 0.2 - 0.1));
            }
            if (particle.absorberOrbitDirection === undefined) {
                particle.absorberOrbitDirection =
                    particle.velocity.x >= 0 ? Enums_1.RotateDirection.clockwise : Enums_1.RotateDirection.counterClockwise;
            }
            const orbitRadius = particle.absorberOrbit.length;
            const orbitAngle = particle.absorberOrbit.angle;
            const orbitDirection = particle.absorberOrbitDirection;
            particle.velocity.x = 0;
            particle.velocity.y = 0;
            const updateFunc = {
                x: orbitDirection === Enums_1.RotateDirection.clockwise ? Math.cos : Math.sin,
                y: orbitDirection === Enums_1.RotateDirection.clockwise ? Math.sin : Math.cos,
            };
            particle.position.x = this.position.x + orbitRadius * updateFunc.x(orbitAngle);
            particle.position.y = this.position.y + orbitRadius * updateFunc.y(orbitAngle);
            particle.absorberOrbit.length -= v.length;
            particle.absorberOrbit.angle +=
                ((((_a = particle.retina.moveSpeed) !== null && _a !== void 0 ? _a : 0) * container.retina.pixelRatio) / 100) *
                    container.retina.reduceFactor;
        }
        else {
            const addV = Vector_1.Vector.origin;
            addV.length = v.length;
            addV.angle = v.angle;
            particle.velocity.addTo(addV);
        }
    }
}
exports.AbsorberInstance = AbsorberInstance;
