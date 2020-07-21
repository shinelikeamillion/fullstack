var calculateBmi = function (height, mass) {
    return 703 * (mass / Math.pow(height, 2));
};
console.log(calculateBmi(180, 74));
