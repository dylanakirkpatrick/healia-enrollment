import { processCsv } from '../src/enrollment';
import { EnrollementCsvRow } from '../src/types';

describe('Enrollment Processing', () => {
  test('household with one enrolled member is included', () => {
    const data: EnrollementCsvRow[] = [
      {
        household_id: 'H001',
        person_role: 'employee',
        first_name: 'Frodo',
        last_name: 'Baggins',
        enrollment_status: 'enrolled'
      }
    ];

    const result = processCsv(data);
    
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('H001');
    expect(result[0].employeeName).toBe('Frodo Baggins');
  });

  test('household with no enrolled members is excluded', () => {
    const data: EnrollementCsvRow[] = [
      {
        household_id: 'H001',
        person_role: 'employee',
        first_name: 'Boromir',
        last_name: 'Gondor',
        enrollment_status: 'not_enrolled'
      }
    ];

    const result = processCsv(data);
    
    expect(result).toHaveLength(0);
  });

  test('household enrolled if at least one member is enrolled', () => {
    const data: EnrollementCsvRow[] = [
      {
        household_id: 'H001',
        person_role: 'employee',
        first_name: 'Frodo',
        last_name: 'Baggins',
        enrollment_status: 'not_enrolled'
      },
      {
        household_id: 'H001',
        person_role: 'spouse',
        first_name: 'Bilbo',
        last_name: 'Baggins',
        enrollment_status: 'enrolled'
      }
    ];

    const result = processCsv(data);
    
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('H001');
  });

  test('returns "unknown" when household has no employee', () => {
    const data: EnrollementCsvRow[] = [
      {
        household_id: 'H001',
        person_role: 'spouse',
        first_name: 'Arwen',
        last_name: 'Undómiel',
        enrollment_status: 'enrolled'
      }
    ];

    const result = processCsv(data);
    
    expect(result[0].employeeName).toBe('unknown');
  });

  test('processes multiple households correctly', () => {
    const data: EnrollementCsvRow[] = [
      {
        household_id: 'H001',
        person_role: 'employee',
        first_name: 'Frodo',
        last_name: 'Baggins',
        enrollment_status: 'enrolled'
      },
      {
        household_id: 'H002',
        person_role: 'employee',
        first_name: 'Aragorn',
        last_name: 'Elessar',
        enrollment_status: 'enrolled'
      },
      {
        household_id: 'H003',
        person_role: 'employee',
        first_name: 'Boromir',
        last_name: 'Gondor',
        enrollment_status: 'not_enrolled'
      }
    ];

    const result = processCsv(data);
    
    expect(result).toHaveLength(2);
    expect(result.find(h => h.id === 'H001')).toBeDefined();
    expect(result.find(h => h.id === 'H002')).toBeDefined();
    expect(result.find(h => h.id === 'H003')).toBeUndefined();
  });

  test('handles empty input', () => {
    const data: EnrollementCsvRow[] = [];

    const result = processCsv(data);
    
    expect(result).toHaveLength(0);
  });

  test('uses enrolled employee name, not unenrolled employee', () => {
    const data: EnrollementCsvRow[] = [
      {
        household_id: 'H001',
        person_role: 'employee',
        first_name: 'Frodo',
        last_name: 'Baggins',
        enrollment_status: 'enrolled'
      },
      {
        household_id: 'H001',
        person_role: 'employee',
        first_name: 'Sam',
        last_name: 'Gamgee',
        enrollment_status: 'not_enrolled'
      }
    ];

    const result = processCsv(data);
    
    expect(result[0].employeeName).toBe('Frodo Baggins');
  });
});