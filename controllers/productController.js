const express = require('express');
const router = express.Router();

const Product = require('../models/products'); 

const UserCart = require('../models/cart');

const User=require("../models/User")

//----------------------------------- for creating the new product-----------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const CREATEPRODUCT=('/products', async (req, res) => 
{
                             try
                              {
                                const sellerEmail = req.body.email;
                                      console.log(req.body);

                                      const user = await User.findOne({ email: sellerEmail });

                                      if (!user) {
                                          res.status(404).json({ error: 'User not found' });
                                          return;
                                      }
                                       const product = await Product.create(
                                                 {
                                                                     productName : req.body.productName ,

                                                                     productDescription:req.body.productDescription,

                                                                     Negotiable : req.body.Negotiable, 

                                                                     productPrice:req.body.productPrice, 

                                                                     Category:req.body.Category, 

                                                                     productImage:req.body.productImage,                                                      

                                                                     selleremail:sellerEmail,
                                                            
                                                });
                                    
                                       console.log(product);

                                      res.status(201).json(product);

                                } 
                           catch (error)
                                                  {
                                                                  res.status(400).json({ error: 'Failed to create product' });
                                                                  console.log(error);
                                                   }
});
// -----------------------------------for getting the all products to home page--------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const GETPRODUCTS=('/get-products', async (req, res) => 
{
                               try 
                               {
                                         const products = await Product.find();

                                         res.status(200).json(products);
                               }
                                catch (error)
                                 {
                                          res.status(500).json({ error: 'Failed to fetch products' });
                                  }
});
//--------------------for getting specific products of user login ---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const PRODUCTGETBYEMAIL=('/get-products-email', async (req, res) => 
{
                   try 
                   {
                                   const email = req.body.email;

                                   const products = await Product.find({ selleremail: email }); 
                                   console.log(products);

                                       if (products.length > 0)
                                        { 
                                            res.status(200).json(products);
                                        }
                                         else
                                          {
                                                  res.status(404).json({ error: 'No products found for this email' });
                                          }
                  }
                   catch (error) 
                   {
                                  res.status(500).json({ error: 'Failed to fetch products' });
                   }
});
//--------------------------------- Get a specific product by NAME-------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const PRODUCTGETBYNAME=('/products/:productName', async (req, res) => 
{
                                try 
                                {
                                                    const productName = req.body.productName;
                                                     const product = await Product.find({ productName });

                                                           if (product)
                                                                       {
                                                                              res.status(200).json(product);
                                                                        }
                                                            else 
                                                                           {
                                                                                res.status(404).json({ error: 'Product not found' });
                                                                            }
                                } 
                                catch (error) 
                                {
                                                res.status(500).json({ error: 'Failed to fetch product' });
                                }
});
//--------------------------------- Update a product by ID------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const PRODUCTUPDATEBYNAME=('/products/:productName', async (req, res) => 
{
                       try
                        {
                                     const productName = req.body.productName;
                                     const updatedProduct = 
                                                                           {
                                                                                   productDescription: req.body.productDescription,
                                                                                   productPrice: req.body.productPrice,
                                                                                   productImage:req.body.productImage,
                                                                            };

                                   const product = await Product.findOneAndUpdate({ productName }, updatedProduct, { new: true });

                                                                    if (product)
                                                                     {
                                                                                      res.status(200).json(product);
                                                                     }
                                                                      else 
                                                                      {
                                                                           res.status(404).json({ error: 'Product not found' });
                                                                      }
                         } 
                         catch (error)
                          {
                                   res.status(500).json({ error: 'Failed to update product' });
                            }
});
// -------------------------------Delete a product by ID's-----------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const DELETEPRODUCTINCART = ('/cart/deleteproduct', async (req, res) => {
                                try
                                 {
                                       const userId = req.body.userId; 
                                       const productId = req.body.productId;

     
                                      const userCart = await UserCart.findOne({ user: userId });

                                              if (!userCart) 
                                              {
                                                    res.status(400).json({ error: 'User cart not found' });
                                                   return;
                                               }

                                                const updatedCartItems = userCart.cartItems.filter(item => item.product.toString() !== productId);

                                        userCart.cartItems = updatedCartItems;
                                        await userCart.save();

                                       res.status(200).json({ message: 'Product successfully removed from cart' });
                              } 
                           catch (error)
                            {
                                   res.status(500).json({ error: 'Failed to remove product from cart' });
                             }
});


