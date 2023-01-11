const express = require('express');
const router = express.Router();
const productController = require('../controller/ProductController');
const {
    validate
} = require('../middleware/common')

// getData
router.get('/', productController.getAllProduct);

// getDetailData
router.get('/:id', productController.getDetailProduct);

// // create data
router.post('/', validate, productController.createProduct);

// // updateData
router.put('/:id', validate, productController.updateProduct);

// // delete data
router.delete('/:id', productController.deleteProduct);

module.exports = router;