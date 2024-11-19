import express from 'express';


const router = express.Router();
import { searchProducts }from '../controllers/search.controller.js';  


router.get('/:keyword', searchProducts);

export default router;
