/** @param {NS} ns */
/** @param {import(".").NS} ns */

export const GangTasks = {
  UNASSIGNED: "Unassigned",
  TRAIN_COMBAT: "Train Combat",
  TRAIN_CHARISMA: "Train Charisma",
  TRAIN_HACKING: "Train Hacking",
};

export function padding(value, padding = 8) {
  return value.toString().padStart(padding, " ");
}
