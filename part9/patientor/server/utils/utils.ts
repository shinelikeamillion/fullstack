/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  NewPatientEntrie, Gender, Entry,
  HealthCheckRating, Dialognose, CheckType,
  SickLevelEntry, Discharge, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry,
} from '../entries/types';

const toNewPatient = (object: any): NewPatientEntrie => {
  const { name, gender, ssn, occupation, dateOfBirth, entries } = object;
  const newEntry: NewPatientEntrie = {
    name: parseString(name),
    gender: parseGender(gender),
    ssn: parseString(ssn),
    occupation: parseString(occupation),
    dateOfBirth: parseString(dateOfBirth),
    entries: entries && parseEnties(entries)
  };
  return newEntry;
};

const toNewPatientEntry = (object: any): Entry => {
  // add fake id, we reset it later in patientService
  const randomId = (Math.random() * 100000).toFixed();
  return parseEntry({ ...object, id: randomId, date: new Date().toDateString() });
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing name: ${JSON.stringify(text)}`);
  }
  return text;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing name: ${JSON.stringify(gender)}`);
  }
  switch (gender) {
    case Gender.Male: return Gender.Male;
    case Gender.Female: return Gender.Female;
    case Gender.Other: return Gender.Other;
  }
};

const parseDiagnosisCodes = (diagnosisCodes: any[]): Array<Dialognose['code']> => {
  const result: Array<Dialognose['code']> = [];
  diagnosisCodes.forEach(element => {
    result.push(parseString(element));
  });
  return result;
};

const parseStickLevel = (diagnosisCodes: any): SickLevelEntry => {
  const { startDate, endDate } = diagnosisCodes;
  return {
    startDate: parseString(startDate),
    endDate: parseString(endDate),
  };
};

const parseDischarge = (discharge: any): Discharge => {
  const { date, criteria } = discharge;
  return {
    date: parseString(date),
    criteria: parseString(criteria)
  };
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(`Incorrect or missing name: ${JSON.stringify(healthCheckRating)}`);
  }
  switch (healthCheckRating) {
    case HealthCheckRating.CriticalRisk: return HealthCheckRating.CriticalRisk;
    case HealthCheckRating.Healthy: return HealthCheckRating.Healthy;
    case HealthCheckRating.HighRisk: return HealthCheckRating.HighRisk;
    case HealthCheckRating.LowRisk: return HealthCheckRating.LowRisk;
  }
};

const parseCheckType = (type: any): CheckType => {
  if (!type || !isCheckType(type)) {
    throw new Error(`Incorrect or missing name: ${JSON.stringify(type)}`);
  }
  switch (type) {
    case CheckType.HealthCheck: return CheckType.HealthCheck;
    case CheckType.OccupationalHealthcare: return CheckType.OccupationalHealthcare;
    case CheckType.Hospital: return CheckType.Hospital;
  }
};

const parseEntry = (entry: any): Entry => {
  const { id, type, description, date, specialist, diagnosisCodes } = entry;
  switch (parseCheckType(type)) {
    case CheckType.HealthCheck:
      const { healthCheckRating } = entry;
      const result: HealthCheckEntry = {
        id: parseString(id),
        type,
        specialist: parseString(specialist),
        description: parseString(description),
        date: parseString(date),
        diagnosisCodes: diagnosisCodes && parseDiagnosisCodes(diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(healthCheckRating)
      };
      return result;
    case CheckType.OccupationalHealthcare:
      const { employerName, sickLeave } = entry;
      const result1: OccupationalHealthcareEntry = {
        id: parseString(id),
        type,
        specialist: parseString(specialist),
        description: parseString(description),
        date: parseString(date),
        employerName: parseString(employerName),
        diagnosisCodes: diagnosisCodes && parseDiagnosisCodes(diagnosisCodes),
        sickLeave: sickLeave && parseStickLevel(sickLeave)
      };
      return result1;
    case CheckType.Hospital:
      const { discharge } = entry;
      const result2: HospitalEntry = {
        id: parseString(id),
        type,
        specialist: parseString(specialist),
        description: parseString(description),
        date: parseString(date),
        diagnosisCodes: diagnosisCodes && parseDiagnosisCodes(diagnosisCodes),
        discharge: discharge && parseDischarge(discharge)
      };
      return result2;
  }
};

const parseEnties = (enties: any[]): Entry[] => {
  const results: Entry[] = [];
  enties.forEach(entry => {
    results.push(parseEntry(entry));
  });

  return results;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {

  return Object.values(HealthCheckRating).includes(Number(param));
};
const isCheckType = (param: any): param is CheckType => {
  return Object.values(CheckType).includes(param);
};

export { toNewPatientEntry, toNewPatient }; 