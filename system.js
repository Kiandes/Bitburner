/** @param {NS} ns */
export async function main(ns) {

  // game starts with 32gb of ram (BN.1.2)
  // get all .exe programs
  // get purchase servers

  //\\ SCRIPT SETTINGS
  ns.disableLog("ALL")
  ns.clearLog()

  //\\ GENERAL DATA
  //\\ SCRIPT SPECIFIC FUNCTIONS
  //\\ MAIN LOGIC
  ns.tprint("Booting")
  await ns.sleep(1000)
  ns.tprint("Analyzing...")
  await ns.sleep(1000)
  ns.tprint("INIT Process")
  await ns.sleep(2000)

  if (ns.getServerMaxRam("home") === 32) {

    // step 1: get more ram 

    ns.run("bin/genesis/collectStage1.js")
    await ns.sleep(1000)
    ns.run("purchase/hacknet.js", 1, 15, 100, 32, 1)
    await ns.sleep(1000)
    ns.run("purchase/servers.js", 1, 512)

  } else {

    ns.run("bin/genesis/collectStage3.js")
    await ns.sleep(1000)
    ns.run("purchase/hacknet.js", 1)
    await ns.sleep(1000)
    ns.run("purchase/servers.js", 1)

  }
}
