const express = require('express');
const router = express.Router();
const customerController = require('../controller/CustomerController');

// getData
router.get('/', customerController.getAllCustomer);

// getDetailData
router.get('/:id', customerController.getDetailCustomer);

// // create data
router.post('/', customerController.createCustomer);

// // updateData
router.put('/:id', customerController.updateCustomer);

// // delete data
router.delete('/:id', customerController.deleteCustomer);


module.exports = router;