const bcrypt = require('bcrypt');
const User = require('../models/User');
const database=require("../config/db");

async function seedAdmin() {
  try {
    
    const adminEmail = 'admin123@gmail.com';
    const adminPassword = 'admin@Password12345';

    
    const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);

    
    const database = new User({
      email: adminEmail,
      password: hashedAdminPassword,
      isAdmin: true,
    });

    
    await database.save();

    console.log('Admin user added successfully');
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
}




module.exports=seedAdmin;
