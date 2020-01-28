const { Router } = require('express');

const router = Router();

const pong = (_, res) => res.json({ message: 'pong' });
const notFound = (_, res) => res.status(404).json({ message: 'Not Found' });

router.all('/ping', pong);

router.use(notFound);

module.exports = router;
