import {NewPatientEntrie, Gender} from '../entries/types';

const toNewPatientEntry = (object: any): NewPatientEntrie => {
  const {name, gender, ssn, occupation, dateOfBirth} = object;
  const newEntry: NewPatientEntrie = {
    name: parseString(name) , 
    gender: parseGender(gender), 
    ssn: parseString(ssn), 
    occupation: parseString(occupation), 
    dateOfBirth: parseString(dateOfBirth)
  };
  return newEntry;
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (text: any): string => {
  if(!text || !isString(text)) {
    throw new Error(`Incorrect or missing name: ${text}`);
  }
  return text;
};
const parseGender = (gender: any): string => {
  if(!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing name: '+gender);
  }
  return gender;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export default toNewPatientEntry;