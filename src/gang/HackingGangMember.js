/** @param {NS} ns */
/** @param {import(".").NS} ns */
import { GangTasks } from "./gang/utils.js";

export class HackingGangMember {
  constructor(ns, name) {
    this.ns = ns;
    this.gang = ns.gang;
    this.name = name;
    this.inTraining = GangTraining.includes(this.info().task);
    this.type = "Hacking";
  }

  info() {
    return this.gang.getMemberInformation(this.name);
  }

  equipment() {
    let info = this.info();
    let upgrades = info.upgrades;
    let augmentations = info.augmentations;
    let equipment = [...upgrades, ...augmentations];

    let equipmentOptions = this.gang.getEquipmentNames();
    for (var i = 0; i < equipmentOptions.length; i++) {
      let equip = equipmentOptions[i];
      let stats = this.gang.getEquipmentStats(equip);
      if (!("hack" in stats) && !("cha" in stats)) {
        continue;
      }

      let moneyThreshold = this.ns.getServerMoneyAvailable("home") / 2;
      if (
        !equipment.includes(equip) &&
        ("hack" in stats || "cha" in stats) &&
        this.gang.getEquipmentCost(equip) < moneyThreshold
      ) {
        // this.ns.tprint(`Buy ${equip} for ${this.name}`);
        this.gang.purchaseEquipment(this.name, equip);
      }
    }
  }

  shouldAscend(mult = 1.5) {
    let result = this.gang.getAscensionResult(this.name);
    if (!result) return false;
    let points = 0;
    let stats = ["hack", "cha"];

    stats.forEach((stat) => {
      // this.ns.tprint(`${this.name}: ${stat} @ ${result[stat]}!`);
      if (result[stat] >= mult) points += 1;
    });
    // this.ns.tprint(`${this.name}: has ${points} ascension points ready!`);
    return points == 2;
  }

  ascend() {
    this.ns.tprint(`Ascending ${this.name}!`);
    this.gang.ascendMember(this.name);
  }

  train(task) {
    this.gang.setMemberTask(this.name, task);
    this.ns.tprint(`${this.name} set to ${task}`);
  }

  training() {
    let info = this.info();
    let task = info.task;
    // TODO: change base on gang type!

    let ascension = this.gang.getAscensionResult(this.name);

    let hack = ascension ? ascension.hack : 1;
    let cha = ascension ? ascension.cha : 1;

    if (task == GangTasks.UNASSIGNED) {
      this.train(GangTasks.TRAIN_HACKING);
    }
    if (
      task == GangTasks.TRAIN_HACKING &&
      (info.hack * 0.25 > info.cha || hack * 0.25 > cha || cha < 1.5)
    ) {
      this.train(GangTasks.TRAIN_CHARISMA);
    }
    if (
      task == GangTasks.TRAIN_CHARISMA &&
      info.cha > info.hack * 0.25 &&
      cha > hack * 0.25 &&
      hack < 1.5
    ) {
      this.train(GangTasks.TRAIN_HACKING);
    }
  }

  manage() {
    if (this.info().task == GangTasks.UNASSIGNED) {
      this.train(GangTasks.TRAIN_HACKING);
    }

    let shouldAscend = this.shouldAscend();
    if (shouldAscend && this.info().task != "Ethical Hacking") {
      this.ascend();
    }

    if (this.inTraining) {
      this.training();
    }

    this.equipment();
  }
}

const GangTraining = [
  // GangTasks.TRAIN_COMBAT,
  GangTasks.TRAIN_CHARISMA,
  GangTasks.TRAIN_HACKING,
];
