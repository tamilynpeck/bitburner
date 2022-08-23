/** @param {NS} ns */
/** @param {import(".").NS} ns */

export function run_nuke(ns, target) {
  if (ns.hasRootAccess(target)) {
    return;
  }
  const requiredPorts = ns.getServerNumPortsRequired(target);

  let portCount = 0;
  var success = false;

  if (ns.fileExists("BruteSSH.exe", "home")) {
    success = ns.brutessh(target);
    portCount = success ? portCount + 1 : portCount;
  }
  if (ns.fileExists("FTPCrack.exe", "home")) {
    success = ns.ftpcrack(target);
    portCount = success ? portCount + 1 : portCount;
  }
  if (ns.fileExists("relaySMTP.exe", "home")) {
    success = ns.relaysmtp(target);
    portCount = success ? portCount + 1 : portCount;
  }
  if (ns.fileExists("HTTPWorm.exe", "home")) {
    success = ns.httpworm(target);
    portCount = success ? portCount + 1 : portCount;
  }
  if (ns.fileExists("SQLInject.exe", "home")) {
    success = ns.sqlinject(target);
    portCount = success ? portCount + 1 : portCount;
  }

  if (portCount >= requiredPorts) {
    ns.tprint("Nuking: ", target);
    ns.nuke(target);
  } else {
    ns.print(
      `Unlocked ${portCount} / ${requiredPorts} Required Ports on ${target}`
    );
  }
}
