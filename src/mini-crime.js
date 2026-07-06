const MINUTE = 60000;

/** @param {NS} ns */
export async function main(ns) {
    const CRIMES = {
    SHOPLIFT: { name: ns.enums.CrimeType.shoplift},
    ROB_STORE: { name: ns.enums.CrimeType.robStore },
    MUG: { name: ns.enums.CrimeType.mug }, // good for 4 stats
    LARCENY: { name: ns.enums.CrimeType.larceny }, // 1.5 Karma
    DRUGS: { name: ns.enums.CrimeType.dealDrugs },
    BOND_FORGERY: { name: ns.enums.CrimeType.bondForgery },
    TRAFFICKARMS: { name: ns.enums.CrimeType.traffickArms }, // 1
    HOMICIDE: { name: ns.enums.CrimeType.homicide }, // 3
    GRANDTHEFTAUTO: { name: ns.enums.CrimeType.grandTheftAuto }, // 5
    KIDNAP: { name: ns.enums.CrimeType.kidnap }, // 6
    ASSASSINATION: { name: ns.enums.CrimeType.assassination }, // 10
    HEIST: { name: ns.enums.CrimeType.heist }, // 15
  };

  let karma = ns.heart.break();
  ns.tprint(`Karma: ${karma} ${Math.round((karma / -54000) * 100)}%`);

  let crimeToCommit = String(ns.args[0]);
  if (crimeToCommit == "h") {
    ns.singularity.commitCrime(CRIMES.HOMICIDE.name);
  } else if (crimeToCommit == "m") {
    ns.singularity.commitCrime(CRIMES.MUG.name);
  }
}
