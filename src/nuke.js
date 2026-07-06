/** @param {NS} ns */
export function run_nuke(ns, target) {
  if (ns.hasRootAccess(target)) {
    return;
  }
  const requiredPorts = ns.getServerNumPortsRequired(target);

  let portCount = 0;
  var success = false;

  if (ns.fileExists("BruteSSH.exe", "home")) {
    ns.brutessh(target);
    success = true;
    portCount = success ? portCount + 1 : portCount;
  }
  if (ns.fileExists("FTPCrack.exe", "home")) {
    ns.ftpcrack(target);
    success = true;
    portCount = success ? portCount + 1 : portCount;
  }
  if (ns.fileExists("relaySMTP.exe", "home")) {
    ns.relaysmtp(target);
    success = true;
    portCount = success ? portCount + 1 : portCount;
  }
  if (ns.fileExists("HTTPWorm.exe", "home")) {
    ns.httpworm(target);
    success = true;
    portCount = success ? portCount + 1 : portCount;
  }
  if (ns.fileExists("SQLInject.exe", "home")) {
    ns.sqlinject(target);
    success = true;
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
