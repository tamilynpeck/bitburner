/** @param {NS} ns */
/** @param {import(".").NS} ns */
// import { getServerList } from "utils.js";

export async function main(ns) {
  // ns.formulas.g;
  // ns.toast("message toast!?", "success");
  // ns.toast("message toast!?", "warning");
  // ns.toast("message toast!?", "info");
  // ns.toast("message toast!?", "error");

  // await ns.share();
  // ns.toast("forever toast!?", "success", null);
  // let faction = "CyberSec";
  // const FACTIONS = {
  //   CyberSec: {
  //     name: "CyberSec",
  //     augments: ["Neurotrainer I", "Synaptic Enhancement Implant"],
  //   },
  // };
  // ns.singularity.workForFaction(faction);
  // let augments = ns.singularity.getAugmentationsFromFaction(faction);
  // ns.tprint(augments);
  // ns.singularity.purchaseAugmentation(faction, augments[0]);
  // ns.singularity.commitCrime

  // let invite = ns.singularity.checkFactionInvitations();
  // if (invite.includes(faction)) {
  //   ns.singularity.joinFaction(invite[0]);
  // }

  // let isBusy = ns.singularity.isBusy();
  // if (!isBusy) {
  //   ns.singularity.workForFaction(faction, "Hacking Contracts");
  // }

  const HOME = "home";
  const HOME_HACK = "home-hack.js";
  const SERVERS = "buy-servers.js";
  const PROGRAMS = "buy-programs.js";
  const CONTRACTS = "contracts.js";
  const UPGRADES = "upgrades.js";

  // ns.exec(SERVERS, HOME);
  let player = ns.getPlayer();
  ns.tprint(player);
}
