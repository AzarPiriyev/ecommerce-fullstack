import express from 'express';
import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contact.controller.js';

const router = express.Router();

// GET: Tüm contact bilgilerini getir
router.get('/', getContacts);

// GET: Tek bir contact bilgisini getir (ID ile)
router.get('/:id', getContactById);

// POST: Yeni contact bilgisi ekle
router.post('/', createContact);

// PUT: Var olan contact bilgisini güncelle (ID ile)
router.put('/:id', updateContact);

// DELETE: Contact bilgisini sil (ID ile)
router.delete('/:id', deleteContact);

export default router;
