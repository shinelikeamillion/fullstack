
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface Dialognose {
  code: string
  name: string
  latin?: string
} 

export interface Patient {
    id: string
    name: string
    dateOfBirth: string
    ssn: string
    gender: string
    occupation: string
    entries: Entry[]
} 

export enum Gender {
  Male = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export type NonSensitiveEntries = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntrie = Omit<Patient, 'id'>;