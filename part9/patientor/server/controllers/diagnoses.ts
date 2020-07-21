import {Router} from 'express';
import {disgnoses} from '../data/diagnoses';

const diagnoseRouter = Router();

diagnoseRouter.get('/', (_req, res) => {
  res.send(disgnoses);
});

export default diagnoseRouter;