import { importShared } from './__federation_fn_import-iRn10MJH.js';
import { r as reactExports } from './__federation_shared_react-DYlhdcjt.js';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=reactExports,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;

{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}

var jsxRuntimeExports = jsxRuntime.exports;

/**
 * @remix-run/router v1.18.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */

////////////////////////////////////////////////////////////////////////////////
//#region Types and Constants
////////////////////////////////////////////////////////////////////////////////
/**
 * Actions represent the type of change to a location value.
 */
var Action;
(function (Action) {
  /**
   * A POP indicates a change to an arbitrary index in the history stack, such
   * as a back or forward navigation. It does not describe the direction of the
   * navigation, only that the current index changed.
   *
   * Note: This is the default action for newly created history objects.
   */
  Action["Pop"] = "POP";
  /**
   * A PUSH indicates a new entry being added to the history stack, such as when
   * a link is clicked and a new page loads. When this happens, all subsequent
   * entries in the stack are lost.
   */
  Action["Push"] = "PUSH";
  /**
   * A REPLACE indicates the entry at the current index in the history stack
   * being replaced by a new one.
   */
  Action["Replace"] = "REPLACE";
})(Action || (Action = {}));
//#endregion

var ResultType;
(function (ResultType) {
  ResultType["data"] = "data";
  ResultType["deferred"] = "deferred";
  ResultType["redirect"] = "redirect";
  ResultType["error"] = "error";
})(ResultType || (ResultType = {}));
class AbortedDeferredError extends Error {}

const validMutationMethodsArr = ["post", "put", "patch", "delete"];
new Set(validMutationMethodsArr);
const validRequestMethodsArr = ["get", ...validMutationMethodsArr];
new Set(validRequestMethodsArr);

