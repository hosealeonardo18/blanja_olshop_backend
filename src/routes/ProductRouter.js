const express = require('express');
const router = express.Router();
const productController = require('../controller/ProductController');

// getData
router.get('/', productController.getAllProduct);

// getDetailData
router.get('/:id', productController.getDetailProduct);

// create data
router.post('/', productController.createProduct);

// updateData
router.put('/:id', productController.updateProduct);

// delete data
router.delete('/:id', productController.deleteProduct);

module.exports = router;