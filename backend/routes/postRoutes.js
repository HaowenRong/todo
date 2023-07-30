
const express = require('express');
const router = express.Router();
const controller = require('../controllers/postController');

// read
router.get('/docs', controller.getDocs);

router.get('/docs/:id', controller.getDocById);

router.get('/docs/:title', controller.getDocById);

router.get('/docs/:desc', controller.getDocById);

router.get('/docs/search/:id', controller.getDocById);

// write
router.post('/docs/create', controller.createDoc);

router.post('/docs/create/user', controller.createDoc);

module.exports = router;
