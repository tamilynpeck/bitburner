/** @param {NS} ns */
import { isHackable } from "utils.js";

export async function main(ns) {
  let find = "run4theh111z";

  ns.tprint(ns.scan(find));
  // let servers = find_profit(ns)
  let servers = unique_server_list(ns, 200);
  ns.tprint(servers);
}

export function unique_server_list(ns, count) {
  let servers = ns.scan("home");
  let temp = [];

  for (var i = 0; i < count; i++) {
    temp = ns.scan(servers[i]);
    servers.push(...temp);
    servers = [...new Set(servers)];
  }
  return servers;
}

function find_profit(ns) {
  const servers = unique_server_list(ns, 130);
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
    print_monies(ns, target);
    if (maxAmount < ns.getServerMaxMoney(target)) {
      maxAmount = ns.getServerMaxMoney(target);
      maxServer = target;
    }
  }

  ns.tprint("maxServer: ", maxServer);
  ns.tprint("maxAmount: ", maxAmount);
  return hackableServers;
}

function print_monies(ns, target) {
  let hasAccess = ns.hasRootAccess(target);
  if (hasAccess) {
    ns.tprint(ns.getServerMaxMoney(target), "-", target);
  }
}

function find_message(ns, target, fileName) {
  const files = ns.ls(target);

  if (fileName in files) {
    ns.tprint(`found ${fileName} on ${target}!`);
  }
}
