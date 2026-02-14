import * as fs from 'fs'
import { Household } from './types'

const stateFilePath = './data/state.json'
const stateExists = fs.existsSync(stateFilePath)
let oldState : any = null

export function testGreeting () :void {
    console.log("Hello from State Manager")
}

export function getOldState() {
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
        const newState = JSON.stringify(enrolledHouseholds)
        fs.writeFileSync(stateFilePath, newState)
    }
    catch(error) {
        console.log(error)
    }
    
}


//state format
///list of enrolled households
