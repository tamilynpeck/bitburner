/** @param {NS} ns */
/** @param {import(".").NS} ns */

export async function main(ns) {}

export function getServers(ns) {
  //ishackable?
  //isWorthhacking?
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

//split into access check vs worth hacknig check
export function isHackable(ns, target, onTargetServer = false) {
  if (!ns.hasRootAccess(target)) {
    ns.tprint(`${target} no Root Access on target`);
    return false;
  }
  const hackLevel = ns.getHackingLevel();
  if (hackLevel < ns.getServerRequiredHackingLevel(target)) {
    ns.tprint(`${target} Hack level to low to hack`);
    return false;
  }
  if (ns.getServerMaxMoney(target) == 0) {
    ns.tprint(`${target} no Money to hack`);
    return false;
  }
  if (onTargetServer && ns.getServerMaxRam(target) == 0) {
    ns.tprint(`${target} no RAM to run hack on target`);
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
