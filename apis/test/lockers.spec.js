const assert = require('assert');
const request = require('supertest');
const app = require('../src/app');
const { hasErrorMessage, isSuccessMessage } = require('../src/utils/responses');
const tester = require('../src/utils/tester');

let managerAgent;
let userAgent;

describe('route:lockers', () => {
  before(async () => {
    managerAgent = await tester.tryLogin('manager');
    userAgent = await tester.tryLogin('user');
  });

  context('GET /lockers', () => {
    it('모든 사물함 현황 조회 성공', (done) => {
      managerAgent
        .get('/lockers')
        .expect(200)
        .end((err, res) => {
          if (err) {
            assert.fail(err);
          } else {
            const { body } = res;
            assert(body.message === 'success');
            assert(Array.isArray(body.lockers));
            const { lockers } = body;
            lockers.forEach((locker) => {
              assert(typeof locker.id === 'number');
              assert(typeof locker.location === 'string');
              assert(typeof locker.userId === 'number' || locker.userId === null);
              assert(typeof locker.note === 'string' || locker.note === null);
              assert(typeof locker.rentedAt === 'string' || locker.rentedAt === null);
              assert(typeof locker.returnedAt === 'string' || locker.returnedAt === null);
            });
            done();
          }
        });
    });

    it('모든 사물함 현황 조회 실패: 인증없음', (done) => {
      request(app)
        .get('/lockers')
        .expect(401)
        .end(hasErrorMessage(done));
    });

    it('모든 사물함 현황 조회 실패: 권한없음', (done) => {
      userAgent
        .get('/lockers')
        .expect(403)
        .end(hasErrorMessage(done));
    });
  });

  context('GET /lockers/:id', () => {
    it('사물함 현황 조회 성공', (done) => {
      managerAgent
        .get('/lockers/0')
        .expect(200)
        .end((err, res) => {
          if (err) {
            assert.fail(err);
          } else {
            const { body } = res;
            assert(body.message === 'success');
            assert(typeof body.locker === 'object');
            const { locker } = body;
            assert(typeof locker.id === 'number');
            assert(typeof locker.location === 'string');
            assert(typeof locker.userId === 'number' || locker.userId === null);
            assert(typeof locker.note === 'string' || locker.note === null);
            assert(typeof locker.rentedAt === 'string' || locker.rentedAt === null);
            assert(typeof locker.returnedAt === 'string' || locker.returnedAt === null);
            done();
          }
        });
    });

    it('사물함 현황 조회 실패: 인증없음', (done) => {
      request(app)
        .get('/lockers/0')
        .expect(401)
        .end(hasErrorMessage(done));
    });

    it('사물함 현황 조회 실패: 권한없음', (done) => {
      userAgent
        .get('/lockers/0')
        .expect(403)
        .end(hasErrorMessage(done));
    });

    it('사물함 현황 조회 실패: 유효하지 않은 아이디', (done) => {
      managerAgent
        .get('/users/id')
        .expect(400)
        .end(hasErrorMessage(done));
    });

    it('사물함 현황 조회 실패: 존재하지 않는 사물함', (done) => {
      managerAgent
        .get('/users/10000')
        .expect(404)
        .end(hasErrorMessage(done));
    });
  });

  context('PATCH /lockers/:id', () => {
    it('사물함 현황 수정 성공', (done) => {
      managerAgent
        .patch('/lockers/0')
        .send({ note: '고장' })
        .expect(200)
        .end(isSuccessMessage(done));
    });

    it('사물함 현황 수정 실패: 인증없음', (done) => {
      request(app)
        .patch('/lockers/0')
        .send({ note: '고장' })
        .expect(401)
        .end(hasErrorMessage(done));
    });

    it('사물함 현황 수정 실패: 권한없음', (done) => {
      userAgent
        .patch('/lockers/0')
        .send({ note: '고장' })
        .expect(403)
        .end(hasErrorMessage(done));
    });

    it('사물함 현황 수정 실패: 유효하지 않은 아이디', (done) => {
      managerAgent
        .patch('/users/id')
        .send({ note: '고장' })
        .expect(400)
        .end(hasErrorMessage(done));
    });

    it('사물함 현황 수정 실패: 유효하지 않은 입력', (done) => {
      managerAgent
        .patch('/users/0')
        .send({ userId: '고장' })
        .expect(400)
        .end(hasErrorMessage(done));
    });

    it('사물함 현황 수정 실패: 존재하지 않는 사물함', (done) => {
      managerAgent
        .patch('/users/10000')
        .send({ note: '고장' })
        .expect(404)
        .end(hasErrorMessage(done));
    });
  });

  context('POST /lockers/:id/rent', () => {
    it('사물함 대여 성공', (done) => {
      managerAgent
        .post('/lockers/0/rent')
        .send({ userId: 12345678 })
        .expect(200)
        .end(isSuccessMessage(done));
    });

    it('사물함 대여 실패: 인증없음', (done) => {
      request(app)
        .post('/lockers/0/rent')
        .send({ userId: 12345678 })
        .expect(401)
        .end(hasErrorMessage(done));
    });

    it('사물함 대여 실패: 권한없음', (done) => {
      userAgent
        .post('/lockers/0/rent')
        .send({ userId: 12345678 })
        .expect(403)
        .end(hasErrorMessage(done));
    });

    it('사물함 대여 실패: 유효하지 않은 아이디', (done) => {
      managerAgent
        .post('/lockers/id/rent')
        .send({ userId: 12345678 })
        .expect(400)
        .end(hasErrorMessage(done));
    });

    it('사물함 대여 실패: 유효하지 않은 입력', (done) => {
      managerAgent
        .post('/lockers/0/rent')
        .send({ userId: 'user' })
        .expect(400)
        .end(hasErrorMessage(done));
    });

    it('사물함 대여 실패: 존재하지 않는 사물함', (done) => {
      managerAgent
        .post('/lockers/100000/rent')
        .send({ userId: 12345678 })
        .expect(404)
        .end(hasErrorMessage(done));
    });
  });

  context('POST /lockers/:id/return', () => {
    it('사물함 반납 성공', (done) => {
      managerAgent
        .post('/lockers/0/return')
        .expect(200)
        .end(isSuccessMessage(done));
    });

    it('사물함 반납 실패: 인증없음', (done) => {
      request(app)
        .post('/lockers/0/return')
        .expect(401)
        .end(hasErrorMessage(done));
    });

    it('사물함 반납 실패: 권한없음', (done) => {
      userAgent
        .post('/lockers/0/return')
        .expect(403)
        .end(hasErrorMessage(done));
    });

    it('사물함 반납 실패: 유효하지 않은 아이디', (done) => {
      managerAgent
        .post('/lockers/id/return')
        .expect(400)
        .end(hasErrorMessage(done));
    });

    it('사물함 반납 실패: 존재하지 않는 사물함', (done) => {
      managerAgent
        .post('/lockers/100000/return')
        .expect(404)
        .end(hasErrorMessage(done));
    });
  });
});
