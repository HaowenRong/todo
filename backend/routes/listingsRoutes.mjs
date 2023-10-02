import express from 'express';
const router = express.Router();
export default router;
import * as controller from '../controllers/listingsController.mjs';

// read
router.get('/docs/search/:id', controller.searchDoc);


// write
router.post('/docs/create',   controller.createDoc);
router.put( '/docs/edit/:id', controller.editDoc);
