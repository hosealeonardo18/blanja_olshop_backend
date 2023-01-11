const express = require('express');
const router = express.Router();
const sellerController = require('../controller/SellerController');

// getData
router.get('/', sellerController.getAllSeller);

// getDetailData
router.get('/:id', sellerController.getDetailSeller);

// // create data
router.post('/', sellerController.createSeller);

// // updateData
router.put('/:id', sellerController.updateSeller);

// // delete data
router.delete('/:id', sellerController.deleteSeller);

module.exports = router;