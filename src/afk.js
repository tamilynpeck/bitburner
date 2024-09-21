/** @param {NS} ns */
/** @param {import(".").NS} ns */
import { configureHack } from "configure-hack.js";
import { getServers } from "utils.js";
// import { Gang } from "./gang/Gang.js";

const MINUTE = 60000;
const HOME = "home";
const HOME_HACK = "home-hack.js";
const SERVERS = "buy-servers.js";
const PROGRAMS = "buy-programs.js";
const CONTRACTS = "contracts.js";
const UPGRADES = "upgrades.js";
const GANG = "gangs.js";
const CRIME = "crime.js";

export async function main(ns) {
  let hackLevel = ns.getHackingLevel();
  if (hackLevel < 30) {
    ns.singularity.universityCourse("Rothman University", "Algorithms");
  }

  if (!isHomeHackRunning(ns)) {
    runHomeHack(ns);
  }

  let min = 0;
  while (true) {
    await setup(ns);
    ns.exec(PROGRAMS, HOME);

    if (ns.gang.inGang()) {
      ns.exec(GANG, HOME);
    }

    let invite = ns.singularity.checkFactionInvitations();
    if (invite.length > 0) {
      let faction = invite[0];
      ns.tprint(`Join ${faction}`);
      ns.singularity.joinFaction(faction);
      // if top of joined hierarchy... based on current work? idk
      ns.singularity.workForFaction(faction, "Hacking Contracts");
    }

    if (min === 1) {
      // ns.run(SERVERS);
      // ns.exec(SERVERS, HOME);
    }
    if (min === 2) {
      ns.exec(UPGRADES, HOME);
    }
    if (min === 3) {
      ns.exec(CONTRACTS, HOME, 1, "find");
    }
    // if (min == 4) ns.exec(UPGRADES, HOME);

    if (min === 5) {
      // server, check that hacking has made enough this run to buy servers...?

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
  const saveRam =
    Math.floor(maxRam * 0.1) > 250 ? Math.floor(maxRam * 0.1) : 250;
  const ramAvailable = maxRam - usedRam - saveRam;
  const threads = Math.floor(ramAvailable / ramNeeded);

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
