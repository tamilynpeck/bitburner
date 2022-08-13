/** @param {NS} ns */
import { configureHack } from "configure-hack.js";

export async function main(ns) {
  const args_obj = arguments[0];
  const target = args_obj.args[0] ? args_obj.args[0] : ns.getHostname();
  const server = args_obj.args[1] ? args_obj.args[1] : null;
  ns.tprint(`Confiugre Hack on ${target} from ${server}`);

  await configureHack(ns, target, server);
}
