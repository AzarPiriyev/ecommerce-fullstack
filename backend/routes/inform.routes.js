import express from 'express';
import {
  createInform,
  getAllInforms,
  getInformById,
  updateInform,
  deleteInform,
} from '../controllers/inform.controller.js';

const router = express.Router();


router.post('/', createInform);


router.get('/', getAllInforms);


router.get('/:id', getInformById);


router.patch('/:id', updateInform);


router.delete('/:id', deleteInform);

export default router;