// --------------------------------SEARCH API --------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const SEARCHPRODUCTS = ('/search', async (req, res) => 
{
                                                  const { productName, category, sort } = req.body;

                     try {
                                   let products;

                                    if (sort === 'topRated')
                                          {
                                                   products = await Product.find({
                                                   productName: { $regex: productName, $options: 'i' },
                                                   Category: { $regex: category, $options: 'i' }
                                                   }).sort({ rating: -1 });
                                          }

                                                                              else if (sort === 'highestPrice')
                                                                               {
                                                                                       products = await Product.find({
                                                                                       productName: { $regex: productName, $options: 'i' },
                                                                                      Category: { $regex: category, $options: 'i' }
                                                                                       }).sort({ productPrice: -1 });
                                                                              }

                                                                               else if (sort === 'lowestPrice') 
                                                                               {
                                                                                       products = await Product.find({
                                                                                       productName: { $regex: productName, $options: 'i' },
                                                                                      Category: { $regex: category, $options: 'i' }
                                                                                  } ).sort({ productPrice: 1 });
                                                                                } 

                                     else
                                      {

                                               products = await Product.find({
                                               productName: { $regex: productName, $options: 'i' },
                                               Category: { $regex: category, $options: 'i' }
                                                 });
                                      } 

                                                   res.json(products);
                             } 
                           catch (error)
                            {
                                    console.error('problm in  searching products:', error);
                                   res.status(500).json({ error: 'error' });
                            }
});

// ----------------------------------ADD TO PRODUCTS for that SPECIFIC USER--------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const PRODUCTADDTOCART = ('/addtocart', async (req, res) =>
 {
                            try
                             {
                                   const userId = req.body.userId;
                                  const productId = req.body.productId;

                                   console.log(userId, productId);

     
                                    let userCart = await UserCart.findOne({ user: userId });

                               if (!userCart)
                                {
                                            console.log( userId);
                                             userCart = await UserCart.create({ user: userId, cartItems: [{ product: productId }] });
                                } 
                                else 
                                {
                                      console.log( userCart);
                                      userCart.cartItems.push({ product: productId });
                                     await userCart.save();
                                }

                                             res.json({ message: 'Product added to cart successfully' });
                                            console.log(res.json);
                               } 

                               catch (error)
                                {
                                           console.error(error);
                                           res.status(500).json({ error: 'An error occurred' });
                               }
});



// ---------------------------------for getting that products in cart--------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------
const GETCARTPRO = ('/usercart', async (req, res) => 
{
                     try 
                     {
                                    const userId = req.body.userId;

   
                                     const userCart = await UserCart.find({ user: userId }).populate('cartItems.product');
                                     console.log(userCart);
                                    res.json(userCart);
                   }
                    catch (error)
                     {
                              console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});


// -------------------------------------------for deleting the product of user added products----------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
const DELPROUSERDASH=('/UserDashproducts', async (req, res) =>
 {
                                         try
                                          {
                                                      const productId = req.body.productId;
                                                      console.log(productId);
                                                      const result = await Product.deleteOne({ _id: productId });
                                                      console.log(result);

                                  if (result.deletedCount === 0) 
                                  {
                                               res.status(404).json({ error: 'Product not found' });
                                               return;
                                    }

                                  res.status(200).json({ message: 'Product successfully deleted' });
                                         }                         
                      catch (error)
                                      {
                                             res.status(500).json({ error: 'Failed to delete product' });
                      } 
});



module.exports={
    CREATEPRODUCT,

    GETPRODUCTS,

    PRODUCTGETBYEMAIL,

    PRODUCTGETBYNAME,

    PRODUCTUPDATEBYNAME,

    DELETEPRODUCTINCART,

    SEARCHPRODUCTS,

   PRODUCTADDTOCART,

   GETCARTPRO,

   DELPROUSERDASH
    
}
