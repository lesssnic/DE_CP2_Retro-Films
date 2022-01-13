exports.getStatus = (result) => {
  if (!result.length) return { status: 401, data: 'Wrong data', token: '' };
  if (result.token) return { status: 200, data: 'Access granted', token: result.token };
  return { status: 401, data: 'Wrong data', token: '' };
};
