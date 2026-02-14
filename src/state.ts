import * as fs from 'fs'
import { Household } from './types'
import path from 'path'

const stateFilePath = './data/state.json'
const stateExists = fs.existsSync(stateFilePath)

export function getOldState() {
    let oldState :any = null
    if(stateExists){
        oldState = fs.readFileSync(stateFilePath, 'utf-8')
        oldState = JSON.parse(oldState)
    }
    else {
        oldState = null
    }
    return oldState
}

export function updateState(newEnrolledHouseholds: Household[], oldEnrolledHouseholds: Household[]|null) {
    writeState(newEnrolledHouseholds)
}

export function writeState(enrolledHouseholds: Household[]) {
    try{
        const dir = path.dirname(stateFilePath)
        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }



        const newState = JSON.stringify(enrolledHouseholds)
        fs.writeFileSync(stateFilePath, newState)
    }
    catch(error) {
        console.log('Error writing state: ', error)
        process.exit(1)
    }
    
}


//state format
///list of enrolled households
