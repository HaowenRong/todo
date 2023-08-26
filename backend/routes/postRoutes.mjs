
import express from 'express';
const router = express.Router();
export default router;
import * as controller from '../controllers/postController.mjs';

// read
router.get('/docs', controller.getDocs);

router.get('/docs/:id', controller.getDocById);

router.get('/docs/:id/pages/:name', controller.getPageById);

//router.get('/docs/:title', controller.getDocById);

//router.get('/docs/:desc', controller.getDocById);

router.get('/docs/search/:id', controller.getDocById);

// write
router.post('/docs/create', controller.createDoc);

router.post('/docs/create/user', controller.createDoc);


router.get('/docs/:userId/pages/:pageId/nodes/:nodeId', controller.getNodeById);

router.post('/docs/:userId/pages/:pageId/nodes/:nodeId/test', controller.updateNode);