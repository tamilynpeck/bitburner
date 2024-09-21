/** @param {NS} ns */
/** @param {import(".").NS} ns */

export async function main(ns) {
  const host = ns.getHostname();
  const target = ns.args[0] ? ns.args[0] : ns.getHostname();
  const moneyThresh = ns.getServerMaxMoney(target) * 0.75;
  let securityThresh = ns.getServerMinSecurityLevel(target) + 5;
  securityThresh = securityThresh <= 20 ? 20 : securityThresh;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  while (true) {
    if (ns.getServerSecurityLevel(target) > securityThresh) {
      await ns.weaken(target);
    } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
      await ns.grow(target);
    } else {
      await ns.hack(target);
      let income = ns.getScriptIncome();
      let type = income > 0 ? "success" : "error";
      if (income > 1000000000 || type == "error")
        ns.toast(
          `${host} - ${target} - ${formatter.format(income)}`,
          type,
          5000
        );
    }
  }
}
