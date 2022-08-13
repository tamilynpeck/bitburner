/** @param {NS} ns */
import { configureHack } from "configure-hack.js";
import { getServers } from "utils.js";

export async function main(ns) {
  let servers = ns.scan();

  servers = getServers();

  for (var i = 0; i < servers.length; i++) {
    await configureHack(ns, servers[i]);
    // ns.tprint("scan result ", ns.scan(servers[i]))
  }
}

function home_setup(ns) {
  server = "home";
  // get highest amount running?
}
