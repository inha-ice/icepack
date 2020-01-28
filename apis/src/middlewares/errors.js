/* eslint-disable consistent-return */
const ResponseError = require('../errors/ResponseError');

/**
 * 반환된 에러를 출력합니다.
 * @param {Error} err
 * @param {?Request} _
 * @param {Response} res
 * @param {Function} next
 */
const errors = (err, _, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof ResponseError) {
    const { statusCode, message } = err;
    res.status(statusCode).json({ message });
  } else {
    console.error(err);
    res.status(500).json({ message: 'Unexpected error occurred' });
  }
};

module.exports = errors;
