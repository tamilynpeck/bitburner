/** @param {NS} ns */
/** @param {import(".").NS} ns */
import { configureHack } from "configure-hack.js";
import { getServers } from "utils.js";

const MINUTE = 60000;
const HOME = "home";
const HOME_HACK = "home-hack.js";
const SERVERS = "buy-servers.js";
const PROGRAMS = "buy-programs.js";
const CONTRACTS = "contracts.js";
const UPGRADES = "upgrades.js";

export async function main(ns) {
  runHomeHack(ns);

  while (true) {
    await setup(ns);
    // ns.exec(PROGRAMS, HOME);

    await ns.sleep(MINUTE);
  }
}

function runHomeHack(ns) {
  const ramNeeded = ns.getScriptRam(HOME_HACK, HOME);
  const maxRam = ns.getServerMaxRam(HOME);
  const usedRam = ns.getServerUsedRam(HOME);
  const ramAvailable = maxRam - usedRam;
  const leaveThreads = maxRam / 16;
  const threads = Math.floor(ramAvailable / ramNeeded) - leaveThreads;

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
