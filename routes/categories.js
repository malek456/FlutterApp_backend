import express from 'express';
import {  getCategories,
     getCategoryById,
      updateCategory,
       deleteCategory,
        createCategory } from '../controllers/categories.js';

const router = express.Router();

router.get('/', getCategories);
router.get('/:categoryId', getCategoryById);
router.post('/', createCategory);
router.put('/:categoryId', updateCategory);
router.delete('/:categoryId', deleteCategory);


export default router;
