const assert = require('assert');
const request = require('supertest');
const app = require('../src/app');
const { hasErrorMessage, isSuccessMessage } = require('../src/utils/responses');
const tester = require('../src/utils/tester');

let managerAgent;
let userAgent;

describe('route:users', () => {
  before(async () => {
    managerAgent = await tester.tryLogin('manager');
    userAgent = await tester.tryLogin('user');
  });

  context('POST /users/:id/pay', () => {
    it('과자치비 납부 성공', (done) => {
      managerAgent
        .post('/users/12345678/pay')
        .send({ paid: 80000 })
        .expect(200)
        .end(isSuccessMessage(done));
    });

    it('과자치비 납부 실패: 인증없음', (done) => {
      request(app)
        .post('/users/12345678/pay')
        .send({ paid: 80000 })
        .expect(401)
        .end(hasErrorMessage(done));
    });

    it('과자치비 납부 실패: 권한없음', (done) => {
      userAgent
        .post('/users/12345678/pay')
        .send({ paid: 80000 })
        .expect(403)
        .end(hasErrorMessage(done));
    });

    it('과자치비 납부 실패: 유효하지 않은 아이디', (done) => {
      managerAgent
        .post('/users/id/pay')
        .send({ paid: 80000 })
        .expect(400)
        .end(hasErrorMessage(done));
    });

    it('과자치비 납부 실패: 유효하지 않은 입력', (done) => {
      managerAgent
        .post('/users/12345678/pay')
        .send({ paid: 'paid' })
        .expect(400)
        .end(hasErrorMessage(done));
    });

    it('과자치비 납부 실패: 존재하지 않는 사용자', (done) => {
      managerAgent
        .post('/users/44444444/pay')
        .send({ paid: 80000 })
        .expect(404)
        .end(hasErrorMessage(done));
    });
  });

  context('GET /users/:id/pay', () => {
    it('과자치비 현황 조회 성공', (done) => {
      managerAgent
        .get('/users/12345678/pay')
        .expect(200)
        .end((err, res) => {
          if (err) {
            assert.fail(err);
          } else {
            const { body } = res;
            assert(body.message === 'success');
            assert(typeof body.user === 'object');
            const { user } = body;
            assert(typeof user.paid === 'number');
            assert(typeof user.refunded === 'number');
            assert(typeof user.note === 'string' || user.note === null);
            assert(typeof user.rentedAt === 'string' || user.rentedAt === null);
            assert(typeof user.returnedAt === 'string' || user.returnedAt === null);
            done();
          }
        });
    });

    it('과자치비 현황 조회 실패: 인증없음', (done) => {
      request(app)
        .get('/users/12345678/pay')
        .expect(401)
        .end(hasErrorMessage(done));
    });

    it('과자치비 현황 조회 실패: 권한없음', (done) => {
      userAgent
        .get('/users/12345678/pay')
        .expect(403)
        .end(hasErrorMessage(done));
    });

    it('과자치비 현황 조회 실패: 유효하지 않은 아이디', (done) => {
      managerAgent
        .get('/users/id/pay')
        .expect(400)
        .end(hasErrorMessage(done));
    });

    it('과자치비 현황 조회 실패: 존재하지 않는 사용자', (done) => {
      managerAgent
        .get('/users/44444444/pay')
        .expect(404)
        .end(hasErrorMessage(done));
    });
  });

  context('POST /users/:id/pay', () => {
    it('과자치비 환불 성공', (done) => {
      managerAgent
        .post('/users/12345678/refund')
        .send({ refunded: 70000 })
        .expect(200)
        .end(isSuccessMessage(done));
    });

    it('과자치비 환불 실패: 인증없음', (done) => {
      request(app)
        .post('/users/12345678/refund')
        .send({ refunded: 70000 })
        .expect(401)
        .end(hasErrorMessage(done));
    });

    it('과자치비 환불 실패: 권한없음', (done) => {
      userAgent
        .post('/users/12345678/refund')
        .send({ refunded: 70000 })
        .expect(403)
        .end(hasErrorMessage(done));
    });

    it('과자치비 환불 실패: 유효하지 않은 아이디', (done) => {
      managerAgent
        .post('/users/id/refund')
        .send({ refunded: 70000 })
        .expect(400)
        .end(hasErrorMessage(done));
    });

    it('과자치비 환불 실패: 유효하지 않은 입력', (done) => {
      managerAgent
        .post('/users/12345678/refund')
        .send({ refunded: 'refunded' })
        .expect(400)
        .end(hasErrorMessage(done));
    });

    it('과자치비 환불 실패: 존재하지 않는 사용자', (done) => {
      managerAgent
        .post('/users/44444444/refund')
        .send({ refunded: 70000 })
        .expect(404)
        .end(hasErrorMessage(done));
    });
  });
});
