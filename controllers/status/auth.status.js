exports.getStatusAuth = (result, error) => {
    if (result) return {status: 200, data: result};
    return {status: 401, data: 'Invalid token'};
}
