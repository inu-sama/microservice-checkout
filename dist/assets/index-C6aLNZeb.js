import { importShared } from './__federation_fn_import-iRn10MJH.js';
import MainPage, { j as jsxRuntimeExports } from './__federation_expose_Checkout-DK3eujnx.js';
import { r as reactDomExports } from './__federation_shared_react-dom-81eQxVv-.js';

var client = {};

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

const {useState: useState$1} = await importShared('react');

function Header() {
  useState$1("");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white sticky top-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Header" }) });
}

await importShared('react');

await importShared('react');

function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white sticky bottom-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Footer" }) });
}

const {useState} = await importShared('react');
function App() {
  useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-sans", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MainPage, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}

const React = await importShared('react');
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
