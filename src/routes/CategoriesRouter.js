const express = require('express');
const router = express.Router();
const categoriesController = require('../controller/CategoriesController');

// getData
router.get('/', categoriesController.getAllCategories);
router.get('/:id', categoriesController.getDetailCategories);
router.post('/', categoriesController.createCategories);

module.exports = router;