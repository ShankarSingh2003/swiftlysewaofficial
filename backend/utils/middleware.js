 const jwt=require("jsonwebtoken")
const Users=require("../Schema/userSchema")
const ErrorHander =require("../utils/errorhandler")
 console.log(process.env.JWT_SCERET_KEY)
 exports.isAuthenicatedUser = (async (req, res, next) => {
//  console.log('token from middlware',req.cookies.token)
     const  token  = req.cookies.token;
   console.log('token from middleware',token)

     if (!token) {
        return next(new ErrorHander("please login to access this resources", 401));
    //  return res.status(404).json({message:'login first'})
     }
     const decodeData = jwt.verify(token, "harshja3987");
     const userData = decodeData.user;
     if (!userData || !userData._id) {
       return next(new ErrorHander("Invalid token structure", 401));
     }
 
     const user = await Users.findById(userData._id);
     if (!user) {
       return next(new ErrorHander("User not found", 404));
     }
 
     req.user = user; // Attach user to the request
    ;
//jo token hai wo uskai id sai bna hai to decodedData sai uska id nikal rhai hai
     next();
   })
  
   exports.authorizeRoles = (...roles) => {
    return (req,res,next) => {
      console.log('from author',req.user.role)
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHander(
            `Role: ${req.user.role} is not allowed to access this resouce `,
            403
          )
        );
      }
  
      next();
    };
  };