"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.segmentBounce = exports.calcClosestPtOnSegment = exports.parsePaths = exports.drawPolygonMaskPath = exports.drawPolygonMask = void 0;
const Utils_1 = require("../../Utils");
function drawPolygonMask(context, rawData, stroke) {
    const color = (0, Utils_1.colorToRgb)(stroke.color);
    if (!color) {
        return;
    }
    context.beginPath();
    context.moveTo(rawData[0].x, rawData[0].y);
    for (const item of rawData) {
        context.lineTo(item.x, item.y);
    }
    context.closePath();
    context.strokeStyle = (0, Utils_1.getStyleFromRgb)(color);
    context.lineWidth = stroke.width;
    context.stroke();
}
exports.drawPolygonMask = drawPolygonMask;
function drawPolygonMaskPath(context, path, stroke, position) {
    context.translate(position.x, position.y);
    const color = (0, Utils_1.colorToRgb)(stroke.color);
    if (!color) {
        return;
    }
    context.strokeStyle = (0, Utils_1.getStyleFromRgb)(color, stroke.opacity);
    context.lineWidth = stroke.width;
    context.stroke(path);
}
exports.drawPolygonMaskPath = drawPolygonMaskPath;
function parsePaths(paths, scale, offset) {
    var _a;
    const res = [];
    for (const path of paths) {
        const segments = path.element.pathSegList;
        const len = (_a = segments === null || segments === void 0 ? void 0 : segments.numberOfItems) !== null && _a !== void 0 ? _a : 0;
        const p = {
            x: 0,
            y: 0,
        };
        for (let i = 0; i < len; i++) {
            const segment = segments === null || segments === void 0 ? void 0 : segments.getItem(i);
            const svgPathSeg = window.SVGPathSeg;
            switch (segment === null || segment === void 0 ? void 0 : segment.pathSegType) {
                case svgPathSeg.PATHSEG_MOVETO_ABS:
                case svgPathSeg.PATHSEG_LINETO_ABS:
                case svgPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
                case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
                case svgPathSeg.PATHSEG_ARC_ABS:
                case svgPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
                case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS: {
                    const absSeg = segment;
                    p.x = absSeg.x;
                    p.y = absSeg.y;
                    break;
                }
                case svgPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
                    p.x = segment.x;
                    break;
                case svgPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
                    p.y = segment.y;
                    break;
                case svgPathSeg.PATHSEG_LINETO_REL:
                case svgPathSeg.PATHSEG_MOVETO_REL:
                case svgPathSeg.PATHSEG_CURVETO_CUBIC_REL:
                case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
                case svgPathSeg.PATHSEG_ARC_REL:
                case svgPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
                case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL: {
                    const relSeg = segment;
                    p.x += relSeg.x;
                    p.y += relSeg.y;
                    break;
                }
                case svgPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
                    p.x += segment.x;
                    break;
                case svgPathSeg.PATHSEG_LINETO_VERTICAL_REL:
                    p.y += segment.y;
                    break;
                case svgPathSeg.PATHSEG_UNKNOWN:
                case svgPathSeg.PATHSEG_CLOSEPATH:
                    continue;
            }
            res.push({
                x: p.x * scale + offset.x,
                y: p.y * scale + offset.y,
            });
        }
    }
    return res;
}
exports.parsePaths = parsePaths;
function calcClosestPtOnSegment(s1, s2, pos) {
    const { dx, dy } = (0, Utils_1.getDistances)(pos, s1);
    const { dx: dxx, dy: dyy } = (0, Utils_1.getDistances)(s2, s1);
    const t = (dx * dxx + dy * dyy) / (dxx ** 2 + dyy ** 2);
    let x = s1.x + dxx * t;
    let y = s1.y + dyy * t;
    if (t < 0) {
        x = s1.x;
        y = s1.y;
    }
    else if (t > 1) {
        x = s2.x;
        y = s2.y;
    }
    return { x: x, y: y, isOnSegment: t >= 0 && t <= 1 };
}
exports.calcClosestPtOnSegment = calcClosestPtOnSegment;
function segmentBounce(start, stop, velocity) {
    const { dx, dy } = (0, Utils_1.getDistances)(start, stop);
    const wallAngle = Math.atan2(dy, dx);
    const wallNormalX = Math.sin(wallAngle);
    const wallNormalY = -Math.cos(wallAngle);
    const d = 2 * (velocity.x * wallNormalX + velocity.y * wallNormalY);
    velocity.x -= d * wallNormalX;
    velocity.y -= d * wallNormalY;
}
exports.segmentBounce = segmentBounce;
