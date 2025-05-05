const Product = require("../Schema/productSchema");
const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");
const OrderSchema = require("../Schema/OrderSchema");
const userSchema = require("../Schema/userSchema");
const productSchema = require("../Schema/productSchema");

// Create Product -- Admin
exports.createProduct = async (req, res, next) => {
  try {
    let images = [];

   if (typeof req.body.images === "string") {
  
    images.push(req.body.images);
   } else {
    images = req.body.images;
 }

  const imagesLinks = [];

   for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
       folder: "ServiceProduct",
     });

  imagesLinks.push({
    public_id: result.public_id,
     url: result.secure_url,
    });
 }
console.log("from backend",imagesLinks)
 req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
  } catch (error) {
    console.log('eror from createproduct',error)
    res.status(500).json({
message:`error from createproduct ${error}`
    })
  }
 
};

// Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();
console.log('query from product',req.query)
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  // Execute the query to get filtered products before pagination
  let products = await apiFeature.query.clone();
  const filteredProductsCount = products.length;

  // Apply pagination and execute the query again
  apiFeature.pagination(resultPerPage);
  products = await apiFeature.query.clone();
console.log(products)
  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  console.log(req.params.id)
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product -- Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body.productId;
console.log("from backend",req.body)
console.log('from backend',req.user)
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message:"Review saved successfully"
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
// exports.bookproduct=async(req,res)=>{
//   try {
  
//     const {id,shippinginfodata}=req.body
//     console.log('id from book service backend',id)
//     if(!id){
//       return res.status(400).json({
//         message: "Select one service",
       
//       }); 
     
//     }

//     const producttobuy=await Product.findById(id).populate()
//     console.log('product to buy',producttobuy)
//     if(!producttobuy){
//       return res.status(401).json({
//         message: "no product found",
       
//       }); 

//     }
    
//     const instance =new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//             key_secret: process.env.RAZORPAY_SECRET,
//     })
    
   
   


//     const options={
//       amount:producttobuy.price,
//       currency:"INR",
//       receipt: 'receipt_' + Math.random().toString(36).substring(7)
//     }
//     console.log({options})
//     const order=await instance.orders.create(options)
//     if(!order) return  res.status(500).json(
//       {
//         message:'some error occured during booking service'
//       }
//     )
//     // if(order){
    
   

//     return res.status(200).json({
//       message:"Product Booked Successfully",
//       order: {
//         id: order.id,
//         amount: order.amount, // Ensure you return the amount here
//       },
//     })
//   } catch (error) {
//     console.log(error)
//     return res.status(500).json({
//       message: "An error occurred while booking services.",
//       error: error.message,
//     });
//   }
// }
 // Adjust path according to your project structure

// exports.VerifyPayment = async (req, res) => {
//   try {
//     const {
//       orderCreationId,
//       razorpayPaymentId,
//       razorpayOrderId,
//       razorpaySignature,
//       id,  // product ID
//       shippinginfodata  // Shipping details
//     } = req.body;

//     // Create digest for verification
//     const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");
//     shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
//     const digest = shasum.digest("hex");

//     // Compare our digest with the provided signature
//     if (digest !== razorpaySignature) {
//       return res.status(400).json({ msg: "Transaction not legit!" });
//     }

//     // Payment is legit & verified

//     // Fetch the product
//     const product = await Product.findById(id);
//     if (!product) {
//       return res.status(401).json({
//         message: "No product found",
//       });
//     }

//     // Get the user from the request (you can replace this logic with the actual method to get the user)
//     const user = req.user;

//     // Create the order
//     const order = new Order({
//       shippingInfo: {
//         address: shippinginfodata.address,
//         city: shippinginfodata.city,
//         state: shippinginfodata.state,
//         country: shippinginfodata.country,
//         pinCode: shippinginfodata.pincode,
//         phoneNo: shippinginfodata.phoneno,
//       },
//       orderItems: [
//         {
//           name: product.name,
//           price: product.price,
//           quantity: 1,  // Assuming only 1 quantity for this case, adjust as needed
//           images: product.images,
//         },
//       ],
//       user: user._id,
//       paymentInfo: {
//         id: razorpayPaymentId,
//         status: "success",
//       },
//       paidAt: Date.now(),
//       taxPrice: 0,  // Adjust based on actual tax calculation
//       shippingPrice: 0,  // Adjust based on actual shipping calculation
//       totalPrice: product.price,  // Assuming total price is the price of the product
//       orderStatus: "Processing",
//     });

//     // Save the order
//     await order.save();

//     // Optional: Add notifications or other logic here (e.g., notify user, update user data)
//     await User.findByIdAndUpdate(
//       user._id,
//       { $push: { notifications: "Order placed successfully!" } },
//       { new: true }
//     );

//     // Send response
//     res.json({
//       msg: "Payment verified and order created successfully!",
//       orderId: razorpayOrderId,
//       paymentId: razorpayPaymentId,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
