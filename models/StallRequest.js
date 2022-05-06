import * as mongoose from "mongoose";
import { Schema } from "mongoose";

const StallRequestSchema = new Schema(
  {
    eventId: { type: Schema.ObjectId, ref: "Event" },
    vendorId: { type: Schema.ObjectId, ref: "User" },
    expirationDate: { type: Number, default: 0 },
    stallId: { type: Number, required: true },
    requestStatus: {
      type: String,
      enum: {
        values: ["approved", "rejected", "pending"],
        message: "{VALUE} is not supported",
      },
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.StallRequest ||
  mongoose.model("StallRequest", StallRequestSchema);
