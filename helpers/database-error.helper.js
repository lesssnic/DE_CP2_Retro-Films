exports.dataBaseError = (error) => {
  if (error.code === '23505') return { status: 406, data: 'Login exists' };
  if (error.code === '23503') return { status: 406, data: error.detail };
  return { status: 500, data: error.code };
};
