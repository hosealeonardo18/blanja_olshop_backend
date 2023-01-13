const express = require('express');
const router = express.Router();
const sellerController = require('../controller/SellerController');
const {
    validate
} = require('../middleware/common')

// getData
router.get('/', sellerController.getAllSeller);

// getDetailData
router.get('/:id', sellerController.getDetailSeller);

// // create data
router.post('/', validate, sellerController.createSeller);

// // updateData
router.put('/:id', validate, sellerController.updateSeller);

// // delete data
router.delete('/:id', sellerController.deleteSeller);

module.exports = router;