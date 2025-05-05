
const Product = require("../Schema/productSchema");


const Order = require("../Schema/OrderSchema");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const Razorpay = require("razorpay");

// Create new Order
// exports.newOrder =async (req, res, next) => {
//     try {
//         const {
//             shippingInfo,
//             orderItems,
//             paymentInfo,
//             itemsPrice,
//             taxPrice,
//             shippingPrice,
//             totalPrice,
//           } = req.body;
        
//           const order = await OrderSchema.create({
//             shippingInfo,
//             orderItems,
//             paymentInfo,
//             itemsPrice,
//             taxPrice,
//             shippingPrice,
//             totalPrice,
//             paidAt: Date.now(),
//             user: req.user._id,
//           });
        
//           res.status(201).json({
//             success: true,
//             order,
//           });
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             message:error
//         })
//     }
 
// };
exports.bookproduct=async(req,res)=>{
  try {
  
    const {id}=req.body
    console.log('id from book service backend',id)
    if(!id){
      return res.status(400).json({
        message: "Select one service",
       
      }); 
     
    }

    const producttobuy=await Product.findById(id).populate()
    console.log('product to buy',producttobuy)
    if(!producttobuy){
      return res.status(401).json({
        message: "no product found",
       
      }); 

    }
    
    const instance =new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
    })
    
   
   


    const options={
      amount:producttobuy.price,
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
      message:"Product Booked Successfully",
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
exports.VerifyPayment = async (req, res) => {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      id,  // product ID
      shippinginfodata  // Shipping details
    } = req.body;

    // Create digest for verification
    const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest("hex");

    // Compare our digest with the provided signature
    if (digest !== razorpaySignature) {
      return res.status(400).json({ msg: "Transaction not legit!" });
    }

    // Payment is legit & verified

    // Fetch the product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(401).json({
        message: "No product found",
      });
    }

    // Get the user from the request (you can replace this logic with the actual method to get the user)
    const user = req.user;

    // Create the order
    const order = new Order({
      shippingInfo: {
        address: shippinginfodata.address,
        city: shippinginfodata.city,
        state: shippinginfodata.state,
        country: shippinginfodata.country,
        pinCode: shippinginfodata.pincode,
        phoneNo: shippinginfodata.number,
      },
      orderItems: [
        {
          name: product.name,
          price: product.price,
          quantity: 1,  // Assuming only 1 quantity for this case, adjust as needed
          images: product.images.url,
        },
      ],
      user: user._id,
      paymentInfo: {
        id: razorpayPaymentId,
        status: "success",
      },
      paidAt: Date.now(),
      taxPrice: 0,  // Adjust based on actual tax calculation
      shippingPrice: 0,  // Adjust based on actual shipping calculation
      totalPrice: product.price,  // Assuming total price is the price of the product
      orderStatus: "Processing",
    });

    // Save the order
    await order.save();

    // Optional: Add notifications or other logic here (e.g., notify user, update user data)
    await User.findByIdAndUpdate(
      user._id,
      { $push: { notifications: "Order placed successfully!" } },
      { new: true }
    );

    // Send response
    res.json({
      msg: "Payment verified and order created successfully!",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user  Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHander("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});


