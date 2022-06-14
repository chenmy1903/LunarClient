/**
 * @category Core
 */
export class FrameManager {
    constructor(container) {
        this.container = container;
    }
    /**
     * Handles the rAF method preparing the next animation frame to be drawn
     * limiting it if it's needed by the current configuration
     * @param timestamp
     */
    nextFrame(timestamp) {
        var _a;
        try {
            const container = this.container;
            // FPS limit logic - if we are too fast, just draw without updating
            if (container.lastFrameTime !== undefined &&
                timestamp < container.lastFrameTime + 1000 / container.fpsLimit) {
                container.draw(false);
                return;
            }
            (_a = container.lastFrameTime) !== null && _a !== void 0 ? _a : (container.lastFrameTime = timestamp);
            const deltaValue = timestamp - container.lastFrameTime;
            const delta = {
                value: deltaValue,
                factor: (60 * deltaValue) / 1000,
            };
            container.lifeTime += delta.value;
            container.lastFrameTime = timestamp;
            if (deltaValue > 1000) {
                container.draw(false);
                return;
            }
            container.particles.draw(delta);
            if (container.duration > 0 && container.lifeTime > container.duration) {
                container.destroy();
                return;
            }
            if (container.getAnimationStatus()) {
                container.draw(false);
            }
        }
        catch (e) {
            console.error("tsParticles error in animation loop", e);
        }
    }
}
