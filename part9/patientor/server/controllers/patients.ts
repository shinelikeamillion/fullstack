import { Router } from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewPatient } from '../utils/utils';

const patientRouter = Router();

patientRouter.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

patientRouter.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient)
    res.send(patient);
  else
    res.sendStatus(404);
});

patientRouter.post('/', (req, res) => {
  const patient = patientService.addPatient(toNewPatient(req.body));
  if (patient)
    res.send(patient);
  else
    res.sendStatus(404);
});

patientRouter.post('/:id/entries', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { id, entry } = req.body;
  const patient = patientService.addPatientEntry(id, toNewPatientEntry(entry));
  if (patient)
    res.send(patient);
  else
    res.sendStatus(404);
});

export default patientRouter;