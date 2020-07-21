export interface DialognoseEntry {
  code: string
  name: string
  latin?: string
} 

export interface PatientEntry {
    id: number
    name: string
    dateOfBirth: string
    ssn: string
    gender: string
    occupation: string
} 

export enum Gender {
  Male = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export type NonSensitiveEntries = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntrie = Omit<PatientEntry, 'id'>;