/** @param {NS} ns */
export function runNuke(ns, target) {
  if (ns.hasRootAccess(target)) {
    ns.print(`Already have root access on ${target}`);
    return;
  }

  const requiredPorts = ns.getServerNumPortsRequired(target);
  let portCount = 0;

  portCount += ns.brutessh(target) ? 1 : 0;
  portCount += ns.ftpcrack(target) ? 1 : 0;
  portCount += ns.relaysmtp(target) ? 1 : 0;
  portCount += ns.httpworm(target) ? 1 : 0;
  portCount += ns.sqlinject(target) ? 1 : 0;

  if (portCount >= requiredPorts) {
    ns.tprint("Nuking: ", target);
    ns.nuke(target);
  } else {
    ns.print(
      `Unlocked ${portCount} / ${requiredPorts} Required Ports on ${target}`
    );
  }
}
