import { scriptStart, scriptExit } from "modules/scripting"

/** @param {NS} ns */
export async function main(ns) {

	//\\ SCRIPT SETTINGS
	scriptStart(ns)

	//\\ GENERAL DATA
	let PROGRAM = 0
	const FOCUS = false

	const ESSENTIAL = [
		{ name: "BruteSSH.exe", lvl: 50 },
		{ name: "FTPCrack.exe", lvl: 100 },
		{ name: "relaySMTP.exe", lvl: 250 },
		{ name: "HTTPWorm.exe", lvl: 500 },
		{ name: "SQLInject.exe", lvl: 750 },
	]

	const NON_ESSENTIAL = [
		{ name: "AutoLink.exe", lvl: 25 },
		{ name: "ServerProfiler.exe", lvl: 75 },
		{ name: "DeepscanV1.exe", lvl: 75 },
		{ name: "DeepscanV2.exe", lvl: 400 },
		{ name: "Formulas.exe", lvl: 1000 },
	]

	//\\ FUNCTIONS 
	function buyPrograms(program) {
		if (ns.singularity.purchaseTor() && ns.getServerMoneyAvailable("home") > ns.singularity.getDarkwebProgramCost(program.name)) {
			ns.singularity.purchaseProgram(program.name)
		}
	}

	function createPrograms(program) {
		if (ns.getPlayer().skills.hacking > program.lvl) {
			ns.singularity.createProgram(program.name, FOCUS)
		}
	}

	//\\ MAIN LOGIC
	for (let i = 0; i < ESSENTIAL.length;) {

		await ns.sleep(500)
		ns.clearLog()

		if (!ns.fileExists(ESSENTIAL[i].name)) {

			let work = ns.singularity.getCurrentWork()

			if (ns.singularity.isBusy()) {

				if (work.type === "CREATE_PROGRAM") {

					ns.print("Creating " + work.programName)
					if (work.programName != ESSENTIAL[i].name) {
						createPrograms(ESSENTIAL[i])
					}
					buyPrograms(ESSENTIAL[i])

				} else if (work.type === "FACTION") {

					ns.print("Working with " + work.factionName + " will buy only")
					buyPrograms(ESSENTIAL[i])

				} else if (work.type === "CLASS") {

					ns.print("Taking a class at " + work.location + " will buy only")
					buyPrograms(ESSENTIAL[i])

				} else if (work.type === "COMPANY") {

					ns.print("Working a job at " + work.companyName + " will buy only")
					buyPrograms(ESSENTIAL[i])

				} else if (work.type === "CRIME") {

					ns.print("Attempting to " + work.crimeType + " will buy only")
					buyPrograms(ESSENTIAL[i])

				}

			} else {

				ns.print("Next item " + ESSENTIAL[i].name)
				createPrograms(ESSENTIAL[i])
				buyPrograms(ESSENTIAL[i])

			}

		} else {

			i++
		}
	}
	scriptExit(ns)
}