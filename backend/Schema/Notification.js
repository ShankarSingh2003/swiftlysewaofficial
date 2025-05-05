const mongoose = require("mongoose");
const Users = require('./userSchema'); // Import the User model

const NotificationSchema = new mongoose.Schema({
  notificatonName: {
    type: String,
    required: true,
  },
  
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
   ref:"Users",
  //  name: String, // Add any user fields you want to embed
  //     email: String,
  //   required: true,
  },

  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notification",  NotificationSchema); // Exporting as "Service"
