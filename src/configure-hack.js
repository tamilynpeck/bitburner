import { runNuke } from "./nuke.js";
import { isHackable } from "./utils.js";

/** 
 * @param {NS} ns
 * @param {string} target 
 * @param {string|null} server */
export async function configureHack(ns, target, server = null) {
  const hostServer = server ? server : target;
  const scriptServer = "home";
  let hasAccess = ns.hasRootAccess(target);
  if (!hasAccess) {
    runNuke(ns, target);
    hasAccess = ns.hasRootAccess(target);
    if (!hasAccess) {
      return;
    }

    const hackLevel = ns.getHackingLevel();
    const requiredHackingLevel = ns.getServerRequiredHackingLevel(target);
    if (hackLevel < requiredHackingLevel) {
      ns.tprint(
        `${hackLevel} / ${requiredHackingLevel} Hacking Level on ${target}`
      );
      return;
    }
  }

  if (!isHackable(ns, target, server ? false : true)) {
    return;
  }

  const script = "hacking-loop.js";
  const files = ns.ls(hostServer);
  if (!files.includes(script)) {
    ns.scp(script, scriptServer, hostServer);
  }

  const ramNeeded = ns.getScriptRam(script, hostServer);
  if (ramNeeded == 0) {
    ns.tprint(`ramNeeded 0 (Script Not Found) on ${hostServer}`);
    return;
  }

  const maxRam = ns.getServerMaxRam(hostServer);
  const usedRam = ns.getServerUsedRam(hostServer);
  const ramAvailable = maxRam - usedRam;

  if (ramAvailable <= 0) {
    ns.tprint(`no ram available on ${hostServer}`);
    return;
  }


  const threads =
    Math.floor(ramAvailable / ramNeeded) - (hostServer == "home" ? 20 : 0);
  if (threads > 0) {
    ns.tprint(`exec ${script} -t ${threads} ${target} on ${hostServer}`);
    ns.exec(script, hostServer, threads, target);
  }
}
