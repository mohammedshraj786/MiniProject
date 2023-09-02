const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },

  firstName:{type:String,default:null},

  lastName:{type:String,default:null},

  phoneNo:{type:String,default:null},

  address:{type:String,default:null},

  profileImage:{type:String,default:null},

  isAdmin: { type: Boolean, default: false }, 


});


userSchema.methods.comparePassword = async function(candidatePassword)
 {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
