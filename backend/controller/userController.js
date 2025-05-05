// import { Users } from "../Schema/userSchema";
const Users=require("../Schema/userSchema")
const Service=require("../Schema/serviceSchema")
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");
const { findUser } = require("../utils/finduser");
const JWT_SCERET_KEY=process.env.JWT_SCERET_KEY

const saltRounds = 10
exports.registerUser=async(req,res)=>{

    const {email,name,phone,password,confirmPassword ,location}=req.body
   
    try {
        if(  !name||!email  || !phone || !password|| !confirmPassword){
            return res.status(400).json({message:"Credential are not enoguh"})
           
        }
        const user=await Users.findOne({email})
        if(user){
            return res.status(401).json({
                message:"User alreay exits from this email"
            })
       
        }
   
        if(password !==confirmPassword){
            return res.status(401).json({
                message:"password and confirm password don't matches"
            })
        }


        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // console.log("hasehd",hashedPassword)
    const newuser=await Users.create({
        name,
        email,
        password:hashedPassword,
        phone,
        location
            
    })
        await newuser.save()  
        return res.status(200).json({
            message:"User created successfully"
        })
    } catch (error) {
        console.log("register error",error)
        return res.status(505).json({
        error
        })
    }
   
    
    

    }
exports.login=async(req,res)=>{
  
    try {
        const {email,password}=req.body
       
        if(!email||!password)return res.status(400).json({
            message:"credentials are not sufficient"
        })
        const user=await Users.findOne({email})
        if(!user)return res.status(400).json({
            message:"user not exits from this email"
        })
        const hashedPassword=user.password
        const decodedpassword=await bcrypt.compare(password,hashedPassword)

     if(decodedpassword){
  const token=jwt.sign({user},JWT_SCERET_KEY,{algorithm:"HS256"})

   const options={
    // expires:new Date(
    //   Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000
    // ),
    httpOnly:true

  }
   return res
   .cookie("token", token,options)
   .status(200)
   .json({ message: "Logged in successfully 😊 👌" });
     }
    else{
        return res.status(400).json({
            message:"credentials are wrong"
        })
    }
    } catch (error) {
        console.log("error from login",error)
        return res.status(500).json({
            error
        })
    }
}
exports.logout=async(req,res)=>{
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
          });
          res.status(200).json({
            succes: true,
            message: "logged out",
          });
    } catch (error) {
        console.log("error from login",error)
        return res.status(500).json({
            error
        })
    }
}
exports.updateProfile=async(req,res)=>{
    try {
        
        // if(!req.body)return 

        const token=req.cookies?.token
      
        const user=jwt.verify(token,JWT_SCERET_KEY)
   
const id=user.user._id
// console.log('id from updateprofile',id)
         const{location}=req.body
         console.log('from frontend',req.body)
        const updateUser=await Users.findByIdAndUpdate(id ,{
      location
        })
        console.log('user location updated Succesfully',updateUser)

        return res.status(201).json({
           
            message:"user update successfully",
          updateUser
        })
    
    } catch (error) {
        console.log('error from updateprofile',error)
        return res.status(500).json({
            error
           })
    }

}




  exports.myProfile = async (req, res) => {
 
    try {

 
      const user = await Users.findById(req.user.id);
  console.log(user)

      res.status(200).json({
        success: true,
        user,
      });
      if(!user){
        return res.status(404).json({
            message:"user doesnot exists"
        })
      }
    } catch (error) {
        console.log(error)
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  exports.findUser=async(req,res)=>{
    try {
      
console.log(req.params.id)
     const user=await Users.findById(req.params.id)
     return res.status(200).json({
        user
     })
    } catch (error) {
        return res.status(404).json({
            message:"isssue from findUser",
            error:error.message
        })  
    }
  }
  exports.getAllUser=async(req,res)=>{

    try {
        const users=await Users.find()
        if(users.length==0){
            return res.status(400).json({
                message:"no user found"
            })
        }
        return res.status(201).json({
            users
        })
    } catch (error) {
        return res.status(404).json({
            message:"isssue from alluser",
            error:error.message
        })  
        
    }
  }