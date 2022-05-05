import * as mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: {
      values: ["admin", "organizer", "vendor"],
      message: "{VALUE} is not supported",
    },
    default: "vendor",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [10, "Password must be at least 10 characters"],
  },
  extendProfile: {
    businessName: { type: String, default: "" },
    businessNumber: { type: String, default: "" },
    businessAddress: { type: String, default: "" },
    businessDescription: { type: String, default: "" },
  },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
