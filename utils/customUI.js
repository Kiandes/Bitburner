import { NmapTotalRam } from "lib/network"

/** @param {NS} ns */
export async function main(ns) {

    //\\ SCRIPT SETTINGS
    ns.disableLog("ALL")
    ns.clearLog()

    //\\ GENERAL DATA
    const HOOK0 = document.getElementById("overview-extra-hook-0")
    const HOOK1 = document.getElementById("overview-extra-hook-1")

    //\\ FUNCTIONS 
    function UIlog() {

        const slots = [
            ["Income", ns.formatNumber(ns.getTotalScriptIncome()[1])],
            ["NetRam", ns.formatRam(NmapTotalRam(ns))],
        ]

        let source = [], value = []
        slots.forEach(slot => { source.push(slot[0]); value.push(slot[1]) })

        try {

            HOOK0.innerText = source.join("\n")
            HOOK1.innerText = value.join("\n")

        } catch (e) { ns.tprint(e) }

        ns.atExit(() => {
            HOOK0.innerText = ""
            HOOK1.innerText = ""
        })
    }

    //\\ LOGIC
    while (true) {
        await ns.sleep(1000)
        ns.clearLog()
        UIlog()
    }
}