/** @param {NS} ns */
import { configureHack } from "configure-hack.js";
import { getServers } from "utils.js";

export async function main(ns) {
  const servers = getServers(ns);

  for (var i = 0; i < servers.length; i++) {
    await configureHack(ns, servers[i]);
    // ns.tprint("scan result ", ns.scan(servers[i]))
  }
}
