/** @param {NS} ns */
/** @param {import(".").NS} ns */

export async function main(ns) {}

export function getServers(ns) {
  //ishackable?
  //isWorthhacking?
  return unique_server_list(ns, 200);
}
// function for list of hacked servers

export function getServerList(
  ns,
  count = 150,
  isServerHackable = false,
  isServerWorthHacking = false
) {
  let servers = ns.scan("home");
  let temp = [];
  let targets = [];
  let target = "";

  // make function recurisve??
  for (var i = 0; i < count; i++) {
    target = [];
    temp = ns.scan(servers[i]);

    for (var j = 0; j < temp.length; j++) {
      target = temp[j];
      if (isServerHackable && !isHackable(ns, target)) {
        continue;
      }
      if (isServerWorthHacking && !isWorthHacking(ns, target)) {
        continue;
      }
    }

    servers.push(...temp);
    servers = [...new Set(servers)];
  }
  return servers;
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

export function isWorthHacking(ns, target) {
  // security/chance
  if (ns.getServerMaxMoney(target) == 0) {
    ns.print(`${target} no Money to hack`);
    return false;
  }
  return true;
}

//split into access check vs worth hacknig check
export function isHackable(ns, target, onTargetServer = false) {
  if (!ns.hasRootAccess(target)) {
    ns.print(`${target} no Root Access on target`);
    return false;
  }
  const hackLevel = ns.getHackingLevel();
  if (hackLevel < ns.getServerRequiredHackingLevel(target)) {
    ns.print(`${target} Hack level to low to hack`);
    return false;
  }
  if (ns.getServerMaxMoney(target) == 0) {
    // ns.print(`${target} no Money to hack`);
    return false;
  }
  if (onTargetServer && ns.getServerMaxRam(target) == 0) {
    // ns.print(`${target} no RAM to run hack on target`);
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
