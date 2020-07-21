import { patients } from '../data/patients';
import { NonSensitiveEntries, PatientEntry, NewPatientEntrie } from '../entries/types';

const getNonSensitiveEntries = (): NonSensitiveEntries[] =>
  patients
    ? patients.map(({ id, name, gender, occupation, dateOfBirth }) =>
    ({ id, name, gender, occupation, dateOfBirth }))
    : [];

const findById = (id: string): PatientEntry | undefined => patients.find(patient => patient.id === Number(id));

const addEntry = (newEntry: NewPatientEntrie): PatientEntry => {

  const newPatient = {
    id: Math.max(...patients.map(p => p.id)) + 1,
    ...newEntry
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getNonSensitiveEntries, findById, addEntry};