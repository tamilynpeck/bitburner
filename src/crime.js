/** @param {NS} ns */
/** @param {import(".").NS} ns */

import { gym } from "gym.js";

const MINUTE = 60000;
const CRIMES = {
  SHOPLIFT: { name: "Shoplift" },
  ROBSTORE: { name: "Rob store" },
  MUG: { name: "Mug someone" }, // good for 4 stats
  LARCENY: { name: "Larceny" }, // 1.5 Karma
  DRUGS: { name: "Deal drugs" },
  BONDFORGERY: { name: "Bond Forgery" },
  TRAFFICKARMS: { name: "Traffick illegal Arms" }, // 1
  HOMICIDE: { name: "Homicide" }, // 3
  GRANDTHEFTAUTO: { name: "GRANDTHEFTAUTO" }, // 5
  KIDNAP: { name: "Kidnap" }, // 6
  ASSASSINATION: { name: "Assassinate" }, // 10
  HEIST: { name: "Heist" }, // 15
};

export async function main(ns) {
  while (true) {
    let karma = ns.heart.break();
    ns.tprint(`Karma: ${karma}`);

    let crimeToCommit = false;
    if (ns.singularity.getCrimeChance(CRIMES.HOMICIDE.name) == 1) {
      crimeToCommit = CRIMES.HOMICIDE.name;
      ns.singularity.commitCrime(crimeToCommit);
    } else if (checkFaction(ns)) {
      ns.tprint(`Faction Work`);
    } else if (ns.singularity.getCrimeChance(CRIMES.MUG.name) == 1) {
      crimeToCommit = CRIMES.MUG.name;
      ns.singularity.commitCrime(crimeToCommit);
    } else {
      ns.tprint(`gym`);
      await gym(ns);
    }

    await ns.sleep(MINUTE * 5);
  }
}

function checkFaction(ns) {
  let faction = "Slum Snakes";
  let invite = ns.singularity.checkFactionInvitations();
  if (invite.includes(faction)) {
    ns.singularity.joinFaction(faction);
  }
  return ns.singularity.workForFaction(faction, "Security Work");
}

// function getAllCrimeStats(ns) {
//   for (var crime in CRIMES) {
//     ns.tprint(crime);
//     let stats = ns.singularity.getCrimeStats(crime);
//     for (var stat in stats) {
//       ns.tprint(`${stat}: ${stats[stat]}`);
//     }
//     let chance = ns.singularity.getCrimeChance(crime);
//     if (chance == 1) crimeToCommit = crime;

//     ns.tprint(
//       "chance: ",
//       Math.floor(ns.singularity.getCrimeChance(crime) * 100),
//       "%"
//     );
//   }
// }
