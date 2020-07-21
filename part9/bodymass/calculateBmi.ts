interface BodyInfo {
  height: number;
  mass: number;
}
const parseArguments = (args: Array<string>): BodyInfo => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('too many arguments');
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      mass: Number(args[3])
    }; 
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, mass: number) => {
  const BMIs = mass / (0.01 * height) ** 2;
  const description = BMIs > 30 ? 'Obese' : BMIs > 25 ? 'Overweight' : BMIs > 18.5 ? 'Normal (healthy weight)' : 'Underweight';
  const result = {
    weight : mass,
    height,
    bmi: description
  };
  return result;
};

try {
  const { height, mass } = parseArguments(process.argv);
  const result = calculateBmi(height, mass);
  console.log(result);
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something bad happened, message: ', e.message);
}
