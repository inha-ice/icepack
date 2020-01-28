/**
 * @async
 * @param {Function} asyncFn
 */
const handleAsync = (asyncFn) => async (req, res, next) => {
  try {
    await asyncFn(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports = { handleAsync };
