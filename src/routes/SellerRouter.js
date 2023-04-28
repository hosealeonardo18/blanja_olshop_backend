const express = require('express');
const router = express.Router();
const sellerController = require('../controller/SellerController');
const {
  protect
} = require('../middleware/AuthMiddleware');
const upload = require('../middleware/MulterMiddleware');

// getData
router.get('/', sellerController.getAllSeller);
router.get('/:id', sellerController.getDetailSeller);
router.put('/:id', protect, upload, sellerController.updateSeller);
router.delete('/:id', sellerController.deleteSeller);

// auth
router.post('/auth/register', sellerController.registerSeller);
router.post('/auth/login', sellerController.loginSeller);
router.post('/auth/refresh-token', sellerController.refreshToken);
router.get('/auth/profile-seller', protect, sellerController.profileSeller);


module.exports = router;