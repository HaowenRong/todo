import express from 'express';
const router = express.Router();
export default router;
import * as controller from '../controllers/userController.mjs';

// read
router.get('/users/search/:id', controller.searchUser);

// write
router.post('/users/create', controller.createUser);
