/** @param {NS} ns */
/** @param {import(".").NS} ns */

const MINUTE = 60000;

export async function main(ns) {
  while (true) {
    let gym = "powerhouse gym";
    // "iron gym";
    ns.tprint(`Gym at: ${gym}`);
    ns.singularity.gymWorkout(gym, "Strength");
    await ns.sleep(MINUTE);
    // ns.singularity.gymWorkout(gym, "Defense");
    // await ns.sleep(MINUTE);
    // ns.singularity.gymWorkout(gym, "Dexterity");
    // await ns.sleep(MINUTE);
    // ns.singularity.gymWorkout(gym, "Agility");
    // await ns.sleep(MINUTE);
  }
}
