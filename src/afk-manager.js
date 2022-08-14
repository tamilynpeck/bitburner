/** @param {NS} ns */
/** @param {import(".").NS} ns */

const MINUTE = 60000;
const HOME = "home";
const HOME_HACK = "afk-home-hack.js";
const SETUP = "setup.js";
const SERVER_SETUP = "buy-servers.js";

export async function main(ns) {
  if (!isHomeHackRunning(ns)) {
    runHomeHack(ns);
  }

  let min = 0;
  while (true) {
    ns.exec(SETUP, HOME);
    // check for darkweb/purchase
    if (min === 5) {
      ns.exec(SERVER_SETUP, HOME);
      min = 0;
    }
    min += 1;

    await ns.sleep(MINUTE);
  }
}

function isHomeHackRunning(ns) {
  const scriptsRunning = ns.ps(HOME);
  for (var i = 0; i < scriptsRunning.length; i++) {
    if (scriptsRunning[i].filename === HOME_HACK) {
      return true;
    }
  }
  return false;
}

function runHomeHack(ns) {
  const ramNeeded = ns.getScriptRam(HOME_HACK, HOME);
  const maxRam = ns.getServerMaxRam(HOME);
  const usedRam = ns.getServerUsedRam(HOME);
  const ramAvailable = maxRam - usedRam;
  const threads = Math.floor(ramAvailable / ramNeeded) - 100;
  if (threads > 0) {
    ns.tprint(`exec ${HOME_HACK} -t ${threads} on ${HOME}`);
    ns.exec(HOME_HACK, HOME, threads);
  }
}
