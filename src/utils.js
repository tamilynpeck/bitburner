/** @param {NS} ns */
/** @param {import(".").NS} ns */

export function getServers(ns) {
  let servers = ns.scan("home");
  let temp = [];

  for (var i = 0; i < 150; i++) {
    temp = ns.scan(servers[i]);
    servers.push(...temp);
    servers = [...new Set(servers)];
  }
  return servers;
}

export function getServerList(
  ns,
  isServerHackable = false,
  isServerWorthHacking = false
) {
  let servers = ns.scan("home");
  let temp = [];
  let targets = [];
  let target = "";

  // TODO: make function recurisve??
  for (var i = 0; i < 150; i++) {
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
  const servers = unique_server_list(ns);
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

export function findServer(ns, server) {
  ns.tprint(`Find: ${server}`);
  let servers = ns.scan(server);
  let temp = servers;
  let connections = [server];

  for (var i = 0; i < 15; i++) {
    // ns.tprint(temp[0]);
    if (temp[0] == "home") {
      break;
    }
    connections.push(temp[0]);
    temp = ns.scan(temp[0]);
  }
  if (connections.length == 1) return [];
  connections.reverse();
  return connections;
}

export async function backdoor(ns, server) {
  let connections = findServer(ns, server);
  // ns.tprint(connections);
  for (var i = 0; i < connections.length; i++) {
    let serverName = connections[i];
    if (!serverName) break;
    // ns.tprint(`Connect: ${connections[i]}`);
    ns.singularity.connect(connections[i]);
    if (i == connections.length - 1 && ns.hasRootAccess(connections[i])) {
      ns.tprint(`Backdoor: ${connections[i]}`);
      await ns.singularity.installBackdoor();
    }
  }
  ns.singularity.connect("home");
}
