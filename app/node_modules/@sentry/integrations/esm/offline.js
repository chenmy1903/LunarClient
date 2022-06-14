import { __awaiter, __generator } from "tslib";
import { getGlobalObject, logger, normalize, uuid4 } from '@sentry/utils';
import localForage from 'localforage';
/**
 * cache offline errors and send when connected
 */
var Offline = /** @class */ (function () {
    /**
     * @inheritDoc
     */
    function Offline(options) {
        if (options === void 0) { options = {}; }
        /**
         * @inheritDoc
         */
        this.name = Offline.id;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.global = getGlobalObject();
        this.maxStoredEvents = options.maxStoredEvents || 30; // set a reasonable default
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        this.offlineEventStore = localForage.createInstance({
            name: 'sentry/offlineEventStore',
        });
    }
    /**
     * @inheritDoc
     */
    Offline.prototype.setupOnce = function (addGlobalEventProcessor, getCurrentHub) {
        var _this = this;
        this.hub = getCurrentHub();
        if ('addEventListener' in this.global) {
            this.global.addEventListener('online', function () {
                void _this._sendEvents().catch(function () {
                    logger.warn('could not send cached events');
                });
            });
        }
        addGlobalEventProcessor(function (event) {
            if (_this.hub && _this.hub.getIntegration(Offline)) {
                // cache if we are positively offline
                if ('navigator' in _this.global && 'onLine' in _this.global.navigator && !_this.global.navigator.onLine) {
                    void _this._cacheEvent(event)
                        .then(function (_event) { return _this._enforceMaxEvents(); })
                        .catch(function (_error) {
                        logger.warn('could not cache event while offline');
                    });
                    // return null on success or failure, because being offline will still result in an error
                    return null;
                }
            }
            return event;
        });
        // if online now, send any events stored in a previous offline session
        if ('navigator' in this.global && 'onLine' in this.global.navigator && this.global.navigator.onLine) {
            void this._sendEvents().catch(function () {
                logger.warn('could not send cached events');
            });
        }
    };
    /**
     * cache an event to send later
     * @param event an event
     */
    Offline.prototype._cacheEvent = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.offlineEventStore.setItem(uuid4(), normalize(event))];
            });
        });
    };
    /**
     * purge excess events if necessary
     */
    Offline.prototype._enforceMaxEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var events;
            var _this = this;
            return __generator(this, function (_a) {
                events = [];
                return [2 /*return*/, this.offlineEventStore
                        .iterate(function (event, cacheKey, _index) {
                        // aggregate events
                        events.push({ cacheKey: cacheKey, event: event });
                    })
                        .then(function () {
                        // this promise resolves when the iteration is finished
                        return _this._purgeEvents(
                        // purge all events past maxStoredEvents in reverse chronological order
                        events
                            .sort(function (a, b) { return (b.event.timestamp || 0) - (a.event.timestamp || 0); })
                            .slice(_this.maxStoredEvents < events.length ? _this.maxStoredEvents : events.length)
                            .map(function (event) { return event.cacheKey; }));
                    })
                        .catch(function (_error) {
                        logger.warn('could not enforce max events');
                    })];
            });
        });
    };
    /**
     * purge event from cache
     */
    Offline.prototype._purgeEvent = function (cacheKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.offlineEventStore.removeItem(cacheKey)];
            });
        });
    };
    /**
     * purge events from cache
     */
    Offline.prototype._purgeEvents = function (cacheKeys) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // trail with .then to ensure the return type as void and not void|void[]
                return [2 /*return*/, Promise.all(cacheKeys.map(function (cacheKey) { return _this._purgeEvent(cacheKey); })).then()];
            });
        });
    };
    /**
     * send all events
     */
    Offline.prototype._sendEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.offlineEventStore.iterate(function (event, cacheKey, _index) {
                        if (_this.hub) {
                            _this.hub.captureEvent(event);
                            void _this._purgeEvent(cacheKey).catch(function (_error) {
                                logger.warn('could not purge event from cache');
                            });
                        }
                        else {
                            logger.warn('no hub found - could not send cached event');
                        }
                    })];
            });
        });
    };
    /**
     * @inheritDoc
     */
    Offline.id = 'Offline';
    return Offline;
}());
export { Offline };
//# sourceMappingURL=offline.js.map