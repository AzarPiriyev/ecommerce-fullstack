import express from 'express';
// routes/products.js

const router = express.Router();
import { searchProducts }from '../controllers/search.controller.js'; // Controller dosyasındaki fonksiyonu içe aktarıyoruz

// Arama endpoint’i - keyword parametresi ile arama yapacak
router.get('/:keyword', searchProducts);

export default router;
