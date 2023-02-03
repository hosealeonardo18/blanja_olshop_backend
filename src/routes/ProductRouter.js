const express = require('express');
const router = express.Router();
const productController = require('../controller/ProductController');

const {
    protect
} = require('../middleware/AuthMiddleware');

const upload = require('../middleware/MulterMiddleware');

router.get('/', productController.getAllProduct);
router.get('/:id', productController.getDetailProduct);
router.post('/', protect, upload, productController.createProduct);
router.put('/:id', protect, upload, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;