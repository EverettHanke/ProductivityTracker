import { app as n, BrowserWindow as t } from "electron";
import { createRequire as c } from "node:module";
import { fileURLToPath as a } from "node:url";
import o from "node:path";
const p = c(import.meta.url), i = o.dirname(a(import.meta.url));
console.log(p);
process.env.APP_ROOT = o.join(i, "..");
const r = process.env.VITE_DEV_SERVER_URL, f = o.join(process.env.APP_ROOT, "dist-electron"), s = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = r ? o.join(process.env.APP_ROOT, "public") : s;
let e;
function l() {
  e = new t({
    icon: o.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: o.join(i, "preload.mjs")
    },
    fullscreen: !0
  }), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), r ? e.loadURL(r) : e.loadFile(o.join(s, "index.html"));
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
  s as RENDERER_DIST,
  r as VITE_DEV_SERVER_URL
};
