const { findUser } = require("../utils/finduser");
const Users=require('../Schema/userSchema')
const Service=require("../Schema/serviceSchema")
const cloudinary = require("cloudinary");
const Notification = require("../Schema/Notification");
const Razorpay=require("razorpay")
const RAZORPAY_KEY_ID = process.env.RAZORPAY_ID
const RAZORPAY_KEY = process.env.RAZORPAY_KEY
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET
exports.createServices = async (req, res) => {
    try {
      
      const { id,user } = findUser(req);

     
      const { servicename, description, price, location } = req.body;
     

  

  
    
      const result = await cloudinary.v2.uploader.upload(req.body.image, {
         folder: "ServiceProdcut",
       });
  
   
  
console.log('images url',result.public_id)
   console.log('location from frontend to backend',location.lat,location.lng)
      if (!servicename || !description || !price || !location) {
        return res.status(400).json({
          message: "Insufficient credentials",
        });
      }
  

      if (!location.lat || !location.lng) {
        return res.status(400).json({
          message: "Invalid location data. Please provide valid coordinates.",
        });
      }
      const longitude=location.lng
      const latitude=location.lat
  
      const service = await Service.create({
        serviceName: servicename,
        description,
        price,
 
  user:id,
        location: {
          type: "Point",
          coordinates: [longitude, latitude], 
        },
        images :{
          public_id:result.public_id,
          url:result.secure_url
        }
      });
  
      console.log("Service created:", service._id);
      await service.save();
  
      await Users.findByIdAndUpdate(
        id,
        { $push: { services: service._id } },
        { new: true }
      );
  
      return res.status(200).json({
        message: "Service created successfully",
        service,
      });
    } catch (error) {
      console.error("This error comes from createServices:", error);
      return res.status(500).json({
        error,
      });
    }
  };
  
exports.updateServices=async(req,res)=>{
    try {

// console.log('id from finduser function ',id)

       const {servicename,description,price,id,location} =req.body
      if(!servicename||!description||!price||!id){
       return res.status(400).json({
       message:"insufficient credentials"
         })
        }
       
console.log('this is from updateservices',location)
        if (!location.coordinates || location.coordinates.length !== 2) {
          return res.status(400).json({
            message: "Invalid location data. Please provide valid coordinates.",
          });
        }
const updatedservice=await Service.findByIdAndUpdate(id,{
    serviceName:servicename,
    price,
    description,
    location: {
      type: "Point",
      coordinates: [location.coordinates[0], location.coordinates[1]], // Accessing coordinates correctly
    },
})
return res.status(200).json({
    message:"services updated successfully",
  updatedservice
    
})
    } catch (error) {
        console.log('this error  comes from updated services ',error)
        return res.status(500).json({
           
          error
        })
    }
}
exports.getAllUserServices=async(req,res)=>{
    try {
        const {id}=findUser(req)
        const services=await Service.find({user:id}).populate("user")
        console.log(services)
        return res.status(200).json({
           
           message:"services extracted",
           services
          })
    } catch (error) {
        console.log('error from getUserservices',error)
        return res.status(500).json({
           
            error
          })
    }

}
exports.getUserServices=async(req,res)=>{
    
    try {
        const _id=req.body
        if(!_id){
            return
        }
        const {id}=findUser(req)
        console.log(id)
        const services=await Service.find({$or:[
            {id},
            {_id}
        ]
            
        })
        console.log(services)
        return res.status(200).json({
           
           message:"services extracted",
           services
          })
    } catch (error) {
        console.log('error from getUserservices',error)
        return res.status(500).json({
           
            error
          })
    }

}
exports.getparticularserviceforcustomer=async(req,res)=>{
    try {
        const {serviceName}=req.body
        if(!serviceName)return res.status(404).json({
          message:"no credentials"
        })
        const service = await Service.find({
          $or: [
            { serviceName: { $regex: serviceName.trim().replace(/\s+/g, ".*"), $options: "i" } },
            { description: { $regex: serviceName, $options: "i" } },
          ],
        });
        return res.status(200).json({
           
            message:"services extracted",
            service
           }) 
    } catch (error) {
        console.log('error from getparticularserviceforuser',error)
        return res.status(500).json({
           
            error
          })
    }
}


