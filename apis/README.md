# API

토큰은 `Set-Cookie: access_token=aaa.bbb.ccc` 또는 `Authorization: Bearer aaa.bbb.ccc` 헤더로 전송

## Summary

### Test

- [x] 핑퐁

### Lockers

- [ ] 모든 사물함 현황 조회
- [ ] 사물함 현황 조회
- [ ] 사물함 대여
- [ ] 사물함 반납

### Resources

- [ ] 모든 복지물품 현황 조회
- [ ] 복지물품 현황 조회
- [ ] 복지물품 대여
- [ ] 복지물품 반납

### Users

- [ ] 과자치비 납부
- [ ] 과자치비 현황 조회
- [ ] 과자치비 환불

## Test

### GET /ping

Output:

```js
{
  message: 'pong',
}
```

## Lockers

### GET /lockers

(Manager Auth Required) 모든 사물함 현황 조회

Output:

```js
{
  message: 'success',
  lockers: [
    {
      id: 0, // locker id
      location: '하이테크센터 1층',
      userId: 00000000, // nullable
      note: '', // nullable
      rentedAt: '2020-01-01 00:00:00', // nullable
      returnedAt: '2020-01-01 00:00:00', // nullable
    },
  ],
}
```

### GET /lockers/:id

(Manager Auth Required) 사물함 현황 조회

Output:

```js
{
  message: 'success',
  locker: {
    location: '하이테크센터 1층',
    userId: 00000000, // nullable
    note: '', // nullable
    rentedAt: '2020-01-01 00:00:00', // nullable
    returnedAt: '2020-01-01 00:00:00', // nullable
  },
}
```

### PATCH /lockers/:id

(Manager Auth Required) 사물함 현황 수정

Input:

```js
{
  location: '하이테크센터 1층',
  userId: 00000000, // nullable
  note: '', // nullable
  rentedAt: '2020-01-01 00:00:00', // nullable
  returnedAt: '2020-01-01 00:00:00', // nullable
}
```

Output:

```js
{
  message: 'success',
}
```

### POST /lockers/:id/rent

(Manager Auth Required) 사물함 대여

Input:

```js
{
  userId: 00000000,
  note: '', // nullable
  rentedAt: '2020-01-01 00:00:00', // nullable
}
```

Output:

```js
{
  message: 'success',
}
```

### POST /lockers/:id/return

(Manager Auth Required) 사물함 반납

Input:

```js
{
  note: '', // nullable
  returnedAt: '2020-01-01 00:00:00', // nullable
}
```

Output:

```js
{
  message: 'success',
}
```

## Resources

### GET /resources

(Manager Auth Required) 모든 복지물품 현황 조회

Output:

```js
{
  message: 'success',
  resources: {
    id: 0, // resource id
    name: '보조배터리 C타입 1',
    userId: 00000000, // nullable
    note: '', // nullable
    rentedAt: '2020-01-01 00:00:00', // nullable
    returnedAt: '2020-01-01 00:00:00', // nullable
  },
}
```

### GET /resources/:id

(Manager Auth Required) 복지물품 현황 조회

Output:

```js
{
  message: 'success',
  resource: {
    name: '보조배터리 C타입 1',
    userId: 00000000, // nullable
    note: '', // nullable
    rentedAt: '2020-01-01 00:00:00', // nullable
    returnedAt: '2020-01-01 00:00:00', // nullable
  },
}
```

### PATCH /resources/:id

(Manager Auth Required) 복지물품 현황 수정

Input:

```js
{
  name: '보조배터리 C타입 1',
  userId: 00000000, // nullable
  note: '', // nullable
  rentedAt: '2020-01-01 00:00:00', // nullable
  returnedAt: '2020-01-01 00:00:00', // nullable
}
```

Output:

```js
{
  message: 'success',
}
```

### POST /resources/:id/rent

(Manager Auth Required) 복지물품 대여

Input:

```js
{
  userId: 00000000,
  note: '', // nullable
  rentedAt: '2020-01-01 00:00:00', // nullable
}
```

Output:

```js
{
  message: 'success',
}
```

### POST /resources/:id/return

(Manager Auth Required) 복지물품 반납

Input:

```js
{
  note: '', // nullable
  returnedAt: '2020-01-01 00:00:00', // nullable
}
```

Output:

```js
{
  message: 'success',
}
```

## Users

### POST /users/:id/pay

(Manager Auth Required) 과자치비 납부

Input:

```js
{
  paid: 80000,
  note: '', // nullable
  paidAt: '2020-01-01 00:00:00', // nullable
}
```

Output:

```js
{
  message: 'success',
}
```

### GET /users/:id/pay

(Manager Auth Required) 과자치비 현황 조회

Output:

```js
{
  message: 'success',
  user: {
    paid: 80000, // nullable
    refunded: 80000, // nullable
    note: '', // nullable
    paidAt: '2020-01-01 00:00:00', // nullable
    refundedAt: '2020-01-01 00:00:00', // nullable
  },
}
```

### POST /users/:id/refund

(Manager Auth Required) 과자치비 환불

**사물함, 복지물품 대여여부 확인필요**

Input:

```js
{
  refunded: 80000, // nullable
  note: '', // nullable
  refundedAt: '2020-01-01 00:00:00', // nullable
}
```

Output:

```js
{
  message: 'success',
}
```
