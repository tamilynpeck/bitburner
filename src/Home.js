/** @param {NS} ns */
/** @param {import(".").NS} ns */

const HOME = "home";
// const SCRIPTS = {
//   // darkweb? TOR
//   brutessh: { name: "BruteSSH.exe", cost: 500000, haveScript: false },
//   ftp: { name: "FTPCrack.exe", cost: 500000 },
//   smtp: { name: "relaySMTP.exe", cost: 500000 },
//   http: { name: "HTTPWorm.exe", cost: 500000 },
//   deep2: { name: "DeepscanV2.exe", cost: 25000000 },
//   sql: { name: "SQLInject.exe", cost: 250000000 },
//   formulas: { name: "Formulas.exe", cost: 5000000000 },
// };

export class Home {
  constructor(ns) {
    this.ns = ns;
    this.SCRIPTS = {
      // darkweb? TOR
      brutessh: { name: "BruteSSH.exe", cost: 500000, exec: this.ns.brutessh },
      ftp: { name: "FTPCrack.exe", cost: 15000000, exec: this.ns.ftpcrack },
      smtp: { name: "relaySMTP.exe", cost: 5000000 },
      http: { name: "HTTPWorm.exe", cost: 30000000 },
      sql: { name: "SQLInject.exe", cost: 250000000 },
      deep2: { name: "DeepscanV2.exe", cost: 25000000 },
      formulas: { name: "Formulas.exe", cost: 5000000000 },
    };
  }

  balance() {
    return this.ns.getServerMoneyAvailable(HOME);
  }

  haveScript(script) {
    return this.ns.fileExists(script, HOME);
  }

  brutessh(target) {
    if (!target) {
      return haveScript(SCRIPTS.brutessh.name);
    }
    if (haveScript(SCRIPTS.brutessh.name)) {
      return SCRIPTS.brutessh.exec(target);
    }
  }
}
