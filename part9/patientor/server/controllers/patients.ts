import {Router} from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/utils';

const patientRouter = Router();

patientRouter.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

patientRouter.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if(patient)
    res.send(patient);
  else
    res.sendStatus(404);
});

patientRouter.post('/', (req, res) => {
  const patient = patientService.addEntry(toNewPatientEntry(req.body));
  if(patient)
    res.send(patient);
  else
    res.sendStatus(404);
});

export default  patientRouter;