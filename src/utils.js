/** @param {NS} ns */

export async function main(ns) { }

export function getServers() {
	return ["n00dles", "foodnstuff", "sigma-cosmetics", "joesguns", "hong-fang-tea", "harakiri-sushi", "iron-gym",
		"darkweb", "max-hardware", "CSEC", "zer0", "nectar-net", "neo-net", "omega-net", "silver-helix", "phantasy",
		"netlink", "johnson-ortho", "avmnite-02h", "the-hub", "computek", "crush-fitness", "rothman-uni", "syscore", "catalyst",
		"zb-institute", "I.I.I.I", "summit-uni", "lexo-corp", "rho-construction", "millenium-fitness", "aevum-police", "alpha-ent",
		"galactic-cyber", "global-pharm", "snap-fitness", "aerocorp", "unitalife", "deltaone", "omnia", "icarus", "defcomm", "univ-energy",
		"solaris", "zeus-med", "infocomm", "zb-def", "taiyang-digital", "nova-med", "titan-labs", "microdyne", "applied-energetics",
		"run4theh111z", "helios", "fulcrumtech", "vitalife", "stormtech", "4sigma", "kuai-gong", "omnitek", ".", "clarkinc", "blade",
		"b-and-a", "powerhouse-fitness", "nwo", "ecorp", "megacorp", "The-Cave", "fulcrumassets"]
}
// function for list of hacked servers

export function unique_server_list(ns, count) {
	let servers = ns.scan("home")
	let temp = []

	for (var i = 0; i < count; i++) {
		temp = ns.scan(servers[i])
		servers.push(...temp)
		servers = [...new Set(servers)]
	}
	return servers
}

export function isHackable(ns, target, onTargetServer = false) {
	if (!ns.hasRootAccess(target)) {
		return false
	}
	const hackLevel = ns.getHackingLevel()
	if (hackLevel < ns.getServerRequiredHackingLevel(target)) {
		return false
	}
	if (ns.getServerMaxMoney(target) == 0) {
		return false
	}
	if (onTargetServer && ns.getServerMaxRam(target) == 0) {
		return false
	}
	return true
}