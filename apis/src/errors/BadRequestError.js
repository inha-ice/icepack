const ResponseError = require('./ResponseError');

class BadRequestError extends ResponseError {
  constructor(message) {
    super(400, message);
    this.name = 'BadRequestError';
  }
}

module.exports = BadRequestError;
