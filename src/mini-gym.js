
const MINUTE = 60000;

/** @param {NS} ns */
export async function main(ns) {
  while (true) {
    const gym = ns.enums.LocationName.Sector12PowerhouseGym;
    const GymType = ns.enums.GymType;
    // ns.enums.LocationName.Sector12IronGym;
    ns.tprint(`Gym at: ${gym}`);
    ns.singularity.gymWorkout(gym, GymType.strength);
    await ns.sleep(MINUTE);
    // ns.singularity.gymWorkout(gym, GymType.defense);
    // await ns.sleep(MINUTE);
    // ns.singularity.gymWorkout(gym, GymType.dexterity);
    // await ns.sleep(MINUTE);
    // ns.singularity.gymWorkout(gym, GymType.agility);
    // await ns.sleep(MINUTE);
  }
}
