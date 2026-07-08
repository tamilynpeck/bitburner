import { configureHack } from "configure-hack.js";

/** @param {NS} ns */
export async function main(ns) {
  const target = ns.args[0] ? String(ns.args[0]) : ns.getHostname();
  const server = ns.args[1] ? String(ns.args[1]) : null;
  ns.tprint(`Configure Hack on ${target} from ${server}`);

  await configureHack(ns, target, server);
}
