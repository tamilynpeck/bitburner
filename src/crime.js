import { gym } from "./gym.js";

const MINUTE = 60000;

/** @param {NS} ns */
export async function main(ns) {
    const CRIMES = {
      SHOPLIFT: { name: ns.enums.CrimeType.shoplift},
      ROB_STORE: { name: ns.enums.CrimeType.robStore },
      MUG: { name: ns.enums.CrimeType.mug },
      LARCENY: { name: ns.enums.CrimeType.larceny },
      DRUGS: { name: ns.enums.CrimeType.dealDrugs },
      BOND_FORGERY: { name: ns.enums.CrimeType.bondForgery },
      TRAFFICKARMS: { name: ns.enums.CrimeType.traffickArms }, // 1
      HOMICIDE: { name: ns.enums.CrimeType.homicide }, // 3
      GRANDTHEFTAUTO: { name: ns.enums.CrimeType.grandTheftAuto }, // 5
      KIDNAP: { name: ns.enums.CrimeType.kidnap }, // 6
      ASSASSINATION: { name: ns.enums.CrimeType.assassination }, // 10
      HEIST: { name: ns.enums.CrimeType.heist }, // 15
    };

  while (true) {
    let karma = ns.heart.break();
    ns.tprint(`Karma: ${karma}`);

    let crimeToCommit = null;
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

/** @param {NS} ns */
function checkFaction(ns) {
  let faction = ns.enums.FactionName.SlumSnakes;
  let invite = ns.singularity.checkFactionInvitations();
  if (invite.includes(faction)) {
    ns.singularity.joinFaction(faction);
  }
  return ns.singularity.workForFaction(faction, ns.enums.FactionWorkType.security);
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
