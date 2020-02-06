const { Router } = require('express');
const Level = require('../constants/Level');
const resources = require('../controllers/resources');
const { verifyAuth, verifyAuthLevel } = require('../middlewares/auth');
const { handleAsync } = require('../utils/routes');

const verifyManager = verifyAuthLevel(Level.ADMIN | Level.OWNER);

const router = Router();

router.get('/', verifyAuth, verifyManager, handleAsync(resources.getResources));
router.get('/:id', verifyAuth, verifyManager, handleAsync(resources.getResource));
router.patch('/:id', verifyAuth, verifyManager, handleAsync(resources.updateResource));
router.post('/:id/rent', verifyAuth, verifyManager, handleAsync(resources.allocateResource));
router.post('/:id/return', verifyAuth, verifyManager, handleAsync(resources.freeResource));

module.exports = router;
