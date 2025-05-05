const JWT_SCERET_KEY=process.env.JWT_SCERET_KEY
console.log(JWT_SCERET_KEY)
const jwt=require("jsonwebtoken")
exports.findUser=(req,res)=>{
  try {
    console.log('token from finduser',req)
    const token=req.cookies?.token
    const user= jwt.verify(token,JWT_SCERET_KEY)
 
const id=user.user._id


return {id,user}
  } catch (error) {
    console.log('error from finduser',error)
    // return res.status(500).json({
    //   error
    // })
  }
     
}