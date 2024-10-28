import express from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from '../controllers/category.controller.js';

const router = express.Router();

// POST: Create a new category
router.post('/', createCategory);

// GET: Get all categories
router.get('/', getCategories);

// GET: Get a single category by ID
router.get('/:id', getCategoryById);

// PUT: Update a category by ID
router.put('/:id', updateCategory);

// DELETE: Delete a category by ID
router.delete('/:id', deleteCategory);

export default router;
