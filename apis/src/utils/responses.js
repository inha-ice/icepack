const assert = require('assert');

/**
 * 출력에 오류메세지가 있는지 확인합니다.
 * @param {Function} done
 * @returns {Function}
 * @throws {AssertionError} 오류메세지가 출력되지 않음
 */
const hasErrorMessage = (done) => (err, res) => {
  if (err) {
    assert.fail(err);
  } else {
    const { body } = res;
    assert(typeof body.message === 'string');
    assert(body.message !== 'success');
    done();
  }
};

/**
 * 출력이 성공메세지인지 확인합니다.
 * @param {Function} done
 * @returns {Function}
 * @throws {AssertionError} 성공메세지가 출력되지 않음
 */
const isSuccessMessage = (done) => (err, res) => {
  if (err) {
    assert.fail(err);
  } else {
    const { body } = res;
    assert(body.message === 'success');
    done();
  }
};

module.exports = {
  hasErrorMessage,
  isSuccessMessage,
};
