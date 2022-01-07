const factorialValidator = require('./validation/factorial.validator').factorialValidator;

const cycleFactorial = (number) => {
    let factorial = 1;
    for (let i = 1; i <= number; i++){
        factorial *= i;
    }
    return factorial;
};
const recursionFactorial = (number) => (number > 1)?(number * recursionFactorial(number-1)):1;

const getFactorial = async (body) => {
    const { value, error } = factorialValidator(body); // My Class Error
    if (error) return { error };
    const number = body.number;
    const type = body.type;
    const start = performance.now();
    const answer = (type === 'recursion') ? recursionFactorial(number) : cycleFactorial(number);
    const stop = performance.now();
    return { result: { data: {answer:answer, time: (stop-start)*1000}, status: 200 } };
};

module.exports = {getFactorial};


