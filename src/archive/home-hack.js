/** @param {NS} ns */
import { configureHack } from "configure-hack.js"

export async function main(ns) {
	const args_obj = arguments[0]
	const target = args_obj.args[0] ? args_obj.args[0] : ns.getHostname()
	ns.tprint(target)

	await configureHack(ns, target, "home")
}