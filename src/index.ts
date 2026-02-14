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
        console.log('Error parsing CSV: ', error)
        process.exit(1)
    }

    //Process CSV File into Households
    const enrolledHouseholds = enrollment.processCsv(parsedCsv)

    //Get Old State before overwriting new state
    const oldState = stateManager.getOldState()
    stateManager.writeState(enrolledHouseholds)

    //Report info
    const hasOldState = !(oldState == null)
    reporter.reporter(hasOldState,oldState,enrolledHouseholds)

    process.exit(0)
    
}