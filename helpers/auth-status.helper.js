exports.getStatusAuth = (result) => {
  if (result) return { status: 200, data: result };
  return { status: 401, data: 'Invalid token' };
};
