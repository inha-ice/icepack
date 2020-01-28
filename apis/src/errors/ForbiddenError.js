const ResponseError = require('./ResponseError');

class ForbiddenError extends ResponseError {
  constructor(message) {
    super(403, message);
    this.name = 'ForbiddenError';
  }
}

module.exports = ForbiddenError;
