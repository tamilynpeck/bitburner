import { GangTasks } from "./utils.js";

export class GangMember {
  /** @param {NS} ns */
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
      let moneyThreshold = this.ns.getServerMoneyAvailable("home") / 2;

      if (
        !equipment.includes(equip) &&
        this.gang.getEquipmentCost(equip) < moneyThreshold
      ) {
        this.ns.tprint(`Buy ${equip} for ${this.name}`);
        this.gang.purchaseEquipment(this.name, equip);
      }
    }
  }

  shouldAscend(mult = 1.5) {
    let result = this.gang.getAscensionResult(this.name);
    if (!result) return false;
    let points = 0;
    // let stats = ["str", "def", "dex", "agi", "cha"];
    let stats = ["hack", "str", "agi", "cha"];
    this.ns.tprint(result);
    stats.forEach((stat) => {
      if (result[stat] >= mult) points += 1;
    });
    // this.ns.tprint(`${this.name}: has ${points} ascension points ready!`);
    return points == 4;
  }

  ascend() {
    this.ns.tprint(`Ascending ${this.name}!`);
    this.gang.ascendMember(this.name);
    this.train(GangTasks.TRAIN_COMBAT);
  }

  train(task) {
    this.gang.setMemberTask(this.name, task);
    this.ns.tprint(`${this.name} set to ${task}`);
  }

  training() {
    // TODO: change base on gang type!
    let shouldAscend = this.shouldAscend();
    if (shouldAscend) {
      this.ascend();
    }

    let info = this.info();
    let task = info.task;
    this.ns.tprint(task);
    if (task == GangTasks.UNASSIGNED) {
      this.train(GangTasks.TRAIN_HACKING);
    }
    if (task == GangTasks.TRAIN_COMBAT && info.hack * 0.25 > info.cha) {
      this.train(GangTasks.TRAIN_CHARISMA);
    }
    if (task == GangTasks.TRAIN_CHARISMA && info.cha > info.hack * 0.25) {
      this.train(GangTasks.TRAIN_HACKING);
    }
    // if (task == GangTasks.TRAIN_HACKING && info.hack > info.agi * 10) {
    //   this.ns.tprint(`Switch TRAIN_COMBAT`);
    //   this.train(GangTasks.TRAIN_COMBAT);
    // }
  }

  manage() {
    this.training();
    if (this.info().task == GangTasks.UNASSIGNED) {
      this.train(GangTasks.TRAIN_COMBAT);
      this.inTraining = GangTraining.includes(this.info().task);
    }

    this.equipment();
  }
}

export const GangTraining = [
  GangTasks.TRAIN_COMBAT,
  GangTasks.TRAIN_CHARISMA,
  GangTasks.TRAIN_HACKING,
];
