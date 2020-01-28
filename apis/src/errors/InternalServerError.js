const ResponseError = require('./ResponseError');

class InternalServerError extends ResponseError {
  constructor(message) {
    super(500, message);
    this.name = 'InternalServerError';
  }
}

module.exports = InternalServerError;
