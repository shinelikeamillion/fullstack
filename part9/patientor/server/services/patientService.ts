import { patients } from '../data/patients';
import { NonSensitiveEntries, Patient, NewPatientEntrie } from '../entries/types';

const getNonSensitiveEntries = (): NonSensitiveEntries[] =>
  patients
    ? patients.map(({ id, name, gender, occupation, dateOfBirth }) =>
    ({ id, name, gender, occupation, dateOfBirth }))
    : [];

const findById = (id: string): Patient | undefined => patients.find(patient => patient.id === id);

const addEntry = (newEntry: NewPatientEntrie): Patient => {

  const newPatient = {
    id: (Math.max(...patients.map(p => Number(p.id))) + 1).toString(),
    ...newEntry
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getNonSensitiveEntries, findById, addEntry};