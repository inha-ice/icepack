const SCHEMA_REGEX = /^(?:Bearer )?([A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*)$/;

/**
 * 쿠키에서 access_token 값을 가져옵니다.
 * @param {Request} req
 * @returns {?string} 토큰
 */
const extractTokenFromCookie = (req) => {
  const schema = req.cookies && req.cookies.access_token; // optional chaining
  if (schema && SCHEMA_REGEX.test(schema)) {
    const [, token] = SCHEMA_REGEX.exec(schema);
    return token;
  }
  return null;
};

/**
 * Authorization 헤더에서 Bearer 인증스킴 형태의 토큰을 가져옵니다.
 * @param {Request} req
 * @returns {?string} 토큰
 */
const extractTokenFromHeader = (req) => {
  const schema = req.header('Authorization');
  if (schema && SCHEMA_REGEX.test(schema)) {
    const [, token] = SCHEMA_REGEX.exec(schema);
    return token;
  }
  return null;
};

module.exports = {
  extractTokenFromCookie,
  extractTokenFromHeader,
};
