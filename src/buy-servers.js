/** @param {NS} ns */
/** @param {import(".").NS} ns */
import { configureHack } from "configure-hack.js";
import { getServers } from "utils.js";
import { isHackable } from "utils.js";

export async function main(ns) {
  const servers = getServers(ns).reverse();

  // while (true)
  // sleep 1 min, based on balance...

  let ram = calcMaxRamSize(ns);

  const serverLimit = ns.getPurchasedServerLimit();
  ns.tprint("getPurchaseServerLimit: ", serverLimit);
  let purchasedServers = ns.getPurchasedServers();
  ns.tprint(purchasedServers.length);
  let server = "";
  let target = "";
  let serverRam = 0;

  for (var i = 0; i < purchasedServers.length; i++) {
    server = purchasedServers[i];
    serverRam = server.split("-").slice(-1)[0];
    target = server.replace("server-", "").replace(`-${serverRam}`, "");

    if (!ns.serverExists(server)) {
      continue;
    } else {
      await checkForUpgrade(ns, server, ram);
    }
  }

  for (var i = 0; i < servers.length; i++) {
    purchasedServers = ns.getPurchasedServers();
    if (purchasedServers.length == serverLimit) {
      break;
    }
    // if not in purchasedServers?
    target = servers[i];
    if (ns.serverExists(`server-${target}-${ram}`)) {
      continue;
    }

    if (!isHackable(ns, target)) {
      continue;
    }

    if (canBuyServerSize(ns, ram)) {
      await set_server(ns, target, ram);
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
  return cost < money;
}

async function set_server(ns, target, ram) {
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
  return ram;
}

async function checkForUpgrade(ns, server, newRam) {
  const money = ns.getServerMoneyAvailable("home");
  const ram = server.split("-").slice(-1)[0];
  const upgradeCost = ns.getPurchasedServerCost(newRam);

  if (ram < newRam && upgradeCost < money) {
    const target = server.replace("server-", "").replace(`-${ram}`, "");
    deleteServer(ns, server, target);
    // await set_server(ns, target, newRam);
  }
}

function deleteServer(ns, server, target) {
  ns.tprint(`Delete Server: ${server} targetting ${target}`);
  ns.killall(server);
  ns.deleteServer(server);
}
