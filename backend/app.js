

const express = require("express")



const cors = require("cors")
const bodyParser=require("body-parser")

const user=require("./routers/user")
 const product=require("./routers/product")
 const order=require("./routers/order")
const cookieParser = require("cookie-parser")
const dotenv=require("dotenv")
dotenv.config()


const app = express()
app.use(cookieParser())
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));


// app.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit as needed
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

 app.use("/api/v1", product);
app.use("/api/v1", user)
app.use("/api/v1",order)
module.exports = app