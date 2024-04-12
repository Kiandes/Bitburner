import { scriptStart } from "modules/scripting"
import { NmapClear, NmapRamServers } from "modules/network"

/** @param {NS} ns */
export async function main(ns) {

    //\\ SCRIPT SETTINGS
    scriptStart(ns)

    //\\ GENERAL DATA
    const SCRIPT = "bin/genesis/share.js"

    //\\ MAIN LOGICA
    NmapClear(ns)
    while (true) {

        await ns.sleep(1000)
        NmapRamServers(ns).forEach(server => {

            if (ns.hasRootAccess(server)) {
                if (ns.scp(SCRIPT, server, "home")) {

                    let ramAvailable = ns.getServerMaxRam(server) - ns.getServerUsedRam(server)
                    let threadsAvailable = Math.floor(ramAvailable / ns.getScriptRam(SCRIPT))
                    if (threadsAvailable > 1) {
                        ns.exec(SCRIPT, server, threadsAvailable)
                    }

                }
            }
        })
    }
} 
