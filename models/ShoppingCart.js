import * as mongoose from "mongoose";
import { Schema } from "mongoose";

const ShoppingCartSchema = new Schema({
  vendorId: String,
  shoppingCart: [String],
});

module.exports =
  mongoose.models.ShoppingCart ||
  mongoose.model("ShoppingCart", ShoppingCartSchema);
