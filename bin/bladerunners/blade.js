import { scriptPath, scriptStart } from "/lib/settings"

/** @param {NS} ns */
export async function main(ns) {

    /**
    *  ____  _           _                                           
    * | __ )| | __ _  __| | ___ _ __ _   _ _ __  _ __   ___ _ __ ___ 
    * |  _ \| |/ _` |/ _` |/ _ \ '__| | | | '_ \| '_ \ / _ \ '__/ __|
    * | |_) | | (_| | (_| |  __/ |  | |_| | | | | | | |  __/ |  \__ \
    * |____/|_|\__,_|\__,_|\___|_|   \__,_|_| |_|_| |_|\___|_|  |___/
    * 
    * General: 
    * Contracts: 
    * Operations: 
    * Blackops: 
    * Skills: 
    */

    //\\ SCRIPT SETTINGS
    scriptStart(ns, true)

    //\\ GENERAL DATA
    const SCRIPT = scriptPath(ns)

    //\\ FUNCTIONS
    //\\ LOGIC
    while (true) {
        await ns.sleep(1000)
        ns.clearLog()

    }
}