/**
 * React Router v6.25.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
const React$2 = await importShared('react');
const AwaitContext = /* @__PURE__ */ React$2.createContext(null);
const RouteContext = /* @__PURE__ */ React$2.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
const RouteErrorContext = /* @__PURE__ */ React$2.createContext(null);
function useParams() {
  let {
    matches
  } = React$2.useContext(RouteContext);
  let routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : {};
}
class RenderErrorBoundary extends React$2.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }
    return {
      error: props.error !== void 0 ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("React Router caught the following error during render", error, errorInfo);
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ React$2.createElement(RouteContext.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ React$2.createElement(RouteErrorContext.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
const START_TRANSITION = "startTransition";
React$2[START_TRANSITION];
var AwaitRenderStatus = /* @__PURE__ */ function(AwaitRenderStatus2) {
  AwaitRenderStatus2[AwaitRenderStatus2["pending"] = 0] = "pending";
  AwaitRenderStatus2[AwaitRenderStatus2["success"] = 1] = "success";
  AwaitRenderStatus2[AwaitRenderStatus2["error"] = 2] = "error";
  return AwaitRenderStatus2;
}(AwaitRenderStatus || {});
const neverSettledPromise = new Promise(() => {
});
class AwaitErrorBoundary extends React$2.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("<Await> caught the following error during render", error, errorInfo);
  }
  render() {
    let {
      children,
      errorElement,
      resolve
    } = this.props;
    let promise = null;
    let status = AwaitRenderStatus.pending;
    if (!(resolve instanceof Promise)) {
      status = AwaitRenderStatus.success;
      promise = Promise.resolve();
      Object.defineProperty(promise, "_tracked", {
        get: () => true
      });
      Object.defineProperty(promise, "_data", {
        get: () => resolve
      });
    } else if (this.state.error) {
      status = AwaitRenderStatus.error;
      let renderError = this.state.error;
      promise = Promise.reject().catch(() => {
      });
      Object.defineProperty(promise, "_tracked", {
        get: () => true
      });
      Object.defineProperty(promise, "_error", {
        get: () => renderError
      });
    } else if (resolve._tracked) {
      promise = resolve;
      status = "_error" in promise ? AwaitRenderStatus.error : "_data" in promise ? AwaitRenderStatus.success : AwaitRenderStatus.pending;
    } else {
      status = AwaitRenderStatus.pending;
      Object.defineProperty(resolve, "_tracked", {
        get: () => true
      });
      promise = resolve.then((data) => Object.defineProperty(resolve, "_data", {
        get: () => data
      }), (error) => Object.defineProperty(resolve, "_error", {
        get: () => error
      }));
    }
    if (status === AwaitRenderStatus.error && promise._error instanceof AbortedDeferredError) {
      throw neverSettledPromise;
    }
    if (status === AwaitRenderStatus.error && !errorElement) {
      throw promise._error;
    }
    if (status === AwaitRenderStatus.error) {
      return /* @__PURE__ */ React$2.createElement(AwaitContext.Provider, {
        value: promise,
        children: errorElement
      });
    }
    if (status === AwaitRenderStatus.success) {
      return /* @__PURE__ */ React$2.createElement(AwaitContext.Provider, {
        value: promise,
        children
      });
    }
    throw promise;
  }
}

const React$1 = await importShared('react');
const {useState: useState$2,useEffect: useEffect$2} = React$1;
function Product({ setPrice }) {
  const [datXe, setDatXeOto] = useState$2([]);
  const [quantity, setQuantity] = useState$2(1);
  useEffect$2(() => {
    (async () => {
      try {
        const response = await fetch(
          // "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/GetDatXeOto",
          "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/FindBookingCarID/669f3567087ce4f213f767a8",
          {
            method: "POST"
            // headers: {
            //   "Content-Type": "application/json",
            // },
            //   body: JSON.stringify(danhsachsanbay),
          }
        );
        const data = await response.json();
        setDatXeOto(data || []);
      } catch {
        console.error("Error fetching data");
      }
    })();
    console.log(datXe);
  }, []);
  let total = datXe.ThanhTien;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 font-bold text-green-400 border border-x-green-400 border-b-green-400 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: datXe.MaDX }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-6 border border-x-green-400 border-b-green-400 p-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Phiếu đặt xe" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Từ ",
          datXe.DiemDon,
          " đến ",
          datXe.DiemTra
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 border border-x-green-400 border-b-green-400 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: quantity }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 border border-x-green-400 border-b-green-400 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        datXe.ThanhTien,
        "đ"
      ] }) })
    ] }, datXe._id),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 text-lg rounded-b-md overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-8 font-bold text-green-400 border border-x-green-400 border-b-green-400 p-2 rounded-bl-md text-end px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tổng:" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-4 border border-x-green-400 border-b-green-400 p-2 rounded-br-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        total,
        "đ"
      ] }) })
    ] })
  ] });
}

const {useState: useState$1,useEffect: useEffect$1} = await importShared('react');

