const { default: mongoose } = require("mongoose");

const Service=require('./serviceSchema')
  const userSchema=new mongoose.Schema({
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    phone:{
      unique:true,
      type:String
 
     },
    password: {
      type: String,
    },
    // cartData: {
    //   type: Object,
    // },
  role:{
type:String,
default:'user'
  },
    location: {
  
      longitude: {
        type: Number,
        required: false, // Set to `true` if you want to enforce it
        default: 0.0,
      },
      latitude: {
        type: Number,
        required: false, // Set to `true` if you want to enforce it
        default: 0.0,
      },
    }
    ,
    services: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Service model
        ref: "Service",
      },
    ],
    notifications:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Notifications",
       
      }
    ]

   ,  createdAt: {
    type: Date,
    default: Date.now,
  },
  
  })
  module.exports=mongoose.model("Users",userSchema)