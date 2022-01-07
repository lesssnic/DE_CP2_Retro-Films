const MyError = require('./MyError').MyError;

exports.streetValidator = (body) => {
    try {
        if (typeof body !== 'object') throw new MyError('Not an Object', 415);
        if (!body.id) throw new MyError('Need key id', 422);
        if (!Number(body.id)) throw new MyError('id not a number', 422);
        return {value: body};
    }catch(error) {
        if (error instanceof MyError) {
            return {error: error};
        }else {
            return {error: error};
        }
    }
}
