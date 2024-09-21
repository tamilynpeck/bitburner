/** @param {NS} ns */
/** @param {import(".").NS} ns */

const MINUTE = 60000;

export async function main(ns) {
  let maxLevel = ns.args[0] ? ns.args[0] : 30;
  await gym(ns, maxLevel);
}

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

    let gym = pickGym(ns);
    ns.tprint(`Gym at: ${gym}`);
    if (skills.strength < maxLevel) {
      ns.singularity.gymWorkout(gym, "Strength", setFocus(ns));
      await ns.sleep(MINUTE);
    }
    if (skills.defense < maxLevel) {
      ns.singularity.gymWorkout(gym, "Defense", setFocus(ns));
      await ns.sleep(MINUTE);
    }
    if (skills.dexterity < maxLevel) {
      ns.singularity.gymWorkout(gym, "Dexterity", setFocus(ns));
      await ns.sleep(MINUTE);
    }
    if (skills.agility < maxLevel) {
      ns.singularity.gymWorkout(gym, "Agility", setFocus(ns));
      await ns.sleep(MINUTE);
    }
    if (skills.charisma < skills.strength) {
      ns.singularity.universityCourse(
        "Rothman University",
        "Leadership",
        setFocus(ns)
      );
      await ns.sleep(MINUTE);
    }
  }
}

function setFocus(ns) {
  let focused = ns.singularity.isFocused();
  return focused ? true : false;
}

function pickGym(ns) {
  return "powerhouse gym";
  let money = ns.getServerMoneyAvailable("home");
  if (money > 1000000) return "powerhouse gym";
  return "iron gym";
}
