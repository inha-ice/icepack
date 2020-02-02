const dotenv = require('dotenv');
const requestPromise = require('request-promise-native');
const { URL } = require('url');

dotenv.config();

const { AUTH_SERVER } = process.env;

const GET_ME_URL = new URL('/auth/me', AUTH_SERVER);
const LOGIN_URL = new URL('/auth', AUTH_SERVER);
const SIGNUP_URL = new URL('/users', AUTH_SERVER);

/**
 * 아이디와 비밀번호로 통합인증서버에 로그인하고 토큰을 반환합니다.
 * @async
 * @param {string} id 아이디
 * @param {string} password 비밀번호
 * @returns {string} 토큰
 * @throws {StatusCodeError}
 * @throws {RequestError}
 */
const login = async (id, password) => {
  const { token } = await requestPromise({
    method: 'POST',
    uri: LOGIN_URL,
    body: { id, password },
    json: true,
  });
  return token;
};

/**
 * 아이디, 이름, 비밀번호로 통합인증서버에 가입하고 토큰을 반환합니다.
 * @async
 * @param {string} id 아이디
 * @param {string} name 이름
 * @param {string} password 비밀번호
 * @returns {string} 토큰
 * @throws {StatusCodeError}
 * @throws {RequestError}
 */
const signUp = async (id, name, password) => {
  const { token } = await requestPromise({
    method: 'POST',
    uri: SIGNUP_URL,
    body: { id, name, password },
    json: true,
  });
  return token;
};

/**
 * 토큰의 무결성을 확인하고 토큰정보를 반환합니다.
 * @async
 * @param {string} token 토큰
 * @returns {Promise.<Object>} 사용자 정보
 * @throws {StatusCodeError}
 * @throws {RequestError}
 */
const verifyToken = async (token) => {
  const { user } = await requestPromise({
    method: 'POST',
    uri: GET_ME_URL,
    auth: { bearer: token },
    json: true,
  });
  return user;
};

module.exports = {
  login,
  signUp,
  verifyToken,
};
