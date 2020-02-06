const { Router } = require('express');
const resources = require('./resources');

const router = Router();

const pong = (_, res) => res.json({ message: 'pong' });
const notFound = (_, res) => res.status(404).json({ message: 'Not Found' });

router.all('/ping', pong);

router.use('/resources', resources);

router.use(notFound);

module.exports = router;
