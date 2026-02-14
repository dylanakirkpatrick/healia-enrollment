import { EnrollementCsvRow, Household, Person } from "./types";

export function processCsv(parsedCsv: EnrollementCsvRow[]): Household[] {
    //Populate households with persons from csv file process
    const allHouseholds: Household[] = []
    const enrolledHouseholds: Household[] = []
    parsedCsv.forEach((row) => {
        populateHousehold(row, allHouseholds)
    })

    allHouseholds.forEach((household) => {
        enrollHousehold(household, enrolledHouseholds)
    })
    return enrolledHouseholds
}

function populateHousehold(member : Person, allHouseholds: Household[]) {
    //builds all Household list based on provided persons in file
    //Build all household list before any sort of processing to allow for split household IDs in file
    const householdIndex = allHouseholds.findIndex(household => {
        return household.id == member.household_id
    })
    if(householdIndex<0) {
        allHouseholds.push({
            id: member.household_id,
            members: [member],
            isEnrolled: '',
            employeeName: ''
        })
    }
    else {
        allHouseholds[householdIndex]!.members.push(member)
    }

}

function enrollHousehold(household: Household, enrolledHouseholds: Household[]) {
    //determines if household is enrolled based on each household member status

    ///Enrollment Household Scenarios
    ///1: Both Person A and B are enrolled -> Household is enrolled
    ///2: Person A is enrolled, Person B is not enrolled -> Partial Enrollment Scenarios
    ///3: Neither Person A or B are enrolled -> Household is not enrolled

    ///Partial Enrollment Scenarios
    ///Enrolled Person is employee -> Employee data is provided
    ///Enrolled Person is NOT employee -> Do we provide employee data or "unknown"

    ///Multi-Employee Scenario
    ///1: Both Person A and Person B are employees -> Who's info is provided for the 'household employee'
    ///2: Person A is employee, Person B is other -> Person A info provided for household employee
    ///3: Neither Person A and Person B are employees -> Household employee is 'unknown' 

    let householdEnrollmentStatus = 'unknown'
    let householdEmployee = 'unknown'
    household.members.forEach((member) => {
        //Household is unknown, member is enrolled -> household is enrolled
        //Household is unknown, member is not enrolled -> household is not enrolled
        //Household is enrolled, member is enrolled -> household stays enrolled
        //Household is enrolled, member is not enrolled -> household stays enrolled (Maybe 'partial' enrollment?)
        //Household is not enrolled, member is enrolled -> Household is enrolled (Maybe 'partial' enrollment?)
        //Household is not enrolled, member is not enrolled -> household stays not enrolled
        //TODO: Revist: Should partial enrollment be considered?
        //If so: Switch Case for different scenarios

        householdEnrollmentStatus = householdEnrollmentStatus =='enrolled' ? householdEnrollmentStatus : member.enrollment_status
        if(member.person_role.toLowerCase() == 'employee' && member.enrollment_status.toLowerCase() == 'enrolled'){
            householdEmployee = member.first_name.concat(' ',member.last_name)
        }
    })
    //if status is enrolled, then push to enrolled household list
    if(householdEnrollmentStatus == 'enrolled'){
        enrolledHouseholds.push({
        id: household.id,
        members: household.members,
        isEnrolled: householdEnrollmentStatus,
        employeeName: householdEmployee
        })
    }
}