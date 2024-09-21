/** @param {NS} ns */
/** @param {import(".").NS} ns */

export async function main(ns) {
  //   const money = ns.getServerMoneyAvailable("home");

  let result = ns.singularity.upgradeHomeRam();
  if (result) ns.tprint("Upgraded RAM ", ns.getServerMaxRam("home"));

  result = ns.singularity.upgradeHomeCores();
  if (result) ns.tprint("Upgraded Cores");
}
