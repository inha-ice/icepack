const ResponseError = require('./ResponseError');

class UnauthorizedError extends ResponseError {
  constructor(message) {
    super(401, message);
    this.name = 'UnauthorizedError';
  }
}

module.exports = UnauthorizedError;
