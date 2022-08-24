/** @param {NS} ns */
import { run_nuke } from "nuke.js";

export async function main(ns) {
  const target = ns.args[0] ? ns.args[0] : ns.getHostname();
  ns.tprint(target);

  run_nuke(ns, target);
}
