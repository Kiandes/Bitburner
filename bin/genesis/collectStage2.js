import { Nmap, NmapClear, NmapMoneyServers, NmapRamServers, copyHackScripts, getRootAccess } from "modules/network"
import { scriptPath } from "modules/scripting"

/** @param {NS} ns */
export async function main(ns) {

    // get root access to all servers
    // find servers with free ram
    // copy hack scripts to severs with ram
    // run grow en weak on net servers
    // run hack on home server
    // repeat process 

    //\\ SCRIPT SETTINGS
    ns.tprint("Active")
    ns.disableLog("ALL")
    ns.clearLog()

    //\\ GENERAL DATA
    const scripts = scriptPath(ns)
    const hackChance = 0.8
    const numOfServers = 8

    let initRun = true
    let servers

    //\\ MAIN LOGICA
    NmapClear(ns)

    while (true) {
        await ns.sleep(500)

        // todo: if net ram is more than x, kill script en go to collectStage3 for more profit

        servers = Nmap(ns)
        servers.forEach(server => {
            getRootAccess(ns, server)
            copyHackScripts(ns, server)
        })

        servers = NmapRamServers(ns)
        for (let server of servers) {

            if (initRun) { await ns.sleep(1000) } else { await ns.sleep(100) }

            // (get server max ram > subtract server used ram) > devide by script ram
            // run script on server with thread

            if (ns.hasRootAccess(server)) {
                let threads = Math.floor((ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) / ns.getScriptRam(scripts.gw))
                if (threads >= 1 && threads < 9999999999) {
                    ns.exec(scripts.gw, server, threads, hackChance, numOfServers)
                }
            }
        }

        initRun = false

        servers = NmapMoneyServers(ns)
        for (let server of servers) {

            // hack servers at 50% money max
            // keep balance above 40% money avaliable

            if (ns.hackAnalyzeChance(server) > hackChance) {

                let serverMoneyMax = ns.getServerMaxMoney(server)
                let serverMoneyAva = ns.getServerMoneyAvailable(server)
                let moneyProcent = (serverMoneyAva / serverMoneyMax) * 100

                if (moneyProcent > 40) {

                    // check home for space to run script 

                    let hackThreads = Math.floor(ns.hackAnalyzeThreads(server, serverMoneyMax / 10))
                    let threadsAvailable = Math.floor((ns.getServerMaxRam("home") - ns.getServerUsedRam("home")) / ns.getScriptRam(scripts.gw))

                    if (threadsAvailable >= 1) {

                        if (threadsAvailable > hackThreads) {
                            if (!ns.isRunning(scripts.hack, "home", server, 0)) {
                                ns.exec(scripts.hack, "home", hackThreads, server, 0)
                            }

                        }

                        if (threadsAvailable < hackThreads) {
                            if (!ns.isRunning(scripts.hack, "home", server, 0)) {
                                ns.exec(scripts.hack, "home", threadsAvailable, server, 0)

                            }
                        }
                    }
                }
            }
        }
    }
}