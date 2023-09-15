
import express from 'express';
const router = express.Router();
export default router;
import * as controller from '../controllers/postController.mjs';
import * as testController from '../controllers/testController.mjs';

import { Users } from '../models/post.mjs';

// read
router.get('/docs', testController.getDocs);

router.get('/docs/:id', testController.getDocById);

router.get('/docs/:id/pages/:name', testController.getPageById);

//router.get('/docs/:title', controller.getDocById);

//router.get('/docs/:desc', controller.getDocById);

// write
router.post('/docs/create', controller.createDoc);

router.post('/docs/create/user', controller.createDoc);

router.post('/docs/:userId/pages/:pageId/update/:nodeId', testController.updateNode);

// testing
router.get('/docs/:userId/pages/:pageId/search/:nodeId', testController.getNodeById);
const a = async (res, req) => {
  const user = await Users.findOne({ _id: '64e79f0134f6ea5edb0e0ac4' });
  if (!user) {
    console.log(user)
    return { error: 'User not found.' };
  }
  user.userName = 'aaaa';
  console.log(user);
  await user.save();
  req.json(user);
}


router.post('/docs/test', testController.test);


