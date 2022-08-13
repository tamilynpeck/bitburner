/** @param {NS} ns */
/** @param {import(".").NS} ns */
import { Home } from "Home.js";

const HOME = "home";

export async function main(ns) {
  const home = Home(ns);
  const money = home.balance();

  if (!home.haveScript(SCRIPTS.brutessh.name)) {
    // buy
  }
  if (!ns.fileExists("FTPCrack.exe", HOME)) {
    // buy
  }
  if (!ns.fileExists("relaySMTP.exe", HOME)) {
    // buy
  }
  if (!ns.fileExists("HTTPWorm.exe", HOME)) {
    // buy
  }
  if (!ns.fileExists("SQLInject.exe", HOME)) {
    // buy
  }
}
