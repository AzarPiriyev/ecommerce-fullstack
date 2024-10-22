import express from 'express';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller.js';

const router = express.Router();

// GET: Tüm kategorileri getir
router.get('/', getCategories);

// GET: Tek bir kategoriyi getir (ID ile)
router.get('/:id', getCategoryById);

// POST: Yeni kategori ekle
router.post('/', createCategory);

// PUT: Var olan kategoriyi güncelle (ID ile)
router.put('/:id', updateCategory);

// DELETE: Kategoriyi sil (ID ile)
router.delete('/:id', deleteCategory);

export default router;
