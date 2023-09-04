
import express from 'express';
const router = express.Router();
export default router;
import * as controller from '../controllers/postController.mjs';
import * as testController from '../controllers/testController.mjs';

// read
router.get('/docs', testController.getDocs);

router.get('/docs/:id', testController.getDocById);

router.get('/docs/:id/pages/:name', testController.getPageById);

//router.get('/docs/:title', controller.getDocById);

//router.get('/docs/:desc', controller.getDocById);

// write
router.post('/docs/create', controller.createDoc);

router.post('/docs/create/user', controller.createDoc);

router.post('/docs/:userId/pages/:pageId/nodes/:nodeId/test', controller.updateNode);

// testing
router.get('/docs/:userId/pages/:pageId/search/:nodeId', testController.searchNode);
