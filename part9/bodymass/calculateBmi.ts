interface BodyInfo {
  height: number;
  mass: number;
}
const parseArguments = (args: Array<string>): BodyInfo => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('too many arguments')
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      mass: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}
const calculateBmi = (height: number, mass: number) => {
  return mass / (0.01 * height) ** 2
}

try {
  const { height, mass } = parseArguments(process.argv);
  const BMIs = calculateBmi(height, mass)
  const result = BMIs > 30 ? 'Obese' : BMIs > 25 ? 'Overweight' : BMIs > 18.5 ? 'Normal (healthy weight)' : 'Underweight'
  console.log(result);
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
