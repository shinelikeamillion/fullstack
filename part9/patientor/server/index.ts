import express from 'express';
import cors from 'cors';
import diagnoseRouter from './controllers/diagnoses';
import patientRouter from './controllers/patients';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});


