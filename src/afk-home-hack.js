/** @param {NS} ns */
/** @param {import(".").NS} ns */
import { getServers, isHackable } from "utils.js";

export async function main(ns) {
  const SECOND = 1000;
  let servers = [];
  let target = "";

  while (true) {
    servers = getServers(ns);
    for (var i = 0; i < servers.length; i++) {
      target = servers[i];
      if (!ns.serverExists(target)) {
        continue;
      }
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
  let securityThresh = Math.floor(ns.getServerMinSecurityLevel(target)) + 5;
  securityThresh = securityThresh <= 20 ? 20 : securityThresh;

  // moneyAvailable % threadshold lower when hacking level is lower

  while (true) {
    moneyAvailable = ns.getServerMoneyAvailable(target);

    const percentage = Math.round((moneyAvailable / maxMoney) * 100);
    ns.print(`MONEY AVAILABLE @ ${percentage}%`);
    if (moneyAvailable / maxMoney <= 0.04) {
      return;
    }

    if (ns.getServerSecurityLevel(target) > securityThresh) {
      await ns.weaken(target);
    } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
      await ns.grow(target);
    } else {
      break;
    }
  }
}
