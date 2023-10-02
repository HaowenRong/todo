import express from 'express';
const router = express.Router();
export default router;
import * as controller from '../controllers/listingsController.mjs';

// read
router.get('/listings/search/:id', controller.searchDoc);

// write
router.post('/listings/create',   controller.createDoc);
router.put( '/listings/edit/:id', controller.editDoc);