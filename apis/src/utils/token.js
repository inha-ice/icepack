const dotenv = require('dotenv');
const request = require('request');
const { URL } = require('url');
const UnauthorizedError = require('../errors/UnauthorizedError');

dotenv.config();

const { AUTH_SERVER } = process.env;

const AUTH_SERVER_URL = new URL('/auth/me', AUTH_SERVER);
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

/**
 * 토큰의 무결성을 확인하고 토큰정보를 반환합니다.
 * @async
 * @param {string} token
 * @returns {Promise.<Object>} User model payload
 * @throws {TokenVerifyError} 토큰 인증 실패
 */
const verifyToken = (token) => new Promise((resolve, reject) => {
  request({
    url: AUTH_SERVER_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      resolve(body.user);
    } else {
      reject(new UnauthorizedError('Invalid token found'));
    }
  });
});

module.exports = {
  extractTokenFromCookie,
  extractTokenFromHeader,
  verifyToken,
};
