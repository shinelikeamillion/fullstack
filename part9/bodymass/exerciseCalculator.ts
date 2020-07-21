
const parseExercise = (args: Array<string>): Infos => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('too many arguments');

  let daily_exercises: Array<number> = [];
  try {
    daily_exercises = JSON.parse(args[2]) as Array<number>;
  } catch (error) {
    console.log('something wrong with your input');

  }

  if (daily_exercises.length < 1) throw new Error('input is wrong');

  const target = args[3];
  if (!daily_exercises.find(a => isNaN(Number(a))) && !isNaN(Number(target))) {
    return { daily_exercises, target: Number(target) };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

type Rate = 1 | 2 | 3;

interface Result {
  periodLength: number
  trainingDays: number
  target: number
  average: number
  success: boolean
  rating: Rate
  ratingDescription: string
}

export interface Infos {
  daily_exercises: Array<number>;
  target: number;
} 

export const calculateExercises = (infos: Infos): Result => {
  const { daily_exercises: days, target } = infos;
  const trainingDays = days.filter(d => d > 0).length;
  const average = days.reduce((a, b) => a + b) / days.length;
  const success = days.filter(d => d > 0).length >= target;
  const rating = average > 2 / 3 ? 3 : average > 1 / 3 ? 2 : 1;
  const ratingDescription = rating === 3 ? 'great done' : rating === 2 ? 'not too bad but could be better' : 'need to pay more attention';
  return {
    periodLength: days.length,
    trainingDays,
    target: target,
    average,
    success,
    rating,
    ratingDescription
  };
};

try {
  const infos = parseExercise(process.argv);
  const result = calculateExercises(infos);
  console.log(result);
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something bad happened, message: ', e.message );
}
// npm run calculateExercises [0,0,0,0,2,0,2] 5
