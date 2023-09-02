const express = require('express');

const productController = require('../controllers/productController');

const router = express.Router();

// const { authenticateToken, checkAdmin } =require("../middleware/isAdminMiddleware")

router.post('/products', productController.CREATEPRODUCT);//create new

router.post('/get-products', productController.GETPRODUCTS);// Get all products

router.post('/get-products-email', productController.PRODUCTGETBYEMAIL);// Get all specific user products

router.post('/products/:productName', productController.PRODUCTGETBYNAME);// Get a specific product by  name

router.put('/products/:productName', productController.PRODUCTUPDATEBYNAME);// Update a product by name

router.delete('/cart/deleteproduct', productController.DELETEPRODUCTINCART);// Delete a product byname

router.post('/search',productController.SEARCHPRODUCTS);//search api 

router.post('/addtocart',productController.PRODUCTADDTOCART);//for adding product to cart 

router.post('/usercart',productController.GETCARTPRO);//getting product for cart

router.delete('/UserDashproducts',productController.DELPROUSERDASH);

module.exports = router;