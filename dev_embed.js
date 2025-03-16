import RefreshRuntime from "react-refresh";

RefreshRuntime.injectIntoGlobalHook(window);
window.$RefreshReg$ = () => {};
window.$RefreshSig$ = () => (type) => type;
// eslint-disable-next-line no-underscore-dangle
window.__vite_plugin_react_preamble_installed__ = true;
