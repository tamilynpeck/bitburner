/** @param {NS} ns */
import {run_nuke} from "nuke.js"

export async function main(ns) {
    const args_obj = arguments[0]
    const target = args_obj.args[0] ? args_obj.args[0] : ns.getHostname()
	ns.tprint(target)
	
	run_nuke(ns, target)
}