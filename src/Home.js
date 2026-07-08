const HOME = "home";

export class Home {
  /** @param {NS} ns */
  constructor(ns) {
    this.ns = ns;
    this.programs = ns.enums.ProgramName;
    this.SCRIPTS = {
      // darkweb? TOR
      brutessh: { name: this.programs.bruteSsh, cost: 500000, exec: ns.brutessh },
      ftp: { name: this.programs.ftpCrack, cost: 15000000, exec: ns.ftpcrack },
      smtp: { name: this.programs.relaySmtp, cost: 5000000 },
      http: { name: this.programs.httpWorm, cost: 30000000 },
      sql: { name: this.programs.sqlInject, cost: 250000000 },
      deep2: { name: this.programs.deepScan2, cost: 25000000 },
      formulas: { name: this.programs.formulas, cost: 5000000000 },
    };
  }

  balance() {
    return this.ns.getServerMoneyAvailable(HOME);
  }

  fileExists(script) {
    return this.ns.fileExists(script, HOME);
  }

  // brutessh(target) {
  //   return this.SCRIPTS.brutessh.exec(target);
  // }
}
