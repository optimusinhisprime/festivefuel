import * as mongoose from "mongoose";
import { Schema } from "mongoose";

const SubscriptionSchema = new Schema(
  {
    vendorId: String,
    date: Date,
    amount: String,
    type: String,
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Subscription ||
  mongoose.model("Subscription", SubscriptionSchema);
