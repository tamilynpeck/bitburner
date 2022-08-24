/** @param {NS} ns */
/** @param {import(".").NS} ns */
import { isHackable, getServers } from "utils.js";

export async function main(ns) {
  const action = ns.args[0];

  if (action === "find") {
    const findTarget = ns.args[1];
    findServer(ns, findTarget);
  }

  if (action === "connect") {
    const findTarget = ns.args[1];
    let command = getServerConnection(ns, findTarget);
    ns.tprint(command);
  }

  if (action === "min") {
    worthBuyingPortHack(ns);
  }
}

export function getServerConnection(ns, server) {
  let connections = findServer(ns, server);
  return connectionCommands(connections);
}

export function findServer(ns, server) {
  ns.tprint(`Find: ${server}`);
  let servers = ns.scan(server);
  let temp = servers;
  let connections = [server];

  for (var i = 0; i < 15; i++) {
    ns.tprint(temp[0]);
    if (temp[0] == "home") {
      break;
    }
    connections.push(temp[0]);
    temp = ns.scan(temp[0]);
  }
  connections.reverse();
  return connections;
}

function connectionCommands(connections) {
  let command = "";
  for (var i = 0; i < connections.length; i++) {
    command += `connect ${connections[i]}; `;
  }
  return command;
}

function findProfit(ns) {
  const servers = getServers(ns);
  let hackableServers = [];
  let maxServer = "";
  let maxAmount = 0;
  let target = "";

  for (var i = 0; i < servers.length; i++) {
    target = servers[i];
    if (!isHackable(ns, target)) {
      continue;
    }
    hackableServers.push(target);
    printMonies(ns, target);
    if (maxAmount < ns.getServerMaxMoney(target)) {
      maxAmount = ns.getServerMaxMoney(target);
      maxServer = target;
    }
  }

  ns.tprint("maxServer: ", maxServer);
  ns.tprint("maxAmount: ", maxAmount);
  return hackableServers;
}

function printMonies(ns, target) {
  let hasAccess = ns.hasRootAccess(target);
  if (hasAccess) {
    ns.tprint(ns.getServerMaxMoney(target), "-", target);
  }
}

// Max: {"1":100,"2":309,"3":522,"4":832,"5":1285}
// Min: {"0": 1, "1":50,"2":100,"3":323,"4":412,"5":750}
function worthBuyingPortHack(ns) {
  const servers = getServers(ns);
  let config = {};

  // "5": 1
  servers.splice(servers.indexOf("darkweb"), 1);
  servers.splice(servers.indexOf("home"), 1);
  // remove personal servers...

  servers.forEach((server) => {
    let requiredPorts = ns.getServerNumPortsRequired(server);
    let requiredHackLevel = ns.getServerRequiredHackingLevel(server);
    if (!(requiredPorts in config)) {
      config[requiredPorts] = requiredHackLevel;
    } else if (config[requiredPorts] > requiredHackLevel) {
      config[requiredPorts] = requiredHackLevel;
    }
  });

  ns.tprint(config);
}
