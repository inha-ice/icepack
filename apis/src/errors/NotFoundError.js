const ResponseError = require('./ResponseError');

class NotFoundError extends ResponseError {
  constructor(message) {
    super(404, message);
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
