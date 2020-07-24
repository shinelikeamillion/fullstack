
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

export interface SickLevelEntry {
  startDate: string
  endDate: string
}

export interface Discharge {
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
  gender: Gender
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