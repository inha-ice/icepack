/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const app = require('../app');
const { authorice } = require('../../lib');
const profiles = require('../../test/profiles');

const login = async (id, password) => {
  const token = await authorice.login(id, password);
  const userAgent = request.agent(app);
  userAgent.set('Authorization', `Bearer ${token}`);
  return userAgent;
};

const signUp = async (id, name, password) => {
  const token = await authorice.signUp(id, name, password);
  const userAgent = request.agent(app);
  userAgent.set('Authorization', `Bearer ${token}`);
  return userAgent;
};

const tryLogin = async (profileName) => {
  const { id, name, password } = profiles[profileName];
  let userAgent;
  try {
    userAgent = await login(id, password);
  } catch (e) {
    userAgent = await signUp(id, name, password);
  }
  return userAgent;
};

module.exports = {
  tryLogin,
};
