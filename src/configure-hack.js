/** @param {NS} ns */
import { run_nuke } from "nuke.js"
import { isHackable } from "utils.js"

export async function configureHack(ns, target, server = null) {
    const hostServer = server ? server : target
    const scriptServer = "home"
    let hasAccess = ns.hasRootAccess(target)
    if (!hasAccess) {
        run_nuke(ns, target)
        hasAccess = ns.hasRootAccess(target)
        if (!hasAccess) {
            return
        }

        const hackLevel = ns.getHackingLevel()
        const requiredHackingLevel = ns.getServerRequiredHackingLevel(target)
        if (hackLevel < requiredHackingLevel) {
            ns.tprint(`${hackLevel} / ${requiredHackingLevel} Hacking Level on ${target}`)
            return
        }
    }

    if (!isHackable(ns, target, server ? false : true)) {
        return
    }

    const script = "hacking-loop.js"
    const files = ns.ls(hostServer)
    if (!(script in files)) {
        await ns.scp(script, scriptServer, hostServer)
    }

    const ramNeeded = ns.getScriptRam(script, hostServer)
    const maxRam = ns.getServerMaxRam(hostServer)
    const usedRam = ns.getServerUsedRam(hostServer)
    const ramAvailable = maxRam - usedRam
    if (ramAvailable == 0) {
        ns.tprint(`no ram available on ${hostServer}`)
        return
    }

    const threads = Math.floor(ramAvailable / ramNeeded) - (hostServer == "home" ? 10 : 0)
    if (threads >= 1) {
        ns.tprint(`exec ${script} -t ${threads} ${target} on ${hostServer}`)
        ns.exec(script, hostServer, threads, target)
    }
}