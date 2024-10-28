import express from 'express';
import {
  createInform,
  getAllInforms,
  getInformById,
  updateInform,
  deleteInform,
} from '../controllers/inform.controller.js';

const router = express.Router();

// Route to create a new Inform
router.post('/', createInform);

// Route to get all Informs
router.get('/', getAllInforms);

// Route to get a single Inform by ID
router.get('/:id', getInformById);

// Route to update an Inform
router.patch('/:id', updateInform);

// Route to delete an Inform
router.delete('/:id', deleteInform);

export default router;