function VoucherList(props) {
  const [voucher, setVoucher] = useState$1([]);
  const [selection, setSelection] = useState$1({});
  useEffect$1(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://voucher-server-akuy.vercel.app/api/vouchers/getVoucher",
          {
            method: "GET"
            // headers: {
            //   "Content-Type": "application/json",
            // },
          }
        );
        const data = await response.json();
        setVoucher(data.vouchers || []);
        console.log(data.vouchers);
      } catch {
        console.error("Error fetching data");
      }
    })();
    console.log(voucher);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "dropdown relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { className: "cursor-pointer w-full rounded-t-md border-4 border-green-400 text-green-400", children: "Chọn voucher" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "absolute top-7 menu dropdown-content bg-white rounded-box z-[99] w-full rounded-b-md border-2 border-green-400 shadow", children: voucher.map((item) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "group grid grid-cols-12 hover:bg-green-400 hover:text-white cursor-pointer place-items-center px-16",
            onClick: () => {
              setSelection(item);
              props.setDiscount(item.VoucherDiscount);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: item.VoucherImage,
                  alt: "",
                  className: "img-fluid rounded"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-8 border-3 border-black text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-green-400 text-lg group-hover:text-white", children: item.VoucherName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: item.VoucherEndDate }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                  "Giảm ",
                  item.VoucherDiscount,
                  "% cho đơn từ",
                  " ",
                  item.VoucherMinValue
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                  "Tối đa ",
                  item.VoucherMaxValue
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "btn col-span-1 text-4xl text-green-400 group-hover:text-white cursor-help",
                  onClick: () => document.getElementById("voucher_detail").showModal(),
                  children: "🛈"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "dialog",
                {
                  id: "voucher_detail",
                  className: "modal p-5 pb-16 rounded-2xl w-1/2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("form", { method: "dialog", className: "modal-backdrop", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "w-full text-green-400 text-right text-4xl px-2", children: "🗙" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-box", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-4xl text-green-600 my-3", children: selection.VoucherName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 place-items-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "img",
                          {
                            src: selection.VoucherImage,
                            alt: "",
                            className: "img-fluid rounded"
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid col-span-8 text-left place-items-start w-full px-10", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-green-600", children: "Mã:" }),
                            " ",
                            selection.VoucherID
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-green-600", children: "Hạn sử dụng:" }),
                            " ",
                            selection.VoucherEndDate
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-green-600", children: "Mức giảm:" }),
                            " ",
                            selection.VoucherDiscount,
                            "%"
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-green-600", children: "Giảm tối đa:" }),
                            " ",
                            selection.VoucherMaxValue,
                            "đ"
                          ] }),
                          "s",
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-green-600", children: "Giá trị đơn hàng tối thiểu:" }),
                            " ",
                            selection.VoucherMinValue,
                            "đ"
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-green-600", children: "Mô tả:" }),
                            " ",
                            selection.VoucherDescription
                          ] })
                        ] })
                      ] })
                    ] })
                  ]
                }
              )
            ]
          }
        ) }, item._id);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-left p-2 my-1 font-bold", children: "Voucher sử dụng:" }),
    selection ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 cursor-pointer mt-2 mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: selection.VoucherImage,
          alt: "",
          className: "img-fluid rounded"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-7 border-3 border-black text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-green-400 text-lg", children: selection.VoucherName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: selection.VoucherEndDate }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Giảm ",
          selection.VoucherDiscount,
          "% cho đơn từ",
          " ",
          selection.VoucherMinValue
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Tối đa ",
          selection.VoucherMaxValue
        ] })
      ] })
    ] }) : null
  ] });
}

const React = await importShared('react');
const {useState,useEffect} = React;
function MainPage() {
  const { id } = useParams();
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const final = price - price * discount / 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container bg-gray-100 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-green-400 text-4xl", children: "Thanh toán" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 gap-10 px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white col-span-7 shadow-xl rounded-lg my-10 p-3 m-0 h-fit", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 text-lg text-white font-bold rounded-t-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 border border-x-green-400 border-t-green-400 bg-green-400 p-2 rounded-t-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Mã" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-6 border border-x-green-400 border-t-green-400 bg-green-400 p-2 rounded-t-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Sản phẩm" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 border border-x-green-400 border-t-green-400 bg-green-400 p-2 rounded-t-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Số lượng" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 border border-x-green-400 border-t-green-400 bg-green-400 p-2 rounded-t-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Giá" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Product, { setPrice, id })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white col-span-5 shadow-xl rounded-lg my-10 p-3 px-10 m-0 h-fit", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(VoucherList, { setDiscount }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-left px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tạm tính:" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right px-20", children: [
            price,
            "đ"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right text-green-400 text-sm px-20", children: [
            "-",
            price * discount / 100,
            "đ"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-left px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tổng tiền:" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right px-20", children: [
            final,
            "đ"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "bg-green-400 hover:bg-green-600 text-white font-bold py-2 my-10 rounded-md w-full", children: "Thanh toán" })
      ] })
    ] })
  ] });
}

export { MainPage as default, jsxRuntimeExports as j };
