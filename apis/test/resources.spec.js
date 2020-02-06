const assert = require('assert');
const request = require('supertest');
const app = require('../src/app');
const { hasErrorMessage, isSuccessMessage } = require('../src/utils/responses');
const tester = require('../src/utils/tester');

let managerAgent;
let userAgent;

describe('route:resources', () => {
  before(async () => {
    managerAgent = await tester.tryLogin('manager');
    userAgent = await tester.tryLogin('user');
  });

  context('GET /resources', () => {
    it('모든 복지물품 현황 조회 성공', (done) => {
      managerAgent
        .get('/resources')
        .expect(200)
        .end((err, res) => {
          if (err) {
            assert.fail(err);
          } else {
            const { body } = res;
            assert(body.message === 'success');
            assert(Array.isArray(body.resources));
            const { resources } = body;
            resources.forEach((resource) => {
              assert(typeof resource.id === 'number');
              assert(typeof resource.name === 'string');
              assert(typeof resource.userId === 'number' || resource.userId === null);
              assert(typeof resource.note === 'string' || resource.note === null);
              assert(typeof resource.rentedAt === 'string' || resource.rentedAt === null);
              assert(typeof resource.returnedAt === 'string' || resource.returnedAt === null);
            });
            done();
          }
        });
    });

    it('모든 복지물품 현황 조회 실패: 인증없음', (done) => {
      request(app)
        .get('/resources')
        .expect(401)
        .end(hasErrorMessage(done));
    });

    it('모든 복지물품 현황 조회 실패: 권한없음', (done) => {
      userAgent
        .get('/resources')
        .expect(403)
        .end(hasErrorMessage(done));
    });
  });

  context('GET /resources/:id', () => {
    it('복지물품 현황 조회 성공', (done) => {
      managerAgent
        .get('/resources/1')
        .expect(200)
        .end((err, res) => {
          if (err) {
            assert.fail(err);
          } else {
            const { body } = res;
            assert(body.message === 'success');
            assert(typeof body.resource === 'object');
            const { resource } = body;
            assert(typeof resource.id === 'number');
            assert(typeof resource.name === 'string');
            assert(typeof resource.userId === 'number' || resource.userId === null);
            assert(typeof resource.note === 'string' || resource.note === null);
            assert(typeof resource.rentedAt === 'string' || resource.rentedAt === null);
            assert(typeof resource.returnedAt === 'string' || resource.returnedAt === null);
            done();
          }
        });
    });

    it('복지물품 현황 조회 실패: 인증없음', (done) => {
      request(app)
        .get('/resources/1')
        .expect(401)
        .end(hasErrorMessage(done));
    });

    it('복지물품 현황 조회 실패: 권한없음', (done) => {
      userAgent
        .get('/resources/1')
        .expect(403)
        .end(hasErrorMessage(done));
    });

    it('복지물품 현황 조회 실패: 유효하지 않은 아이디', (done) => {
      managerAgent
        .get('/resources/id')
        .expect(400)
        .end(hasErrorMessage(done));
    });

    it('복지물품 현황 조회 실패: 존재하지 않는 복지물품', (done) => {
      managerAgent
        .get('/resources/10000')
        .expect(404)
        .end(hasErrorMessage(done));
    });
  });

  context('PATCH /resources/:id', () => {
    it('복지물품 현황 수정 성공', (done) => {
      managerAgent
        .patch('/resources/1')
        .send({ note: '고장' })
        .expect(200)
        .end(isSuccessMessage(done));
    });

    it('복지물품 현황 수정 실패: 인증없음', (done) => {
      request(app)
        .patch('/resources/1')
        .send({ note: '고장' })
        .expect(401)
        .end(hasErrorMessage(done));
    });

    it('복지물품 현황 수정 실패: 권한없음', (done) => {
      userAgent
        .patch('/resources/1')
        .send({ note: '고장' })
        .expect(403)
        .end(hasErrorMessage(done));
    });

    it('복지물품 현황 수정 실패: 유효하지 않은 아이디', (done) => {
      managerAgent
        .patch('/resources/id')
        .send({ note: '고장' })
        .expect(400)
        .end(hasErrorMessage(done));
    });

    it('복지물품 현황 수정 실패: 유효하지 않은 입력', (done) => {
      managerAgent
        .patch('/resources/0')
        .send({ userId: '고장' })
        .expect(400)
        .end(hasErrorMessage(done));
    });

    it('복지물품 현황 수정 실패: 존재하지 않는 복지물품', (done) => {
      managerAgent
        .patch('/resources/10000')
        .send({ note: '고장' })
        .expect(404)
        .end(hasErrorMessage(done));
    });
  });

  context('POST /resources/:id/rent', () => {
    it('복지물품 대여 성공', (done) => {
      managerAgent
        .post('/resources/1/rent')
        .send({ userId: 12345678 })
        .expect(200)
        .end(isSuccessMessage(done));
    });

    it('복지물품 대여 실패: 인증없음', (done) => {
      request(app)
        .post('/resources/1/rent')
        .send({ userId: 12345678 })
        .expect(401)
        .end(hasErrorMessage(done));
    });

    it('복지물품 대여 실패: 권한없음', (done) => {
      userAgent
        .post('/resources/1/rent')
        .send({ userId: 12345678 })
        .expect(403)
        .end(hasErrorMessage(done));
    });

    it('복지물품 대여 실패: 유효하지 않은 아이디', (done) => {
      managerAgent
        .post('/resources/id/rent')
        .send({ userId: 12345678 })
        .expect(400)
        .end(hasErrorMessage(done));
    });

    it('복지물품 대여 실패: 유효하지 않은 입력', (done) => {
      managerAgent
        .post('/resources/1/rent')
        .send({ userId: 'user' })
        .expect(400)
        .end(hasErrorMessage(done));
    });

    it('복지물품 대여 실패: 존재하지 않는 복지물품', (done) => {
      managerAgent
        .post('/resources/100000/rent')
        .send({ userId: 12345678 })
        .expect(404)
        .end(hasErrorMessage(done));
    });
  });

  context('POST /resources/:id/return', () => {
    it('복지물품 반납 성공', (done) => {
      managerAgent
        .post('/resources/1/return')
        .expect(200)
        .end(isSuccessMessage(done));
    });

    it('복지물품 반납 실패: 인증없음', (done) => {
      request(app)
        .post('/resources/1/return')
        .expect(401)
        .end(hasErrorMessage(done));
    });

    it('복지물품 반납 실패: 권한없음', (done) => {
      userAgent
        .post('/resources/1/return')
        .expect(403)
        .end(hasErrorMessage(done));
    });

    it('복지물품 반납 실패: 유효하지 않은 아이디', (done) => {
      managerAgent
        .post('/resources/id/return')
        .expect(400)
        .end(hasErrorMessage(done));
    });

    it('복지물품 반납 실패: 존재하지 않는 복지물품', (done) => {
      managerAgent
        .post('/resources/100000/return')
        .expect(404)
        .end(hasErrorMessage(done));
    });
  });
});
