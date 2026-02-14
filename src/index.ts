import * as csvParser from "./csvParser"
import * as stateManager from "./state"
import * as enrollment from "./enrollment"
import * as reporter from "./reporter"
import { EnrollementCsvRow } from "./types"

const providedFilePath : string | undefined = process.argv[2]

if(providedFilePath) {
    processFile(providedFilePath)
}
else{
    console.error('Error: No file path provided')
    process.exit(9)
}

async function processFile(providedFilePath : string) {

    //Load CSV File
    let parsedCsv :EnrollementCsvRow[] = []
    try{
        parsedCsv = await csvParser.loadAndParseCsv(providedFilePath)
    }
    catch(error) {
        console.log(error)
    }

    //Process CSV File into Households
    const enrolledHouseholds = enrollment.processCsv(parsedCsv)

    //Get Old State before overwriting new state
    const oldState = stateManager.getOldState()
    stateManager.writeState(enrolledHouseholds)

    //Report info
    const hasOldState = !(oldState == null)
    reporter.reporter(hasOldState,oldState,enrolledHouseholds)
    
}

//File Upload Scenarios
//File does not exist -> Exit early with error
//File exists -> Load file & Parse into list of persons

//File process scenario: see enrollment.ts for all scenarios

//State Scenarios
//No State Exists -> Make new State
//State Exists -> Load old state, overwrite new state

//reporting scenarios
//First run -> Display first time stats (Distinct households, which households are enrolled)
//Second run -> Display the difference between old/new

//Enter program
//File Check Logic
//no file provided -> exit/error
//file provided
///file does not exist -> exit/error
///File exists -> try load file
////Try load file
/////File load fails -> exit/error
/////file load success -> Parse CSV

//Enrollment Logic
//Generate all households from file members
//filter all households down to just 'enrolled' households

//State logic
//get old state
//if old state exists -> do state comparison
//if old state does not exist -> first time run

