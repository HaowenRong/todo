
const express = require('express');
const router = express.Router();
const controller = require('../controllers/postController');

// read
router.get('/docs', controller.getDocs);

router.get('/docs/:id', controller.getDocById);

router.get('/docs/:title', controller.getDocById);

router.get('/docs/:desc', controller.getDocById);

// write
router.post('/docs/create', controller.createDoc);

module.exports = router;
