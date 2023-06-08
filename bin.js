#!/usr/bin/env node

import svelte from "./svelte.js";
import { log } from "console"
import { generateComponentTree, framework_exists } from "./utils.js";
import select from "@inquirer/select";
import fs from "fs-extra"
import inquirer from "inquirer";
const { existsSync } = fs

const frameworks = {
    svelte
}

const RECOGNIZABLE_FILES = {
    svelte: "svelte.config.js",
    nextjs: "next.config.js"
}

const args = process.argv

if (args[2] === "help") {
    log("Help this nigga")
}

if (args[2] === "init") {
    log("Welcome to Levus CLI.")
    log("Take a few seconds to set up Levus in your app")
    let detected_framework = ""
    for (const key in RECOGNIZABLE_FILES) {
        if(existsSync(RECOGNIZABLE_FILES[key])){
            detected_framework = key
            break
        }
    }
    if(detected_framework!==""){
        log(`We detected that you are in a ${detected_framework} project`)
        log("Where do you want Levus to import your components?")
        const { location } = await inquirer.prompt({ name:"location", default:"./src/lib/ui/levus" })
        log(location)
        process.exit(1)
    }
    log("No framework detected. Tell us what framework are you using")
    process.exit(1)
}


if (args[2] === "ls") {
    /**
        * @type { "svelte" }
    */
    let framework = args[3] ?? ""

    if (!frameworks[framework]) {
        log(framework === "" ? "Specify a framework." : "Invalid framework.")
        framework = await select({
            message: "Chose the framework",
            choices: [
                {
                    name: "Svelte",
                    value: "svelte"
                }
            ]
        })
    }
    generateComponentTree(frameworks[framework])

}

//npx asda add ui/Button
if (args[2] === "add") {
    let [framework, group, component] = args[3].split("/")
    if (
        !framework
    ) {
        log("")
    }
}





