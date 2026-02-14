import { Household } from "./types";

export function reporter(hasOldState :boolean , oldEnrolledHouseholds: Household[], newEnrolledHouseholds: Household[]) {
    //Run reporter based on if an old state exists or not
    if(hasOldState){
        rerunReporter(newEnrolledHouseholds, oldEnrolledHouseholds)
    }
    else {
        initialReporter(newEnrolledHouseholds)
    }
    //Extension Idea: Instead of outputting to console, build a json for return (for use in API later)
}

function initialReporter(enrolledHouseholds: Household[]) {
    //output first time enrollment stats to console
    console.log(`distinct_households_enrolled: ${enrolledHouseholds.length}`)
    enrolledHouseholds.forEach((household) => {
        console.log(`${household.id},${household.employeeName}`)
    })
}

function rerunReporter(newEnrolledHouseholds: Household[], oldEnrolledHouseholds: Household[]) {
    //Generate list of new house IDs and removed house Ids
    const newHouseIds: string[] = []
    const removedHouseIds: string[] = []
    newEnrolledHouseholds.forEach((household) => {
        if(!oldEnrolledHouseholds.find((oldHousehold) => {

            return oldHousehold.id == household.id
        })){
            newHouseIds.push(household.id)
        }
    })

    oldEnrolledHouseholds.forEach((household) => {
        if(!newEnrolledHouseholds.find((newHousehold) => {
            return newHousehold.id == household.id
        })) {
            removedHouseIds.push(household.id)
        }
    })
    //Output enrollment stats to console
    console.log(`households_enrolled_prev: ${oldEnrolledHouseholds.length}`)
    console.log(`households_enrolled_curr: ${newEnrolledHouseholds.length}`)
    console.log(`net_change: ${newEnrolledHouseholds.length - oldEnrolledHouseholds.length}`)
    console.log(`added:`)
    newHouseIds.forEach((householdId) => {
        console.log(householdId)
    })
    console.log(`removed:`)
    removedHouseIds.forEach((householdID) => {
        console.log(householdID)
    })
}

