import * as mongoose from "mongoose";
import { Schema } from "mongoose";

const ShoppingCartSchema = new Schema(
  {
    vendorId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    shoppingCart: [{ type: Schema.Types.ObjectId, ref: "EventStall" }],
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.ShoppingCart ||
  mongoose.model("ShoppingCart", ShoppingCartSchema);
