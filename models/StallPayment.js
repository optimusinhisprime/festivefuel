import * as mongoose from "mongoose";
import { Schema } from "mongoose";

const StallPaymentSchema = new Schema({
  vendorId: String,
  stallId: String,
  amount: String,
});

module.exports =
  mongoose.models.StallPayment ||
  mongoose.model("StallPayment", StallPaymentSchema);