exports.getAllServicesByLocation = async (req, res) => {
  const { location, range } = req.body;

  if (!location || !range) {
    return res.status(400).json({
      message: "Please provide location and range.",
    });
  }

  const { longitude, latitude } = location;

  if (typeof longitude !== "number" || typeof latitude !== "number" || typeof range !== "number") {
    return res.status(400).json({
      message: "Invalid location or range format.",
    });
  }

  try {
    // Find services within the range (converted to radians)
    const services = await Service.find({
      location: {
        $geoWithin: {
          $centerSphere: [[longitude, latitude], range / 6378.1], // Range in radians (Earth radius is ~6378.1 km)
        },
      },
    }); // Populate user details

    return res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while fetching services.",
      error: error.message,
    });
  }
};
exports.getParticularserviceaccordingtolocation=async(req,res)=>{
  try {
    const { location, range ,servicename} = req.body;
    console.log('from findparticularlocationservice',location)
 const latitude=location.lat
 const longitude=location.lng

      if (!location || !range) {
        return res.status(400).json({
          message: "Please provide location and range.",
        });
      }
    
    
      const services = await Service.find({
       
          serviceName:{ $regex: new RegExp(servicename, "i") },
          location: {
            $geoWithin: {
              // $centerSphere: [[longitude, latitude], range / 6378.1], // Range in radians (Earth radius is ~6378.1 km)
              $centerSphere: [[longitude,latitude],range/6378.1]
            },
          }
       
      
      }).populate("user","name email"); 
      console.log('service from searchservicefromlocation',services)
      return res.status(200).json({
        success: true,
        services,
      });

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
  
      message: "An error occurred while fetching services.",
      error: error.message,
    });
  }
}
// exports.FilterServicesbyName=async(req,res)=>{
//   try {
    
//   } catch (error) {
    
//   }
// }
exports.getAllServices=async(req,res)=>{
  try {
    const allservices=await Service.find()
    if(!allservices){
      return res.status(404).json({
        message:"No service is found"
      })
    }
    return res.status(200).json({
      allservices
    })
  } catch (error) {
    return res.status(200).json({
      error:error.message
    })
  }
}
exports.bookservices=async(req,res)=>{
  try {
  
    const {id}=req.body
    console.log('id from book service backend',id)
    if(!id){
      return res.status(400).json({
        message: "Select one service",
       
      }); 
     
    }

    const serviegettobook=await Service.findById(id).populate("user","email name phone")
    if(!serviegettobook){
      return res.status(401).json({
        message: "no service found",
       
      }); 

    }
    
    const instance =new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
    })
    //pending development according to the taxes
    const totalprice = Math.round(serviegettobook.price * 100 + serviegettobook.price * 2);

   


    const options={
      amount:totalprice,
      currency:"INR",
      receipt: 'receipt_' + Math.random().toString(36).substring(7)
    }
    console.log({options})
    const order=await instance.orders.create(options)
    if(!order) return  res.status(500).json(
      {
        message:'some error occured during booking service'
      }
    )
    // if(order){
    
   

    return res.status(200).json({
      message:"Service Booked Successfully",
      order: {
        id: order.id,
        amount: order.amount, // Ensure you return the amount here
      },
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "An error occurred while booking services.",
      error: error.message,
    });
  }
}
exports.VeirfyPayment=async(req,res)=>{
  try {
    // getting the details back from our font-end
    const user=findUser(req)
   
    const {
        orderCreationId,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
        id
    } = req.body;

    // Creating our own digest
    // The format should be like this:
    // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
    const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");

    // comaparing our digest with the actual signature
    if (digest !== razorpaySignature)
        return res.status(400).json({ msg: "Transaction not legit!" });

    // THE PAYMENT IS LEGIT & VERIFIED
    // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT
    const serviegettobook=await Service.findById(id).populate("user","email name phone")
    if(!serviegettobook){
      return res.status(401).json({
        message: "no service found",
       
      }); 

    }
    const notifications=await Notification.create({
      notificatonName:`${user.user.name}booked your service`,
        user:user.id
       })
    await notifications.save()
       await Users.findByIdAndUpdate(
      serviegettobook.user._id,
         { $push: { notifications: notifications._id } },
       { new: true }
      );
      
 
    res.json({
        msg: "success",
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
    });
}  catch (err) {
    res.status(500).json({ error: err.message });
}
}
exports.getLoggedinUserServices=async(req,res)=>{
  try {
    const {id}=findUser(req)
    const loggedinuserservice=await Service.find({user:id})
    console.log('loggedinuser service',loggedinuserservice)
if(!loggedinuserservice){
  return res.status(404).json({
    message:'no services found'
  })

}
return res.status(200).json({
  loggedinuserservice
})

  } catch (error) {
    return res.status(404).json({
      message:'error from loggedinuserservices',
      error:error.message
    })
  
  }
}