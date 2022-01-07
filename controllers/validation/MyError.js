class MyError {
    constructor(message, status) {
        this.message = message;
        this.name = 'Validation Error';
        this.status = status;
    }
}

module.exports = {MyError};
