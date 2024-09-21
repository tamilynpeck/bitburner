/** @param {NS} ns */
/** @param {import(".").NS} ns */

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
  let karma = ns.heart.break();
  ns.tprint(`Karma: ${karma} ${Math.round((karma / -54000) * 100)}%`);

  let crimeToCommit = ns.args[0];
  if (crimeToCommit == "h") {
    crimeToCommit = CRIMES.HOMICIDE.name;
    ns.singularity.commitCrime(crimeToCommit);
  } else if (crimeToCommit == "m") {
    crimeToCommit = CRIMES.MUG.name;
    ns.singularity.commitCrime(crimeToCommit);
  }
}
