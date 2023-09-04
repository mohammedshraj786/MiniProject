const moment=require('moment');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {

    productName:{type:String,required:true,unique:true},

    productDescription:{type:String,required:true},

    Negotiable: { type: String, required: true },

    productPrice: { type: String, required: true },
    
    Category : {type:String,required:true},

    productImage:{type:String,required:true},

    selleremail: { type: String, required: true }, 

    date:{type:String,default: moment().format('DD-MMMM-YYYY')},

    status:{type:String,default:'active'},

    rating:{type:String,default:'4'},

    

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;