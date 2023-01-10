const express = require('express');
const router = express.Router();
const categoriesRouter = require('../routes/CategoriesRouter');
// const customerRouter = require('../routes/CustomerRouter');
// const sellerRouter = require('../routes/SellerRouter');
// const productRouter = require('../routes/ProductRouter');

router.use('/categories', categoriesRouter);
// router.use('/customer', customerRouter);
// router.use('/seller', sellerRouter);
// router.use('/product', productRouter);

module.exports = router;