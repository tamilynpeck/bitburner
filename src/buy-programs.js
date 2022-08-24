/** @param {NS} ns */
/** @param {import(".").NS} ns */
import { Home } from "Home.js";

const SCRIPTS = {
  // darkweb? TOR
  brutessh: { name: "BruteSSH.exe", cost: 500000, minHackLevel: 50 },
  ftp: { name: "FTPCrack.exe", cost: 1500000, minHackLevel: 100 },
  smtp: { name: "relaySMTP.exe", cost: 5000000, minHackLevel: 323 },
  http: { name: "HTTPWorm.exe", cost: 30000000, minHackLevel: 412 },
  sql: { name: "SQLInject.exe", cost: 250000000, minHackLevel: 750 },
  deep2: { name: "DeepscanV2.exe", cost: 25000000 },
  formulas: { name: "Formulas.exe", cost: 5000000000 },
};

export async function main(ns) {
  const home = new Home(ns);
  const money = home.balance();
  const hackLevel = ns.getHackingLevel();

  if (
    !home.haveScript(SCRIPTS.brutessh.name) &&
    hackLevel >= SCRIPTS.brutessh.minHackLevel &&
    money >= SCRIPTS.brutessh.cost
  ) {
    ns.tprint(`TIME TO BUY: ${SCRIPTS.brutessh.name}!`);
  }

  if (
    !home.haveScript(SCRIPTS.ftp.name) &&
    hackLevel >= SCRIPTS.ftp.minHackLevel &&
    money >= SCRIPTS.ftp.cost
  ) {
    ns.tprint(`TIME TO BUY: ${SCRIPTS.ftp.name}!`);
  }

  if (
    !home.haveScript(SCRIPTS.smtp.name) &&
    hackLevel >= SCRIPTS.smtp.minHackLevel &&
    money >= SCRIPTS.smtp.cost
  ) {
    ns.tprint(`TIME TO BUY: ${SCRIPTS.smtp.name}!`);
  }

  if (
    !home.haveScript(SCRIPTS.http.name) &&
    hackLevel >= SCRIPTS.http.minHackLevel &&
    money >= SCRIPTS.http.cost
  ) {
    ns.tprint(`TIME TO BUY: ${SCRIPTS.http.name}!`);
  }

  if (
    !home.haveScript(SCRIPTS.sql.name) &&
    hackLevel >= SCRIPTS.sql.minHackLevel &&
    money >= SCRIPTS.sql.cost
  ) {
    ns.tprint(`TIME TO BUY: ${SCRIPTS.sql.name}!`);
  }
}
