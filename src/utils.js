/** @param {NS} ns */
/** @param {import(".").NS} ns */

export async function main(ns) {}

export function getServers(ns) {
  return unique_server_list(ns, 200);
}
// function for list of hacked servers

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

export function isHackable(ns, target, onTargetServer = false) {
  if (!ns.hasRootAccess(target)) {
    return false;
  }
  const hackLevel = ns.getHackingLevel();
  if (hackLevel < ns.getServerRequiredHackingLevel(target)) {
    return false;
  }
  if (ns.getServerMaxMoney(target) == 0) {
    return false;
  }
  if (onTargetServer && ns.getServerMaxRam(target) == 0) {
    return false;
  }
  return true;
}

// identify highest hackable server...
export function higestHackableServer(ns) {
  const servers = unique_server_list(ns, count);
  let maxServer = "";
  let maxAmount = 0;
  let target = "";

  for (var i = 0; i < servers.length; i++) {
    target = servers[i];
    if (!isHackable(ns, target)) {
      continue;
    }

    if (maxAmount < ns.getServerMaxMoney(target)) {
      maxAmount = ns.getServerMaxMoney(target);
      maxServer = target;
    }

    ns.tprint(`maxServer: ${maxServer} @ ${maxAmount}`);
    return maxServer;
  }
}
