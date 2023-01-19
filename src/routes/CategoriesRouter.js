const express = require('express');
const router = express.Router();
const categoriesController = require('../controller/CategoriesController');
const upload = require('../middleware/MulterMiddleware');

// getData
router.get('/', categoriesController.getAllCategories);
router.get('/:id', categoriesController.getDetailCategories);
router.post('/', upload, categoriesController.createCategories);
router.put('/:id', upload, categoriesController.updateCategories);
router.delete('/:id', categoriesController.deteleCategories);

module.exports = router;