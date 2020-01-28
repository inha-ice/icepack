const ForbiddenError = require('../errors/ForbiddenError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { extractTokenFromCookie, extractTokenFromHeader, verifyToken } = require('../utils/token');

/**
 * 쿠키 또는 헤더에 유효한 토큰이 포함되어있는지 확인합니다.
 * @param {Request} req
 * @param {?Response} _
 * @param {Function} next
 */
const verifyAuth = (req, _, next) => {
  const token = extractTokenFromCookie(req) || extractTokenFromHeader(req);
  if (token) {
    req.token = token;
    verifyToken(token)
      .then((user) => {
        req.user = user;
        next();
      }).catch(next);
  } else {
    next(new UnauthorizedError('Cannot find the token'));
  }
};

/**
 * 사용자가 관리자인지 확인하는 미들웨어를 생성합니다. 미들웨어는 반드시 `verifyAuth`을 호출한 이후에 호출해야 합니다.
 * @param {Number} level
 * @returns {Function} 권한확인 미들웨어
 */
const verifyAuthLevel = (level) => (req, _, next) => {
  if (req.user.level & level) { // bit flag comparison
    next();
  } else {
    next(new ForbiddenError('Permission denied'));
  }
};

module.exports = {
  verifyAuth,
  verifyAuthLevel,
};
