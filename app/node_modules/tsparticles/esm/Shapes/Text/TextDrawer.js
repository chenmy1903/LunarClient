import { isInArray, itemFromArray, loadFont } from "../../Utils";
export const validTypes = ["text", "character", "char"];
export class TextDrawer {
    getSidesCount() {
        return 12;
    }
    async init(container) {
        const options = container.actualOptions;
        if (validTypes.find((t) => isInArray(t, options.particles.shape.type))) {
            const shapeOptions = validTypes.map((t) => options.particles.shape.options[t]).find((t) => !!t);
            if (shapeOptions instanceof Array) {
                const promises = [];
                for (const character of shapeOptions) {
                    promises.push(loadFont(character));
                }
                await Promise.allSettled(promises);
            }
            else {
                if (shapeOptions !== undefined) {
                    await loadFont(shapeOptions);
                }
            }
        }
    }
    draw(context, particle, radius, opacity) {
        var _a, _b, _c;
        const character = particle.shapeData;
        if (character === undefined) {
            return;
        }
        const textData = character.value;
        if (textData === undefined) {
            return;
        }
        const textParticle = particle;
        if (textParticle.text === undefined) {
            textParticle.text =
                textData instanceof Array ? itemFromArray(textData, particle.randomIndexData) : textData;
        }
        const text = textParticle.text;
        const style = (_a = character.style) !== null && _a !== void 0 ? _a : "";
        const weight = (_b = character.weight) !== null && _b !== void 0 ? _b : "400";
        const size = Math.round(radius) * 2;
        const font = (_c = character.font) !== null && _c !== void 0 ? _c : "Verdana";
        const fill = particle.fill;
        const offsetX = (text.length * radius) / 2;
        context.font = `${style} ${weight} ${size}px "${font}"`;
        const pos = {
            x: -offsetX,
            y: radius / 2,
        };
        context.globalAlpha = opacity;
        if (fill) {
            context.fillText(text, pos.x, pos.y);
        }
        else {
            context.strokeText(text, pos.x, pos.y);
        }
        context.globalAlpha = 1;
    }
}
