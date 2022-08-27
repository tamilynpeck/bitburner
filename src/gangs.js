/** @param {NS} ns */
/** @param {import(".").NS} ns */

import { Gang } from "./gang/Gang.js";

export async function main(ns) {
  let gang = new Gang(ns);
  gang.manage();
  // myGang.info(true);
  // gang.tasks();
}

// let ex = {
//   faction: "Slum Snakes",
//   isHacking: false,
//   moneyGainRate: 91.99625506434896,
//   power: 1,
//   respect: 23.292024994723732,
//   respectGainRate: 0.006661180905278964,
//   territory: 0.14285714285714285,
//   territoryClashChance: 0,
//   territoryWarfareEngaged: false,
//   wantedLevel: 11.988872020641184,
//   wantedLevelGainRate: 0.0027311537794884374,
//   wantedPenalty: 0.6601880044200691,
// };

/**
    let getMemberInformationExample = {
    name: "member1",
    task: "Strongarm Civilians",
    earnedRespect: 20.11615198613414,
    hack: 5,
    str: 58,
    def: 58,
    dex: 55,
    agi: 55,
    cha: 12,
    hack_exp: 74.91791318182943,
    str_exp: 1992.9402911972763,
    def_exp: 1992.9402911972763,
    dex_exp: 1939.9166821973777,
    agi_exp: 1803.9614973176106,
    cha_exp: 213.87629480432278,
    hack_mult: 1,
    str_mult: 1.1440000000000001,
    def_mult: 1.1440000000000001,
    dex_mult: 1.1,
    agi_mult: 1.1440000000000001,
    cha_mult: 1.04,
    hack_asc_mult: 1,
    str_asc_mult: 1,
    def_asc_mult: 1,
    dex_asc_mult: 1,
    agi_asc_mult: 1,
    cha_asc_mult: 1,
    hack_asc_points: 0,
    str_asc_points: 0,
    def_asc_points: 0,
    dex_asc_points: 0,
    agi_asc_points: 0,
    cha_asc_points: 0,
    upgrades: ["Glock 18C", "Baseball Bat", "Ford Flex V20"],
    augmentations: [],
    respectGain: 0.004151839228969363,
    wantedLevelGain: 0.006314566197744367,
    moneyGain: 170.37562373495268,
  };
 */
