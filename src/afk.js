/** @param {NS} ns */
/** @param {import(".").NS} ns */
import { configureHack } from "configure-hack.js";
import { getServers } from "utils.js";
// import { Gang } from "./gang/Gang.js";

const MINUTE = 60000;
const HOME = "home";
const HOME_HACK = "home-hack.js";
const SERVER_SETUP = "buy-servers.js";
const PROGRAMS = "buy-programs.js";
const CONTRACTS = "Contracts.js";

export async function main(ns) {
  if (!isHomeHackRunning(ns)) {
    runHomeHack(ns);
  }

  let min = 0;
  while (true) {
    await setup(ns);
    ns.exec(PROGRAMS, HOME);

    if (min === 5) {
      // server, check that hacking has made enough this run to buy servers...?
      ns.exec(SERVER_SETUP, HOME);
      ns.exec(CONTRACTS, HOME, 1, "find");

      // if (ns.gang.inGang()) {
      //   let gang = new Gang(ns);
      //   gang.manage();
      // }

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
  const leaveAvailable = maxRam / 32 + 1;
  const threads = Math.floor(ramAvailable / ramNeeded) - leaveAvailable;

  if (threads > 0) {
    ns.tprint(`exec ${HOME_HACK} -t ${threads} on ${HOME}`);
    ns.exec(HOME_HACK, HOME, threads);
  }
}

async function setup(ns) {
  const servers = getServers(ns);

  for (var i = 0; i < servers.length; i++) {
    await configureHack(ns, servers[i]);
  }
}
