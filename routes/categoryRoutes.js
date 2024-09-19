const express= require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createCategoryController, getAllCategory, updateCategories } = require('../controllers/categoryController');

const router= express.Router();

router.post('/create', authMiddleware, createCategoryController)

router.get('/getAll', getAllCategory)

router.put('/update/:id', authMiddleware, updateCategories)
module.exports= router