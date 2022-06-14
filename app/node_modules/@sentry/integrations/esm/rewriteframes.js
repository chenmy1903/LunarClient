import { __assign } from "tslib";
import { basename, relative } from '@sentry/utils';
/** Rewrite event frames paths */
var RewriteFrames = /** @class */ (function () {
    /**
     * @inheritDoc
     */
    function RewriteFrames(options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        /**
         * @inheritDoc
         */
        this.name = RewriteFrames.id;
        /**
         * @inheritDoc
         */
        this._prefix = 'app:///';
        /**
         * @inheritDoc
         */
        this._iteratee = function (frame) {
            if (!frame.filename) {
                return frame;
            }
            // Check if the frame filename begins with `/` or a Windows-style prefix such as `C:\`
            var isWindowsFrame = /^[A-Z]:\\/.test(frame.filename);
            var startsWithSlash = /^\//.test(frame.filename);
            if (isWindowsFrame || startsWithSlash) {
                var filename = isWindowsFrame
                    ? frame.filename
                        .replace(/^[A-Z]:/, '') // remove Windows-style prefix
                        .replace(/\\/g, '/') // replace all `\\` instances with `/`
                    : frame.filename;
                var base = _this._root ? relative(_this._root, filename) : basename(filename);
                frame.filename = "" + _this._prefix + base;
            }
            return frame;
        };
        if (options.root) {
            this._root = options.root;
        }
        if (options.prefix) {
            this._prefix = options.prefix;
        }
        if (options.iteratee) {
            this._iteratee = options.iteratee;
        }
    }
    /**
     * @inheritDoc
     */
    RewriteFrames.prototype.setupOnce = function (addGlobalEventProcessor, getCurrentHub) {
        addGlobalEventProcessor(function (event) {
            var self = getCurrentHub().getIntegration(RewriteFrames);
            if (self) {
                return self.process(event);
            }
            return event;
        });
    };
    /** JSDoc */
    RewriteFrames.prototype.process = function (originalEvent) {
        var processedEvent = originalEvent;
        if (originalEvent.exception && Array.isArray(originalEvent.exception.values)) {
            processedEvent = this._processExceptionsEvent(processedEvent);
        }
        if (originalEvent.stacktrace) {
            processedEvent = this._processStacktraceEvent(processedEvent);
        }
        return processedEvent;
    };
    /** JSDoc */
    RewriteFrames.prototype._processExceptionsEvent = function (event) {
        var _this = this;
        try {
            return __assign(__assign({}, event), { exception: __assign(__assign({}, event.exception), { 
                    // The check for this is performed inside `process` call itself, safe to skip here
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    values: event.exception.values.map(function (value) { return (__assign(__assign({}, value), { stacktrace: _this._processStacktrace(value.stacktrace) })); }) }) });
        }
        catch (_oO) {
            return event;
        }
    };
    /** JSDoc */
    RewriteFrames.prototype._processStacktraceEvent = function (event) {
        try {
            return __assign(__assign({}, event), { stacktrace: this._processStacktrace(event.stacktrace) });
        }
        catch (_oO) {
            return event;
        }
    };
    /** JSDoc */
    RewriteFrames.prototype._processStacktrace = function (stacktrace) {
        var _this = this;
        return __assign(__assign({}, stacktrace), { frames: stacktrace && stacktrace.frames && stacktrace.frames.map(function (f) { return _this._iteratee(f); }) });
    };
    /**
     * @inheritDoc
     */
    RewriteFrames.id = 'RewriteFrames';
    return RewriteFrames;
}());
export { RewriteFrames };
//# sourceMappingURL=rewriteframes.js.map