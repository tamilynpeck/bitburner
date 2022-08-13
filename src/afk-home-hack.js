/** @param {NS} ns */
/** @param {import(".").NS} ns */
import { getServers, isHackable } from "utils.js";

export async function main(ns) {
  const SECOND = 1000;
  let servers = [];
  let target = "";

  while (true) {
    servers = getServers();
    for (var i = 0; i < servers.length; i++) {
      target = servers[i];
      await hackingLoop(ns, target);
    }
    await ns.sleep(SECOND * 6);
  }
}

async function hackingLoop(ns, target) {
  if (!isHackable(ns, target)) {
    return;
  }

  const maxMoney = ns.getServerMaxMoney(target);
  const moneyThresh = maxMoney * 0.75;
  let moneyAvailable = 0;
  let securityThresh = ns.getServerMinSecurityLevel(target) + 5;
  securityThresh = securityThresh <= 20 ? 20 : securityThresh;

  while (true) {
    moneyAvailable = ns.getServerMoneyAvailable(target);

    ns.print(`MONEY AVAILABLE @ ${moneyAvailable / maxMoney}`);
    if (moneyAvailable / maxMoney < 0.25) {
      return;
    }

    if (ns.getServerSecurityLevel(target) > securityThresh) {
      await ns.weaken(target);
    } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
      await ns.grow(target);
    } else {
      await ns.hack(target);
    }
  }
}
