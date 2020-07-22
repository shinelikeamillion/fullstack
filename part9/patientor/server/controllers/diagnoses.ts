import { Router } from 'express';
import { disgnoses } from '../data/diagnoses';
import patientService from '../services/patientService';

const diagnoseRouter = Router();

diagnoseRouter.get('/', (_req, res) => {
  res.send(disgnoses);
});

diagnoseRouter.post('/', (req, res) => {
  const diagonisisApi = patientService.getDiagnosis(req.body);
  if (diagonisisApi)
    res.send(diagonisisApi);
  else
    res.sendStatus(404);
});

export default diagnoseRouter;