
import express from 'express';
const router = express.Router();
export default router;
import * as controller from '../controllers/postController.mjs';

// read
router.get('/docs', controller.getDocs);

router.get('/docs/:id', controller.getDocById);

router.get('/docs/:title', controller.getDocById);

router.get('/docs/:desc', controller.getDocById);

router.get('/docs/search/:id', controller.getDocById);

// write
router.post('/docs/create', controller.createDoc);

router.post('/docs/create/user', controller.createDoc);
