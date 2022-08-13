/** @param {NS} ns */
/** @param {import(".").NS} ns */
import { configureHack } from "configure-hack.js";

export async function main(ns) {
  const purchasedServers = ns.getPurchasedServers();
  let server = "";

  for (var i = 0; i < purchasedServers.length; i++) {
    server = purchasedServers[i];
    ns.tprint(`Checking Server: ${server}`);
    await restart(ns, server);
  }
}

async function restart(ns, server) {
  const runningScripts = ns.ps(server);
  ns.tprint("ps ", runningScripts);
  const ram = server.split("-").slice(-1)[0];
  const target = server.replace("server-", "").replace(`-${ram}`, "");

  if (runningScripts.length == 0) {
    ns.tprint(`Restart Server: ${server} targetting ${target}`);
    await configureHack(ns, target, server);
  }
}
