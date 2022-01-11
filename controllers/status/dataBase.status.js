exports.getStatus = (result) => {
    console.log(result)
    if (!result.length) return {status: 418, data: 'Empty data'};
    return {status: 200, data: result};
}
