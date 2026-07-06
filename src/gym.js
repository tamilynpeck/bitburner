const MINUTE = 60000;

/** @param {NS} ns */
export async function main(ns) {
  let maxLevel = ns.args[0] ? Number(ns.args[0]) : 30;
  await gym(ns, maxLevel);
}

/** @param {NS} ns */
export async function gym(ns, maxLevel = 30) {
  while (true) {
    let player = ns.getPlayer();
    let skills = player.skills;

    if (
      skills.hacking < 30 ||
      (skills.strength >= maxLevel &&
        skills.defense >= maxLevel &&
        skills.dexterity >= maxLevel &&
        skills.agility >= maxLevel &&
        skills.charisma >= maxLevel)
    ) {
      ns.tprint(`return from gym at ${maxLevel}`);
      return;
    }

    // def setFocus(ns) = is busy ?  true : false
    const GymType = ns.enums.GymType;
    const gym = pickGym(ns);
    ns.tprint(`Gym at: ${gym}`);
    if (skills.strength < maxLevel) {
      ns.singularity.gymWorkout(gym, GymType.strength, setFocus(ns));
      await ns.sleep(MINUTE);
    }
    if (skills.defense < maxLevel) {
      ns.singularity.gymWorkout(gym, GymType.defense, setFocus(ns));
      await ns.sleep(MINUTE);
    }
    if (skills.dexterity < maxLevel) {
      ns.singularity.gymWorkout(gym, GymType.dexterity, setFocus(ns));
      await ns.sleep(MINUTE);
    }
    if (skills.agility < maxLevel) {
      ns.singularity.gymWorkout(gym, GymType.agility, setFocus(ns));
      await ns.sleep(MINUTE);
    }
    if (skills.charisma < skills.strength) {
      ns.singularity.universityCourse(
        ns.enums.LocationName.Sector12RothmanUniversity,
        ns.enums.UniversityClassType.leadership,
        setFocus(ns)
      );
      await ns.sleep(MINUTE);
    }
  }
}

/** @param {NS} ns */
function setFocus(ns) {
  let focused = ns.singularity.isFocused();
  return focused ? true : false;
}

/** @param {NS} ns */
function pickGym(ns) {
  return ns.enums.LocationName.Sector12PowerhouseGym;
  let money = ns.getServerMoneyAvailable("home");
  if (money > 1000000) return ns.enums.LocationName.Sector12PowerhouseGym;
  return ns.enums.LocationName.Sector12IronGym;
}
