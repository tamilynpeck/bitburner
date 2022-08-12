/** @param {NS} ns */
export async function main(ns) {
	const args = arguments[0].args
	const target = args[0] ? args[0] : ns.getHostname()

    const moneyThresh = ns.getServerMaxMoney(target) * 0.75;
    let securityThresh = ns.getServerMinSecurityLevel(target) + 5;
    securityThresh = securityThresh <= 20 ? 20 : securityThresh

    while (true) {
        if (ns.getServerSecurityLevel(target) > securityThresh) {
            await ns.weaken(target);
        } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
            await ns.grow(target);
        } else {
            await ns.hack(target);
        }
    }
}