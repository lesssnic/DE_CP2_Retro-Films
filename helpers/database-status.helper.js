exports.getStatus = (result) => {
  if (!result.length) return { status: 418, data: 'Empty data' };
  return { status: 200, data: result };
};
