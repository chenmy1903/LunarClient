import { colorToRgb, drawLinkLine, drawLinkTriangle, getDistance, getLinkColor } from "../../../Utils";
export class LinkInstance {
    constructor(container) {
        this.container = container;
    }
    particleCreated(particle) {
        const linkParticle = particle;
        linkParticle.links = [];
    }
    particleDestroyed(particle) {
        const linkParticle = particle;
        linkParticle.links = [];
    }
    drawParticle(context, particle) {
        const linkParticle = particle;
        const container = this.container;
        const particles = container.particles;
        const pOptions = particle.options;
        if (linkParticle.links.length > 0) {
            context.save();
            const p1Links = linkParticle.links.filter((l) => {
                const linkFreq = container.particles.getLinkFrequency(linkParticle, l.destination);
                return linkFreq <= pOptions.links.frequency;
            });
            for (const link of p1Links) {
                const p2 = link.destination;
                if (pOptions.links.triangles.enable) {
                    const links = p1Links.map((l) => l.destination);
                    const vertices = p2.links.filter((t) => {
                        const linkFreq = container.particles.getLinkFrequency(p2, t.destination);
                        return linkFreq <= p2.options.links.frequency && links.indexOf(t.destination) >= 0;
                    });
                    if (vertices.length) {
                        for (const vertex of vertices) {
                            const p3 = vertex.destination;
                            const triangleFreq = particles.getTriangleFrequency(linkParticle, p2, p3);
                            if (triangleFreq > pOptions.links.triangles.frequency) {
                                continue;
                            }
                            this.drawLinkTriangle(linkParticle, link, vertex);
                        }
                    }
                }
                if (link.opacity > 0 && container.retina.linksWidth > 0) {
                    this.drawLinkLine(linkParticle, link);
                }
            }
            context.restore();
        }
    }
    drawLinkTriangle(p1, link1, link2) {
        var _a;
        const container = this.container;
        const options = container.actualOptions;
        const p2 = link1.destination;
        const p3 = link2.destination;
        const triangleOptions = p1.options.links.triangles;
        const opacityTriangle = (_a = triangleOptions.opacity) !== null && _a !== void 0 ? _a : (link1.opacity + link2.opacity) / 2;
        if (opacityTriangle <= 0) {
            return;
        }
        const pos1 = p1.getPosition();
        const pos2 = p2.getPosition();
        const pos3 = p3.getPosition();
        container.canvas.draw((ctx) => {
            if (getDistance(pos1, pos2) > container.retina.linksDistance ||
                getDistance(pos3, pos2) > container.retina.linksDistance ||
                getDistance(pos3, pos1) > container.retina.linksDistance) {
                return;
            }
            let colorTriangle = colorToRgb(triangleOptions.color);
            if (!colorTriangle) {
                const linksOptions = p1.options.links;
                const linkColor = linksOptions.id !== undefined
                    ? container.particles.linksColors.get(linksOptions.id)
                    : container.particles.linksColor;
                colorTriangle = getLinkColor(p1, p2, linkColor);
            }
            if (!colorTriangle) {
                return;
            }
            drawLinkTriangle(ctx, pos1, pos2, pos3, options.backgroundMask.enable, options.backgroundMask.composite, colorTriangle, opacityTriangle);
        });
    }
    drawLinkLine(p1, link) {
        const container = this.container;
        const options = container.actualOptions;
        const p2 = link.destination;
        let opacity = link.opacity;
        const pos1 = p1.getPosition();
        const pos2 = p2.getPosition();
        container.canvas.draw((ctx) => {
            var _a, _b;
            let colorLine;
            const twinkle = p1.options.twinkle.lines;
            if (twinkle.enable) {
                const twinkleFreq = twinkle.frequency;
                const twinkleRgb = colorToRgb(twinkle.color);
                const twinkling = Math.random() < twinkleFreq;
                if (twinkling && twinkleRgb !== undefined) {
                    colorLine = twinkleRgb;
                    opacity = twinkle.opacity;
                }
            }
            if (!colorLine) {
                const linksOptions = p1.options.links;
                const linkColor = linksOptions.id !== undefined
                    ? container.particles.linksColors.get(linksOptions.id)
                    : container.particles.linksColor;
                colorLine = getLinkColor(p1, p2, linkColor);
            }
            if (!colorLine) {
                return;
            }
            const width = (_a = p1.retina.linksWidth) !== null && _a !== void 0 ? _a : container.retina.linksWidth;
            const maxDistance = (_b = p1.retina.linksDistance) !== null && _b !== void 0 ? _b : container.retina.linksDistance;
            drawLinkLine(ctx, width, pos1, pos2, maxDistance, container.canvas.size, p1.options.links.warp, options.backgroundMask.enable, options.backgroundMask.composite, colorLine, opacity, p1.options.links.shadow);
        });
    }
}
