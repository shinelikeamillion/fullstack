
// eslint-disable-next-line @typescript-eslint/no-empty-interface

export interface BaseEntry {
  id: string,
  description: string,
  date: string,
  specialist: string,
  diagnosisCodes?: Array<Dialognose['code']>
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck"
  healthCheckRating: HealthCheckRating
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare"
  sickLeave?: SickLevelEntry
  employerName: string
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital"
  discharge?: Discharge
}

interface SickLevelEntry {
  startDate: string
  endDate: string
}

interface Discharge {
  date: string,
  criteria: string
}

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
  Female = 'female',
  Other = 'other',
}

export type NonSensitiveEntries = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntrie = Omit<Patient, 'id'>;

export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;