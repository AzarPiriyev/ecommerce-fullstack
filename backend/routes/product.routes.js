import express from 'express';
import { getProductById,getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getNewArrival,
    getTopSelling } from '../controllers/product.controller.js';

const router = express.Router();

// GET: Tüm ürünleri getir
router.get('/', getProducts);

router.get('/productsNewArrival',  getNewArrival);

router.get('/productsTopSelling',  getTopSelling);

// GET: Tek bir ürünü getir (ID ile)
router.get('/:id', getProductById);

// POST: Yeni ürün ekle
router.post('/', createProduct);

// PUT: Var olan ürünü güncelle (ID ile)
router.put('/:id', updateProduct);

// DELETE: Ürünü sil (ID ile)
router.delete('/:id', deleteProduct);



export default router;
