const mongoose = require('mongoose'); 

const uri = "mongodb+srv://mohammedshraj786:Z0XjfJPXlC29IVKc@cluster0.hjj4o9t.mongodb.net/shoppingcart?retryWrites=true&w=majority";
// mongodb+srv://mohammedshraj786:<password>@cluster0.hjj4o9t.mongodb.net/

mongoose.connect(uri, 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,

});

const db = mongoose.connection;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', () => 
{
  console.log('Connected to MongoDB using Mongoose!');
});
module.exports = db;






