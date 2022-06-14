require("source-map-support/source-map-support.js").install(), (module.exports = (function(
  e
) {
  var t = {};
  function __webpack_require__(r) {
    if (t[r]) return t[r].exports;
    var o = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(
      o.exports,
      o,
      o.exports,
      __webpack_require__
    ), (o.l = !0), o.exports;
  }
  return (__webpack_require__.m = e), (__webpack_require__.c = t), (__webpack_require__.d = function(
    e,
    t,
    r
  ) {
    __webpack_require__.o(e, t) ||
      Object.defineProperty(e, t, { enumerable: !0, get: r });
  }), (__webpack_require__.r = function(e) {
    "undefined" != typeof Symbol &&
      Symbol.toStringTag &&
      Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", { value: !0 });
  }), (__webpack_require__.t = function(e, t) {
    if ((1 & t && (e = __webpack_require__(e)), 8 & t)) return e;
    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
    var r = Object.create(null);
    if (
      (
        __webpack_require__.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e
      )
    )
      for (var o in e)
        __webpack_require__.d(
          r,
          o,
          function(t) {
            return e[t];
          }.bind(null, o)
        );
    return r;
  }), (__webpack_require__.n = function(e) {
    var t =
      e && e.__esModule
        ? function getDefault() {
            return e.default;
          }
        : function getModuleExports() {
            return e;
          };
    return __webpack_require__.d(t, "a", t), t;
  }), (__webpack_require__.o = function(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }), (__webpack_require__.p = ""), __webpack_require__(
    (__webpack_require__.s = 9)
  );
})([
  function(e, t) {
    e.exports = require("electron-log");
  },
  function(e, t) {
    e.exports = require("electron");
  },
  function(e, t) {
    e.exports = require("electron-updater");
  },
  function(e, t) {
    e.exports = require("path");
  },
  function(e, t) {
    e.exports = require("electron-progressbar");
  },
  function(e, t) {
    e.exports = require("os");
  },
  function(e, t) {
    e.exports = require("url");
  },
  function(e, t) {
    e.exports = require("procbridge");
  },
  function(e, t) {
    e.exports = require("net");
  },
  function(e, t, r) {
    e.exports = r(10);
  },
  function(e, t, r) {
    "use strict";
    r.r(t);
    var o = r(1),
      n = r(3),
      a = r(5),
      l = r(0),
      i = r.n(l),
      s = r(6),
      u = r(7),
      c = r(8);
    if (
      (
        (i.a.transports.file.file = Object(n.join)(
          Object(a.homedir)(),
          ".lunarclient",
          "logs",
          "launcher",
          i.a.transports.file.fileName
        )),
        "darwin" === process.platform
      )
    ) {
      const e = o.Menu.buildFromTemplate([
        {
          label: "Lunar Client",
          submenu: [
            { role: "about", label: "关于 Lunar Client" },
            { type: "separator" },
            { role: "hide", label: "隐藏 Lunar Client" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit", label: "退出 Lunar Client" }
          ]
        },
        {
          label: "Edit",
          submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", role: "undo" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", role: "redo" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", role: "cut" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", role: "copy" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", role: "paste" },
            {
              label: "Select All",
              accelerator: "CmdOrCtrl+A",
              role: "selectAll"
            }
          ]
        }
      ]);
      o.Menu.setApplicationMenu(e);
    }
    o.app.whenReady().then(() => {
      r(11);
      const e = new o.BrowserWindow({
        width: 1300,
        height: 800,
        frame: !1,
        transparent: "darwin" === process.platform,
        resizable: !1,
        fullscreenable: !1,
        show: !1,
        titleBarStyle: "customButtonsOnHover",
        backgroundColor: "#181818",
        webPreferences: {
          nodeIntegration: !0,
          enableRemoteModule: !0,
          contextIsolation: !1
        }
      });
      e.setMaximizable(!1), e.on("close", () =>
        e.removeAllListeners()
      ), e.once("ready-to-show", () => {
        e.show(), e.focus(), e.webContents.setZoomFactor(1);
      }), e.webContents.on("devtools-opened", () =>
        e.webContents.closeDevTools()
      ), e.loadURL(
        Object(s.format)({
          pathname: Object(n.join)(__dirname, "index.html"),
          protocol: "file",
          slashes: !0
        })
      );
    }), o.app.on("window-all-closed", () => o.app.quit());
    const d = new u.Server(
      "127.0.0.1",
      28189,
      (e, t) =>
        "open-window" === e
          ? new Promise(async (e, r) => {
              const n = new o.BrowserWindow({
                width: t.width + (t.devTools ? 300 : 0),
                height: t.height,
                autoHideMenuBar: !0,
                resizable: !1,
                title: "Loading...",
                fullscreenable: !1
              });
              let a = null;
              t.devTools
                ? n.webContents.openDevTools()
                : n.webContents.on("devtools-opened", () =>
                    n.webContents.closeDevTools()
                  ), n.webContents.addListener("will-redirect", (e, r) => {
                r.startsWith(t.targetUrlPrefix) && ((a = r), n.close());
              }), n.on("close", () => {
                n.removeAllListeners(), e(
                  null === a
                    ? { status: "CLOSED_WITH_NO_URL" }
                    : { status: "MATCHED_TARGET_URL", url: a }
                );
              }), await n.webContents.session.clearCache(), await n.webContents.session.clearStorageData(), await n.loadURL(
                t.url
              ), n.on("show", function(e) {
                n.setAlwaysOnTop(!0), n.setAlwaysOnTop(!1);
              }), n.show();
            })
          : "Unknown IPC method " + e
    );
    !(function startIPCServer() {
      !(function isPortAvailable(e, t) {
        const r = Object(c.createServer)()
          .addListener("error", e => {
            t(!1);
          })
          .addListener("listening", () => {
            r.addListener("close", () => t(!0)), r.close();
          })
          .listen(e, "127.0.0.1");
      })(28189, e => {
        e
          ? (
              i.a.info("Starting IPC server."),
              d.start(),
              i.a.info("Started IPC server.")
            )
          : (
              i.a.warn("Failed to start IPC server: Port not available."),
              i.a.warn("Will try again in 30 seconds."),
              setTimeout(() => startIPCServer(), 3e4)
            );
      });
    })();
  },
  function(e, t, r) {
    "use strict";
    r.r(t);
    var o = r(2),
      n = r(1),
      a = r(0),
      l = r.n(a),
      i = r(4),
      s = r.n(i);
    let u;
    (o.autoUpdater.logger = l.a.scope(
      "autoUpdater"
    )), (o.autoUpdater.requestHeaders = {
      "User-Agent": "Lunar Client Launcher v" + n.app.getVersion()
    }), o.autoUpdater.checkForUpdates(), o.autoUpdater.on(
      "update-available",
      e => {
        try {
          u = new s.a({
            title: "启动器更新",
            text: "下载启动器中,版本: " + e.version,
            indeterminate: !1,
            value: 0,
            detail: "Starting update...",
            browserWindow: {
              alwaysOnTop: !0,
              webPreferences: { nodeIntegration: !0 },
              backgroundColor: "#201f1d"
            },
            style: {
              text: { color: "#fff" },
              detail: { color: "#fff" },
              bar: { background: "#171717" },
              value: { background: "#28af55" }
            }
          });
        } catch (e) {
          l.a.error(e);
        }
      }
    ), o.autoUpdater.signals.progress(e => {
      try {
        let t = Math.round(e.percent);
        (u.value = t), (u.detail =
          t + "% downloaded (" + e.bytesPerSecond + " bytes/sec)");
      } catch (e) {
        l.a.error(e);
      }
    }), o.autoUpdater.on("update-downloaded", () => {
      try {
        u.setCompleted();
        let e = new s.a({
          title: "启动器更新",
          text: "等待安装",
          indeterminate: !0,
          detail: "Waiting to install...",
          browserWindow: {
            alwaysOnTop: !0,
            webPreferences: { nodeIntegration: !0 }
          }
        });
        setTimeout(() => e.setCompleted(), 5e3);
      } catch (e) {
        l.a.error(e);
      }
      setTimeout(() => o.autoUpdater.quitAndInstall(!1, !0), 5e3);
    });
  }
]));
//# sourceMappingURL=main.js.map
