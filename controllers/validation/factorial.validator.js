const MyError = require('./MyError').MyError;

exports.factorialValidator = (body) => {

    try {
        if (typeof body !== 'object') throw new MyError('Not an Object', 415);
        if (!body.type) throw new MyError('Need a type', 422);
        if (!(body.type === 'recursion'|| body.type === 'cycle')) throw new MyError('Not valid type', 421);
        if (!body.number) throw new MyError('Need a number',422);
        if (!Number(body.number)) throw new MyError('Number not a number', 423);
        return {value: body};
    }catch(error) {
        if (error instanceof MyError) {
            return {error: error};
        }else {
            return {error: error};
        }

    }
}
