const express = require('express');

const router = express.Router();

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require('../models/User');

const secretKey = require('../config/authConfig');

const isAdminMiddleware = require('../middleware/isAdminMiddleware');

const mongodb = require('mongodb');

// ------------------------------SIGN UP-----------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const SIGNUP=('/signup', async (req, res) =>
 {
          try 
                  {
                                const { email, password } = req.body;

                                const existingUser = await User.findOne({ email });

                                console.log(existingUser);

                                         if (existingUser)
                                                   {
                                                              return res.status(400).json({ message: 'Entered Email Is Already Registered SO Try With New EMail' });
                                                   }
                                         else
                                                  {
                                                        const hashedPassword = await bcrypt.hash(password, 10);

                                                        const newUser = new User({ email, password: hashedPassword });

                                                        console.log(newUser);

                                                        await User.create(newUser);

                                                         res.status(201).json({ message: 'WELCOME ....! New User registered successfully' });

                                                  }

                    }

            catch (error) 
                                          {
                                                   console.error(error);
                                                   res.status(500).json({ message: 'Internal server error' });
                                           }
  });

// --------------------------------------------------------LOGIN---------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

const LOGIN=('/login', async (req, res) => 
{
                                           try
                                                         {
                                                                         const { email, password } = req.body;
                                                                          console.log(email);
                                                                         console.log(password);
                                                                            const user = await User.findOne({ email });

                                                                            if (!user) 
                                                                            {
                                                                              return res.status(401).json({ message: 'Invalid credentials Your Email Not Found' });
                                                                            }


                                                                          const isPasswordValid = await user.comparePassword(password);
    
                                                                          console.log(isPasswordValid);
                                                                          console.log(typeof (isPasswordValid));
                                                                          console.log(password);
                                                                          console.log(req.body.isAdmin);


                                                                          if (!isPasswordValid)
                                                                           {
                                                                            return res.status(401).json({ message: 'Invalid credentials password is mismatch' });
                                                                          }
                                                                      
                                                                          const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin, email: user.email, password: user.password },
                                                                           secretKey, { expiresIn: '1d' } );
                                                                          const decode = jwt.decode(token);
                                                                          console.log(decode);
                                                                          res.cookie('token', token);

                                                                           
                                                                              res.json({ token, isAdmin: user.isAdmin });

                                                                              // res.json({ token, isAdmin: user.isAdmin }); 
                                                                              // console.log("success");
                                                                          
                                                                              // res.status(201).json({ message: 'login  successfully' });

                                                          }

                                      catch (error) 
                                      {
                                                 console.error(error);
                                                res.status(500).json({ message: 'Internal server error' },);
                                      }
 });

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// updating the password or resetting the passworrd
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const FORGETPASSWORD=('/forget-password', async (req, res) => 
{
                                  try 
                                  {
                                              const { email, newPassword } = req.body;

                                              const hashedPassword = await bcrypt.hash(newPassword, 10);

                                              const user = await User.findOneAndUpdate({email},

                                                {password:hashedPassword});
                                              console.log(user);

                                                              if (!user) 
                                                              {
                                                                    return res.status(404).json({ message: 'User not found' });
                                                               }
                                                                    console.log(newPassword);
                                                            
                                                                    // user.password = hashedPassword;
                                                                    // await user.save();

                                                                    res.json({ message: 'Password reset successful' });

                                    } 
                                    catch (error)
                                     {
                                                        console.error(error);
                                                        res.status(500).json({ message: 'Internal server error' });
                                      }
});

// -----------------------------------------UPDATE USER PROFILE VIA EMAIL GETTING------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const UPDATEPROFILE=('/update-profile', async (req, res) => 
{
                                  try
                                   {
                                              const { email, firstName, lastName, phoneNo, address, profileImage } = req.body;
                                              console.log(req.body);
                                              const user = await User.findOne({ email });   
                                              console.log(user);
                                                            if (!user)
                                                             {
                                                                    return res.status(404).json({ message: 'User not found' });
                                                              }

                                                                
                                                                  user.firstName = firstName;
                                                                  user.lastName = lastName;
                                                                  user.phoneNo = phoneNo;
                                                                  user.address = address;
                                                                  user.profileImage = profileImage;

                                                                  await user.save();

                                                                res.json({ message: 'Profile updated successfully' });
                                      }

                                      catch (error) 
                                             {
                                                              console.error(error);
                                                             res.status(500).json({ message: 'Internal Server Error' });
                                               }

});

// -------------------------------------------GET EMAIL AND SEND ALL DATA TO UI FEILD BY POST METHOD-----------------
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
const USERPROFILE=('/user-profile', async (req, res) => 
{
                         try
                               {
                                          const registeredEmail = req.body.email;
                                          console.log(registeredEmail);
                                          const user = await User.findOne({ email: registeredEmail });
                                    if (!user) 
                                    {
                                                return res.status(404).send('User not found');
                                    }

                                 
                                      res.json({ 
                                       userEmail: user.email ,
                                      firstName: user.firstName,
                                      lastName: user.lastName,
                                      phoneNo: user.phoneNo,
                                       address: user.address,
                                       profileImage: user.profileImage
                                         });
                                  } 
                                          catch (error) 
                                          {
                                              console.error(error);
                                              res.status(500).json({ message: 'Internal Server Error' });
                                           }
});

// ---------------------------------------------CHANGE EMAIL---------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const CHANGEEMAIL=('/change-email',async(req,res)=>
{
                               try 
                                     {
                                             const {email,newEmail}=req.body;
                                            const user=await User.findOne({email});
                                            console.log(user);

                                            if(!user)
                                            {
                                              return res.status(404).json({message:"User Not FOund"});

                                            }
                                            else
                                            {
                                              user.email = newEmail;
                                              await user.save();
                                              res.json({message:'Email updated successfully'});
                                            }
                                     } 
                                                  catch (error)
                                                          {
                                                                console.log(error);
                                                                res.status(500).json({message:'Internal server error'});
                                                  
                                                          }
})


// module.exports = router;
module.exports={
  LOGIN,
  SIGNUP,
  FORGETPASSWORD,
  UPDATEPROFILE,
  USERPROFILE,
  CHANGEEMAIL
}


