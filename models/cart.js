const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema(
    {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, 
    quantity: { type: Number, default: 1 },
    addedAt: { type: Date, default: Date.now },
});

const userCartSchema = new mongoose.Schema(
    {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true }, 
    cartItems: [cartItemSchema],
});

const UserCart = mongoose.model('UserCart', userCartSchema);

module.exports = UserCart;
