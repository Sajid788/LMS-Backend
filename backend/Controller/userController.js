const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../Model/User");
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../Config/db')
const uuid = require('uuid')

const userController = express.Router();

userController.post('/signup', async(req,res)=>{
    const {name, email, password,role, city, courses} = req.body;
 
    if(!name || !email || !password || !role || !city || !courses){
     return  res.send({msg: "please fill the all feild"});
    }
    try {
     const exist = await userModel.findOne({email});
     if(exist){
      return res.send({msg:"Usre already exist, please login"})
     }

     const customId = generateCustomId();
     bcrypt.hash(password, 5, async(err, hash) => {
       if(err){
         return res.send({msg:"something went wrong"})
       }
       try {
           const user =  await userModel.create({
             Id:customId,
             name: name,
             email: email,
             password: hash,
             role: role,
             city: city,
             courses:courses

         })
         res.send({msg:"user created sucessfully"});
         console.log(user)
       } catch (error) {
         console.log(error)
         res.send({msg:"something went wrong"})
       }
     });
    } catch (error) {
     console.log(error)
    }
 })

 userController.post('/login', async(req,res)=>{
    const { email, password} = req.body;
 
    if(!email || !password){
     return  res.send({msg: "please fill the all feild"});
    }
   try {
    const user = await userModel.findOne({email});
    if(!user){
       return  res.send({msg:"singup first"}) 
    }
    bcrypt.compare(password, user.password, async(err, result)=> {
        if(result){
            const token = jwt.sign({ userId: user._id, userRole:user.role }, JWT_SECRET);
            res.send({
              msg: "Login sucessfull",
              userData:{
              token:token,
              name :user.name,
              },
            })
        }else{
            res.send({msg:"wrong credential"})
        }
    });
   } catch (error) {
    console.log(error)
   }
 });

 function generateCustomId () {
    return uuid.v4();
 }

module.exports = 
    {userController}