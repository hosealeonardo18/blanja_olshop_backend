const express = require('express');
const router = express.Router();
const productController = require('../controller/ProductController');
const {
    validate
} = require('../middleware/common');
const {
    protect
} = require('../middleware/AuthMiddleware');

const upload = require('../middleware/MulterMiddleware');

router.get('/', protect, productController.getAllProduct);
router.get('/:id', protect, productController.getDetailProduct);
router.post('/', upload, productController.createProduct);
router.put('/:id', protect, validate, productController.updateProduct);
router.delete('/:id', protect, productController.deleteProduct);

module.exports = router;