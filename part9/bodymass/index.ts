import express from 'express';
import { calculateBmi } from './calculateBmi';
import { calculateExercises, Infos } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/Hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

  const { height, weight } = req.query;
  if (!(height) || !(weight)) {
    res.send({ error: 'malformatted parameters' });
    return;
  }
  const result = calculateBmi(Number(height), Number(weight));
  res.json(result);
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as Infos;
  if (!(daily_exercises) || !(target)) {
    res.send({ error: 'malformatted parameters' });
    return;
  }
  const result = calculateExercises(req.body as Infos);
  res.json(result);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});