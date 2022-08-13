/** @param {NS} ns */
/** @param {import(".").NS} ns */

export async function main(ns) {
  const MINUTE = 60000;
  const HOME = "home";
  const SETUP = "setup.js";
  const HOME_HACK = "afk-home-hack.js";

  ns.exec(HOME_HACK, HOME);

  while (true) {
    await ns.sleep(MINUTE);
    // run set up?
    ns.exec(SETUP, HOME);
    // check for darkweb/purchase
    // check for server purchases
  }
}
