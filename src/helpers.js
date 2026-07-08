
// export type ToastVariantEnumType = {
//   SUCCESS: "success";
//   WARNING: "warning";
//   ERROR: "error";
//   INFO: "info";
// };


/** @param {NS} ns */
export async function successToast(ns, msg, duration = 5000) {
  ns.toast(msg, ns.enums.ToastVariant.SUCCESS, duration);
}

/** @param {NS} ns */
export async function errorToast(ns, msg, duration = 5000) {
  ns.toast(msg, ns.enums.ToastVariant.ERROR, duration);
}

/** @param {NS} ns */
export async function infoToast(ns, msg, duration = 5000) {
  ns.toast(msg, ns.enums.ToastVariant.INFO, duration);
}

/** @param {NS} ns */
export async function warningToast(ns, msg, duration = 5000) {
  ns.toast(msg, ns.enums.ToastVariant.WARNING, duration);
}

/** @param {NS} ns */
export async function toast(ns, msg, type = "success", duration = 5000) {
  switch (type) {
    case "success":
      successToast(ns, msg, duration);
      break;
    case "warning":
      warningToast(ns, msg, duration);
      break;
    case "error":
      errorToast(ns, msg, duration);
      break;
    case "info":
      infoToast(ns, msg, duration);
      break;
  }
}
