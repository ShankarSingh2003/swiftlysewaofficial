const mongoose = require("mongoose");
const Users = require('./userSchema'); // Import the User model

const serviceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type:String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
   ref:"Users",
  //  name: String, // Add any user fields you want to embed
  //     email: String,
  //   required: true,
  },
  location: {
    type: {
      type: String, // "Point"
      enum: ["Point"], // Must be "Point"
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Service", serviceSchema); // Exporting as "Service"
