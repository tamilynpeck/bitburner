/** @param {NS} ns */
export async function main(ns) {

    ns.tprint("Hacking Into: ", target)

    if (!ns.fileExists("BruteSSH.exe", "home")) {
        ns.brutessh(target);
    }
    if (!ns.fileExists("FTPCrack.exe", "home")) {
        ns.ftpcrack(target);
    }
    if (!ns.fileExists("relaySMTP.exe", "home")) {
        ns.relaysmtp(target);
    }
    if (!ns.fileExists("HTTPWorm.exe", "home")) {
        ns.httpworm(target);
    }
    if (!ns.fileExists("SQLInject.exe", "home")) {
        ns.sqlinject(target);
    }

    // ns.tprint()

    ns.nuke(target)
}