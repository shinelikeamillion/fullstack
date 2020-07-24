import { patients } from '../data/patients';
import { disgnoses } from '../data/diagnoses';
import { NonSensitiveEntries, Patient, NewPatientEntrie, Entry } from '../entries/types';

const getNonSensitiveEntries = (): NonSensitiveEntries[] =>
  patients
    ? patients.map(({ id, name, gender, occupation, dateOfBirth }) =>
      ({ id, name, gender, occupation, dateOfBirth }))
    : [];

const findById = (id: string): Patient | undefined => patients.find(patient => patient.id === id);

const getDiagnosis = (diagnoCodes: string[]) => disgnoses.filter(dis => diagnoCodes.includes(dis.code));

const addPatient = (newEntry: NewPatientEntrie): Patient => {
  const newPatient = {
    id: (Math.max(...patients.map(p => Number(p.id))) + 1).toString(),
    ...newEntry
  };
  patients.push(newPatient);
  return newPatient;
};

const addPatientEntry = (id: string, newEntry: Entry): Patient | undefined => {

  const patient = patients.find(p => p.id === id);
  if (patient) {
    patient.entries = patient.entries.concat(newEntry);
  }

  return patient;
};

export default { getNonSensitiveEntries, findById, addPatient, getDiagnosis, addPatientEntry };