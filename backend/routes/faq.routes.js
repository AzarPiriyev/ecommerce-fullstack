import express from 'express';
import {
  getFaqs,
  getFaqById,
  createFaq,
  updateFaq,
  deleteFaq,
} from '../controllers/faq.controller.js';

const router = express.Router();

// GET: Tüm FAQ'ları getir
router.get('/', getFaqs);

// GET: Tek bir FAQ'ı getir (ID ile)
router.get('/:id', getFaqById);

// POST: Yeni FAQ ekle
router.post('/', createFaq);

// PUT: Var olan FAQ'ı güncelle (ID ile)
router.put('/:id', updateFaq);

// DELETE: FAQ'ı sil (ID ile)
router.delete('/:id', deleteFaq);

export default router;
