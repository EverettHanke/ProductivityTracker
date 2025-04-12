import { app as n, BrowserWindow as t } from "electron";
import { createRequire as c } from "node:module";
import { fileURLToPath as a } from "node:url";
import o from "node:path";
const p = c(import.meta.url), r = o.dirname(a(import.meta.url));
console.log(p);
process.env.APP_ROOT = o.join(r, "..");
const s = process.env.VITE_DEV_SERVER_URL, f = o.join(process.env.APP_ROOT, "dist-electron"), i = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = s ? o.join(process.env.APP_ROOT, "public") : i;
let e;
function l() {
  e = new t({
    icon: o.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: o.join(r, "preload.mjs"),
      devTools: !0
      //set to false before build
    },
    fullscreen: !1
  }), e.webContents.openDevTools(), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), s ? e.loadURL(s) : e.loadFile(o.join(i, "index.html"));
}
n.on("window-all-closed", () => {
  process.platform !== "darwin" && (n.quit(), e = null);
});
n.on("activate", () => {
  t.getAllWindows().length === 0 && l();
});
n.whenReady().then(l);
export {
  f as MAIN_DIST,
  i as RENDERER_DIST,
  s as VITE_DEV_SERVER_URL
};
