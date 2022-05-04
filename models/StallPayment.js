import * as mongoose from "mongoose";
import { Schema } from "mongoose";

const StallPaymentSchema = new Schema(
  {
    vendorId: String,
    stallId: String,
    amount: String,
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.StallPayment ||
  mongoose.model("StallPayment", StallPaymentSchema);
