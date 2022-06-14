var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _EmitterInstance_firstSpawn, _EmitterInstance_startParticlesAdded;
import { colorToHsl, deepExtend, getRangeValue, isPointInside, randomInRange } from "../../Utils";
import { SizeMode } from "../../Enums";
import { EmitterSize } from "./Options/Classes/EmitterSize";
import { ShapeManager } from "./ShapeManager";
/**
 * @category Emitters Plugin
 */
export class EmitterInstance {
    constructor(emitters, container, emitterOptions, position) {
        var _a, _b, _c, _d, _e, _f;
        var _g;
        this.emitters = emitters;
        this.container = container;
        _EmitterInstance_firstSpawn.set(this, void 0);
        _EmitterInstance_startParticlesAdded.set(this, void 0);
        this.currentDuration = 0;
        this.currentEmitDelay = 0;
        this.currentSpawnDelay = 0;
        this.initialPosition = position;
        this.emitterOptions = deepExtend({}, emitterOptions);
        this.spawnDelay = (((_a = this.emitterOptions.life.delay) !== null && _a !== void 0 ? _a : 0) * 1000) / this.container.retina.reduceFactor;
        this.position = (_b = this.initialPosition) !== null && _b !== void 0 ? _b : this.calcPosition();
        this.name = emitterOptions.name;
        this.shape = ShapeManager.getShape(emitterOptions.shape);
        this.fill = emitterOptions.fill;
        __classPrivateFieldSet(this, _EmitterInstance_firstSpawn, !this.emitterOptions.life.wait, "f");
        __classPrivateFieldSet(this, _EmitterInstance_startParticlesAdded, false, "f");
        let particlesOptions = deepExtend({}, this.emitterOptions.particles);
        particlesOptions !== null && particlesOptions !== void 0 ? particlesOptions : (particlesOptions = {});
        (_c = particlesOptions.move) !== null && _c !== void 0 ? _c : (particlesOptions.move = {});
        (_d = (_g = particlesOptions.move).direction) !== null && _d !== void 0 ? _d : (_g.direction = this.emitterOptions.direction);
        if (this.emitterOptions.spawnColor !== undefined) {
            this.spawnColor = colorToHsl(this.emitterOptions.spawnColor);
        }
        this.paused = !this.emitterOptions.autoPlay;
        this.particlesOptions = particlesOptions;
        this.size =
            (_e = this.emitterOptions.size) !== null && _e !== void 0 ? _e : (() => {
                const size = new EmitterSize();
                size.load({
                    height: 0,
                    mode: SizeMode.percent,
                    width: 0,
                });
                return size;
            })();
        this.lifeCount = (_f = this.emitterOptions.life.count) !== null && _f !== void 0 ? _f : -1;
        this.immortal = this.lifeCount <= 0;
        this.play();
    }
    externalPlay() {
        this.paused = false;
        this.play();
    }
    externalPause() {
        this.paused = true;
        this.pause();
    }
    play() {
        var _a;
        if (this.paused) {
            return;
        }
        if (this.container.retina.reduceFactor &&
            (this.lifeCount > 0 || this.immortal || !this.emitterOptions.life.count) &&
            (__classPrivateFieldGet(this, _EmitterInstance_firstSpawn, "f") || this.currentSpawnDelay >= ((_a = this.spawnDelay) !== null && _a !== void 0 ? _a : 0))) {
            if (this.emitDelay === undefined) {
                const delay = getRangeValue(this.emitterOptions.rate.delay);
                this.emitDelay = (1000 * delay) / this.container.retina.reduceFactor;
            }
            if (this.lifeCount > 0 || this.immortal) {
                this.prepareToDie();
            }
        }
    }
    pause() {
        if (this.paused) {
            return;
        }
        delete this.emitDelay;
    }
    resize() {
        const initialPosition = this.initialPosition;
        this.position =
            initialPosition && isPointInside(initialPosition, this.container.canvas.size)
                ? initialPosition
                : this.calcPosition();
    }
    update(delta) {
        var _a, _b, _c;
        if (this.paused) {
            return;
        }
        if (__classPrivateFieldGet(this, _EmitterInstance_firstSpawn, "f")) {
            __classPrivateFieldSet(this, _EmitterInstance_firstSpawn, false, "f");
            this.currentSpawnDelay = (_a = this.spawnDelay) !== null && _a !== void 0 ? _a : 0;
            this.currentEmitDelay = (_b = this.emitDelay) !== null && _b !== void 0 ? _b : 0;
        }
        if (!__classPrivateFieldGet(this, _EmitterInstance_startParticlesAdded, "f")) {
            __classPrivateFieldSet(this, _EmitterInstance_startParticlesAdded, true, "f");
            this.emitParticles(this.emitterOptions.startCount);
        }
        if (this.duration !== undefined) {
            this.currentDuration += delta.value;
            if (this.currentDuration >= this.duration) {
                this.pause();
                if (this.spawnDelay !== undefined) {
                    delete this.spawnDelay;
                }
                if (!this.immortal) {
                    this.lifeCount--;
                }
                if (this.lifeCount > 0 || this.immortal) {
                    this.position = this.calcPosition();
                    this.spawnDelay =
                        (((_c = this.emitterOptions.life.delay) !== null && _c !== void 0 ? _c : 0) * 1000) / this.container.retina.reduceFactor;
                }
                else {
                    this.destroy();
                }
                this.currentDuration -= this.duration;
                delete this.duration;
            }
        }
        if (this.spawnDelay !== undefined) {
            this.currentSpawnDelay += delta.value;
            if (this.currentSpawnDelay >= this.spawnDelay) {
                this.play();
                this.currentSpawnDelay -= this.currentSpawnDelay;
                delete this.spawnDelay;
            }
        }
        if (this.emitDelay !== undefined) {
            this.currentEmitDelay += delta.value;
            if (this.currentEmitDelay >= this.emitDelay) {
                this.emit();
                this.currentEmitDelay -= this.emitDelay;
            }
        }
    }
    prepareToDie() {
        var _a;
        if (this.paused) {
            return;
        }
        const duration = (_a = this.emitterOptions.life) === null || _a === void 0 ? void 0 : _a.duration;
        if (this.container.retina.reduceFactor &&
            (this.lifeCount > 0 || this.immortal) &&
            duration !== undefined &&
            duration > 0) {
            this.duration = duration * 1000;
        }
    }
    destroy() {
        this.emitters.removeEmitter(this);
    }
    calcPosition() {
        var _a, _b;
        const container = this.container;
        const percentPosition = this.emitterOptions.position;
        return {
            x: (((_a = percentPosition === null || percentPosition === void 0 ? void 0 : percentPosition.x) !== null && _a !== void 0 ? _a : Math.random() * 100) / 100) * container.canvas.size.width,
            y: (((_b = percentPosition === null || percentPosition === void 0 ? void 0 : percentPosition.y) !== null && _b !== void 0 ? _b : Math.random() * 100) / 100) * container.canvas.size.height,
        };
    }
    emit() {
        if (this.paused) {
            return;
        }
        const quantity = getRangeValue(this.emitterOptions.rate.quantity);
        this.emitParticles(quantity);
    }
    emitParticles(quantity) {
        var _a, _b, _c;
        const container = this.container;
        const position = this.position;
        const offset = {
            x: this.size.mode === SizeMode.percent
                ? (container.canvas.size.width * this.size.width) / 100
                : this.size.width,
            y: this.size.mode === SizeMode.percent
                ? (container.canvas.size.height * this.size.height) / 100
                : this.size.height,
        };
        for (let i = 0; i < quantity; i++) {
            const particlesOptions = deepExtend({}, this.particlesOptions);
            if (this.spawnColor) {
                const colorAnimation = (_a = this.emitterOptions.spawnColor) === null || _a === void 0 ? void 0 : _a.animation;
                if (colorAnimation) {
                    const hueAnimation = colorAnimation;
                    if (hueAnimation.enable) {
                        this.spawnColor.h = this.setColorAnimation(hueAnimation, this.spawnColor.h, 360);
                    }
                    else {
                        const hslAnimation = colorAnimation;
                        this.spawnColor.h = this.setColorAnimation(hslAnimation.h, this.spawnColor.h, 360);
                        this.spawnColor.s = this.setColorAnimation(hslAnimation.s, this.spawnColor.s, 100);
                        this.spawnColor.l = this.setColorAnimation(hslAnimation.l, this.spawnColor.l, 100);
                    }
                }
                if (!particlesOptions.color) {
                    particlesOptions.color = {
                        value: this.spawnColor,
                    };
                }
                else {
                    particlesOptions.color.value = this.spawnColor;
                }
            }
            const pPosition = (_c = (_b = this.shape) === null || _b === void 0 ? void 0 : _b.randomPosition(position, offset, this.fill)) !== null && _c !== void 0 ? _c : position;
            container.particles.addParticle(pPosition, particlesOptions);
        }
    }
    setColorAnimation(animation, initValue, maxValue) {
        var _a;
        const container = this.container;
        if (!animation.enable) {
            return initValue;
        }
        const colorOffset = randomInRange(animation.offset);
        const delay = getRangeValue(this.emitterOptions.rate.delay);
        const emitFactor = (1000 * delay) / container.retina.reduceFactor;
        const colorSpeed = (_a = animation.speed) !== null && _a !== void 0 ? _a : 0;
        return (initValue + (colorSpeed * container.fpsLimit) / emitFactor + colorOffset * 3.6) % maxValue;
    }
}
_EmitterInstance_firstSpawn = new WeakMap(), _EmitterInstance_startParticlesAdded = new WeakMap();
