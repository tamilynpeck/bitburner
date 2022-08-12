/** @param {NS} ns */
import { configureHack } from "configure-hack.js"

export async function main(ns) {
	const money = ns.getServerMoneyAvailable("home");
	// function for list of hacked servers
	const servers = ["n00dles", "foodnstuff", "sigma-cosmetics", "joesguns", "hong-fang-tea",
		"harakiri-sushi", "iron-gym", "max-hardware", "nectar-net", "zer0", "neo-net", "silver-helix",
		"phantasy", "omega-net", "netlink", "johnson-ortho", "the-hub", "computek", "crush-fitness", "rothman-uni"]

	// while (true)
	// sleep 1 min
	// based on balance... 

	let ram = calcMaxRamSize(ns)

	ns.tprint("getPurchaseServerLimit: ", ns.getPurchasedServerLimit())
	const purchasedServers = ns.getPurchasedServers()
	ns.tprint(purchasedServers.length)
	let server = ""

	for (var i = 0; i < purchasedServers.length; i++) {
		server = purchasedServers[i]
		if (ns.serverExists(server)) {
			await checkForUpgrade(ns, server, ram)
		}
	}

	for (var i = 0; i < servers.length; i++) {
		server = servers[i]
		if (canBuyServerSize(ns, ram)) {
			await set_server(ns, server, ram)
		} else {
			break
		}
	}
}

async function set_server(ns, target, ram) {
	let serverName = `server-${target}-${ram}`
	if (serverName == "server-hong-fang-tea-2048") { return }
	if (serverName == "server-n00dles-4096") { return }

	if (!ns.serverExists(serverName)) {
		ns.purchaseServer(serverName, ram)
		ns.tprint(`Purchase Server: ${serverName} targetting ${target}`)
		await configureHack(ns, target, serverName)
	}
}

function canBuyServerSize(ns, ram) {
	const money = ns.getServerMoneyAvailable("home");
	const cost = ns.getPurchasedServerCost(ram);
	const percentage = Math.round(cost / money * 100)
	ns.tprint(`cost: ${cost} ${percentage}% of balance.`)
	return cost < money
}

function calcMaxRamSize(ns) {
	const money = ns.getServerMoneyAvailable("home");
	// const costPerRam = 55000
	// leave money to buy the important files.
	let ram = 64
	if (money >= 14080000) {
		ram = 256
	}
	if (money >= 28160000) {
		ram = 512
	}
	if (money >= 56320000) {
		ram = 1024
	}
	if (money >= 112640000) {
		ram = 2048
	}
	if (money >= 4096 * 55000) {
		ram = 4096
	}
	return ram
}

async function checkForUpgrade(ns, server, maxRam=2048) {
	const money = ns.getServerMoneyAvailable("home");
	const ram = server.split("-").slice(-1)[0]
	const upgradeRam = ram * 2
	// ns.tprint(`${server} ${ram} * 2 is ${upgradeRam}`)
	const upgradeCost = ns.getPurchasedServerCost(upgradeRam)
	const target = server.replace("server-","").replace(`-${ram}`,"")

	if (upgradeRam < maxRam && upgradeCost < money) {
		ns.tprint(`Delete Server: ${server} targetting ${target}`)
		ns.killall(server);
		ns.deleteServer(server)
		await set_server(ns, target, upgradeRam)
	}
}