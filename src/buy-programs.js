/** @param {NS} ns */
/** @param {import(".").NS} ns */
import { Home } from "Home.js";
// import { getServerConnection } from "server-list.js";
import { backdoor } from "utils.js";

// TODO: minHackLevel changes...? dynamically call
const PORT_SCRIPTS = {
  brutessh: {
    name: "BruteSSH.exe",
    cost: 500000,
    minHackLevel: 50,
    canBuy: false,
    createLevel: 50,
  },
  ftp: {
    name: "FTPCrack.exe",
    cost: 1500000,
    minHackLevel: 100,
    canBuy: false,
    createLevel: 100,
  },
  smtp: {
    name: "relaySMTP.exe",
    cost: 5000000,
    minHackLevel: 323,
    canBuy: false,
    createLevel: 250,
  },
  http: {
    name: "HTTPWorm.exe",
    cost: 30000000,
    minHackLevel: 412,
    canBuy: false,
    createLevel: 500,
  },
  sql: {
    name: "SQLInject.exe",
    cost: 250000000,
    minHackLevel: 750,
    canBuy: false,
    createLevel: 750,
  },
  // deep2: { name: "DeepscanV2.exe", cost: 25000000 },
  // formulas: { name: "Formulas.exe", cost: 5000000000 },
};

const darkweb = { name: "TOR Router", cost: 200000 };

const FACTION_SERVERS = {
  CyberSec: { serverName: "CSEC", scriptRequired: "brutessh" },
  NiteSec: { serverName: "avmnite-02h", scriptRequired: "ftp" },
  TheBlackHand: {
    serverName: "I.I.I.I",
    name: "The Black Hand",
    scriptRequired: "smtp",
  },
  BitRunners: {
    serverName: "run4theh111z",
    name: "BitRunners",
    scriptRequired: "http",
  },
  cave: { serverName: "The-Cave", name: "The-Cave", scriptRequired: "sql" },
  w0r1d_d43m0n: {
    serverName: "w0r1d_d43m0n",
    name: "w0r1d_d43m0n",
    scriptRequired: "sql",
    // red pill required?
  },
};

export async function main(ns) {
  const home = new Home(ns);
  const money = home.balance();
  const hackLevel = ns.getHackingLevel();
  const player = ns.getPlayer();

  // if (!player.tor && money >= darkweb.cost * 1.5) {
  //   let result = ns.singularity.purchaseTor();
  //   if (result) ns.alert(`Purchased: ${darkweb.name}!`);
  // }

  // if (money ) if can buy ram/cores

  for (var key in PORT_SCRIPTS) {
    if (
      !home.haveScript(PORT_SCRIPTS[key].name) &&
      hackLevel >= PORT_SCRIPTS[key].minHackLevel &&
      money >= PORT_SCRIPTS[key].cost
    ) {
      ns.toast(`TIME TO BUY: ${PORT_SCRIPTS[key].name}!`, "warning", 10000);
      PORT_SCRIPTS[key].canBuy = true;
      ns.singularity.purchaseProgram(PORT_SCRIPTS[key].name);
    }
    if (
      // !player.tor &&
      !home.haveScript(PORT_SCRIPTS[key].name) &&
      hackLevel >= PORT_SCRIPTS[key].createLevel
    ) {
      ns.singularity.createProgram(PORT_SCRIPTS[key].name);
      break;
    }
  }

  for (var key in FACTION_SERVERS) {
    let serverName = FACTION_SERVERS[key].serverName;
    let requiredHackLevel = ns.getServerRequiredHackingLevel(serverName);
    let requiredScript = PORT_SCRIPTS[FACTION_SERVERS[key].scriptRequired];

    // ns.tprint(`${serverName} `);
    // ns.tprint(ns.getServer(serverName).backdoorInstalled);

    if (
      !ns.getServer(serverName).backdoorInstalled &&
      hackLevel >= requiredHackLevel &&
      (home.haveScript(requiredScript.name) || requiredScript.canBuy)
    ) {
      ns.toast(
        `TIME TO BACKDOOR: ${serverName}! @ ${requiredHackLevel}`,
        "warning",
        10000
      );
      await backdoor(ns, serverName);
    }
  }

  // TODO: do the backdoor thing.
  // TODO: check for faction invites
}
