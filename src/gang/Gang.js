/** @param {NS} ns */
/** @param {import(".").NS} ns */
import { GangMember } from "./gang/GangMember.js";
import { GangTasks, padding } from "./gang/utils.js";

export class Gang {
  constructor(ns, faction = "Slum Snakes") {
    this.ns = ns;
    this.gang = ns.gang;
    if (!ns.gang.inGang()) this.gang.createGang(faction);
  }

  info(print = false) {
    const info = this.gang.getGangInformation();
    if (print) this.ns.tprint(info);
    return info;
  }

  members() {
    // return list of objects?
    return this.gang.getMemberNames();
  }

  recruit() {
    if (this.gang.canRecruitMember()) {
      let memberCount = this.members().length + 1;
      let newName = `homey-dude-${memberCount}`;
      let newMemeber = this.gang.recruitMember(newName);
      if (newMemeber) {
        let member = new GangMember(newName);
        this.ns.toast(`GANG: Recruited New Member" ${newName}`);
        member.train(GangTasks.TRAIN_COMBAT);
      }
    }
  }

  manage() {
    this.recruit();
    let members = this.members();

    for (var i = 0; i < members.length; i++) {
      let name = members[i];
      let member = new GangMember(this.ns, name);
      // this.ns.tprint(member.info());

      member.manage();

      // if (
      //   member.task == GangTasks.TRAIN_COMBAT &&
      //   member.str > 150 * member.str_asc_mult
      // ) {
      //   this.train(name, GangTasks.TRAIN_CHARISMA);
      // }

      // train
      // upgrade tasks... when...
      // buy equipment, vehicals, etc.
    }
  }

  tasks() {
    const tasks = this.gang.getTaskNames();
    for (var i = 0; i < tasks.length; i++) {
      let task = this.gang.getTaskStats(tasks[i]);
      // this.ns.tprint(task);
      this.ns.tprint(`${i}: ${task.name}`);
      this.ns.tprint(
        `baseRespect: ${padding(task.baseRespect)} baseWanted: ${padding(
          task.baseWanted
        )} baseMoney: ${padding(task.baseMoney)} hackWeight: ${padding(
          task.hackWeight
        )} strWeight: ${padding(task.strWeight)} defWeight: ${padding(
          task.defWeight
        )} dexWeight: ${padding(task.dexWeight)} agiWeight: ${padding(
          task.agiWeight
        )} chaWeight: ${padding(task.chaWeight)} difficulty: ${padding(
          task.difficulty
        )} territory: money: ${task.territory.money} respect: ${
          task.territory.respect
        } wanted: ${task.territory.wanted}`
      );
    }
    return tasks;
  }
}
