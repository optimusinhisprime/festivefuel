import * as mongoose from "mongoose";
import { Schema } from "mongoose";

const StallRequestSchema = new Schema(
  {
    eventId: { type: String },
    vendorId: { type: String },
    requestStatus: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.StallRequest ||
  mongoose.model("StallRequest", StallRequestSchema);
