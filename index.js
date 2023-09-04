const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const cors = require('cors');

const authRoutes = require('./routes/auth');

const productRoute = require('./routes/productRoute');

const multer = require('multer');

const product= require('./models/products');

const db = require('./config/db');

const app= express();

app.use(cookieParser());


app.use(bodyParser.json());

app.use(cors());

app.use(bodyParser.json({limit: '1GB'}));

app.use(cors());

app.use(function(req, res, next) 
{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/auth', authRoutes);

app.use('/apiproduct',productRoute);

const port = 6000;


// // ---------------
// async function deleteAllUsers() {
//   try {
//     const result = await product.deleteMany({});
//     console.log(`${result.deletedCount} users deleted.`);
//   } catch (error) {
//     console.error('Error deleting users:', error);
//   } finally {
//     // Close the database connection
//     mongoose.connection.close();
//   }
// }

// // Call the function to delete all users
// deleteAllUsers();

app.listen(port,()=>{
    console.log(`Server Is Running On Port ${port}`);
});

