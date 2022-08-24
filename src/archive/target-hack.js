/** @param {NS} ns */
import { configureHack } from "configure-hack.js";

export async function main(ns) {
  const target = ns.args[0] ? ns.args[0] : ns.getHostname();
  const server = ns.args[1] ? ns.args[1] : null;
  ns.tprint(`Confiugre Hack on ${target} from ${server}`);

  await configureHack(ns, target, server);
}
