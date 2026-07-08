import { runNuke } from "nuke.js";

/** @param {NS} ns */
export async function main(ns) {
  const target = ns.args[0] ? ns.args[0] : ns.getHostname();
  ns.tprint(target);
  runNuke(ns, target);
}
