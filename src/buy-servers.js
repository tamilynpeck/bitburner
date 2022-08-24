/** @param {NS} ns */
/** @param {import(".").NS} ns */
import { configureHack } from "configure-hack.js";
import { getServerList, isHackable } from "utils.js";

export async function main(ns) {
  const servers = getServerList(ns, true, true).reverse();
  const serverLimit = ns.getPurchasedServerLimit();
  let ram = calcMaxRamSize(ns);
  let purchasedServers = ns.getPurchasedServers();
  let server = "";
  let target = "";
  let upgradeServers = [];

  if (purchasedServers.length === serverLimit) {
    ns.toast("25/25 Servers!", "success");
  }
  // purchasedServers.forEach
  for (var i = 0; i < purchasedServers.length; i++) {
    server = purchasedServers[i];
    let result = checkForUpgrade(ns, server, ram);
    if (result) upgradeServers.push(result);
  }

  for (var i = 0; i < servers.length; i++) {
    purchasedServers = ns.getPurchasedServers();
    if (purchasedServers.length === serverLimit && upgradeServers.length > 0) {
      ns.tprint(upgradeServers);
      deleteServer(ns, upgradeServers[0].currentName);
      upgradeServers.shift();
    } else if (purchasedServers.length === serverLimit) {
      break;
    }

    target = servers[i];
    if (ns.serverExists(`server-${target}-${ram}`)) {
      continue;
    }

    if (!isHackable(ns, target)) {
      continue;
    }

    if (canBuyServerSize(ns, ram)) {
      await setServer(ns, target, ram);
    } else {
      break;
    }
  }
}

function canBuyServerSize(ns, ram) {
  const money = ns.getServerMoneyAvailable("home");
  const cost = ns.getPurchasedServerCost(ram);
  const percentage = Math.round((cost / money) * 100);
  ns.tprint(`cost: ${cost} ${percentage}% of balance.`);
  return cost < money * 0.5;
}

async function setServer(ns, target, ram) {
  let serverName = `server-${target}-${ram}`;

  if (!ns.serverExists(serverName)) {
    ns.purchaseServer(serverName, ram);
    ns.tprint(`Purchase Server: ${serverName} targetting ${target}`);
    await configureHack(ns, target, serverName);
  }
}

function calcMaxRamSize(ns) {
  const money = ns.getServerMoneyAvailable("home");
  // const costPerRam = 55000
  // leave money to buy the important files?
  let startingRamToBuy = 64;
  const costPerRam = 55000;
  const serverCount = 25;
  let ram = 64;
  if (money >= 14080000 * 2) {
    ram = 256;
  }
  if (money >= 28160000) {
    ram = 512;
  }
  if (money >= 56320000) {
    ram = 1024;
  }
  if (money >= 112640000) {
    ram = 2048;
  }
  if (money >= 4096 * 55000) {
    ram = 4096;
  }
  if (money >= 8192 * 55000 * 5) {
    ram = 8192;
  }
  if (money >= 16384 * 55000 * 5) {
    ram = 16384;
  }
  if (money >= 32768 * 55000 * 25) {
    ram = 32768;
  }
  if (money >= 65536 * 55000 * 25 * 2) {
    ram = 65536;
  }
  if (money >= 131072 * 55000 * 25 * 2) {
    ram = 131072;
  }
  return ram;
}

function checkForUpgrade(ns, server, newRam) {
  const money = ns.getServerMoneyAvailable("home");
  const ram = server.split("-").slice(-1)[0];
  const upgradeCost = ns.getPurchasedServerCost(newRam);

  if (ram < newRam && upgradeCost < money) {
    const target = server.replace("server-", "").replace(`-${ram}`, "");
    return { currentName: server, new: target, newRam: newRam };
  }
  return;
}

function deleteServer(ns, server) {
  ns.tprint(`Delete Server: ${server}`);
  ns.killall(server);
  ns.deleteServer(server);
}
