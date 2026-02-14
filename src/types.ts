export interface EnrollementCsvRow {
    household_id: string;
    person_role: string;
    first_name: string;
    last_name: string;
    enrollment_status: string
}

export interface Person {
  household_id: string;
  person_role: string;
  first_name: string;
  last_name: string;
  enrollment_status: string
}

export interface Household {
    id: string;
    members: Person[];
    isEnrolled: string;
    employeeName: string

}

