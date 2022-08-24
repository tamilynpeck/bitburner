/** @param {NS} ns */
/** @param {import(".").NS} ns */
import { Home } from "Home.js";
import { getServerConnection } from "server-list.js";

// TODO: minHackLevel changes...? dynamically call
const PORT_SCRIPTS = {
  // darkweb: { name: "TOR Router", cost: 200000 },
  brutessh: { name: "BruteSSH.exe", cost: 500000, minHackLevel: 50 },
  ftp: { name: "FTPCrack.exe", cost: 1500000, minHackLevel: 100 },
  smtp: { name: "relaySMTP.exe", cost: 5000000, minHackLevel: 323 },
  http: { name: "HTTPWorm.exe", cost: 30000000, minHackLevel: 412 },
  sql: { name: "SQLInject.exe", cost: 250000000, minHackLevel: 750 },
  // deep2: { name: "DeepscanV2.exe", cost: 25000000 },
  // formulas: { name: "Formulas.exe", cost: 5000000000 },
};

const FACTION_SERVERS = {
  CyberSec: { serverName: "CSEC" },
  NiteSec: { serverName: "avmnite-02h" },
  TheBlackHand: { serverName: "I.I.I.I", name: "The Black Hand" },
  BitRunners: { serverName: "run4theh111z", name: "BitRunners" },
};

// TODO: pattern? DRY!

export async function main(ns) {
  const home = new Home(ns);
  const money = home.balance();
  const hackLevel = ns.getHackingLevel();
  // const player = ns.getPlayer();

  // if (!player.tor && money >= SCRIPTS.darkweb.cost) {
  //   ns.alert(`TIME TO BUY: ${SCRIPTS.darkweb.name}!`);
  // }

  for (var key in PORT_SCRIPTS) {
    if (
      !home.haveScript(PORT_SCRIPTS[key].name) &&
      hackLevel >= PORT_SCRIPTS[key].minHackLevel &&
      money >= PORT_SCRIPTS[key].cost
    ) {
      ns.toast(`TIME TO BUY: ${PORT_SCRIPTS[key].name}!`, "warning", 10000);
    }
  }

  for (var key in FACTION_SERVERS) {
    if (
      !ns.getServer(FACTION_SERVERS[key].serverName).backdoorInstalled &&
      hackLevel >= ns.getHackingLevel(FACTION_SERVERS[key].serverName)
    ) {
      ns.toast(
        `TIME TO BACKDOOR: ${FACTION_SERVERS[key].serverName}!`,
        "warning",
        10000
      );
      ns.tprint(getServerConnection(ns, FACTION_SERVERS[key].serverName));
    }
  }
}
