exports.getStatusMovies = (result) => {
  if (result) return { status: 200, count: result.length, data: result };
  return { status: 401, data: 'Invalid token' };
};
exports.getStatusMovie = (result) => {
  if (result) return { status: 200, data: result[0] };
  return { status: 401, data: 'Invalid token' };
};
