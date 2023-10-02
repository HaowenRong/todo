import express from 'express';
const router = express.Router();
export default router;
import * as controller from '../controllers/pageController.mjs';

// read
router.get('/pages/search/:id', controller.searchPage);

// write
router.post('/pages/create',   controller.createPage);
router.put( '/pages/edit/:id', controller.editPage);