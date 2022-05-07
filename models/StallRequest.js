import * as mongoose from "mongoose";
import { Schema } from "mongoose";

const StallRequestSchema = new Schema(
  {
    event: { type: Schema.ObjectId, ref: "Event", required: true },
    vendor: { type: Schema.ObjectId, ref: "User", required: true },
    expirationDate: { type: Number, default: 0 },
    stallId: { type: Number, required: true },
    requestStatus: {
      type: String,
      enum: {
        values: ["approved", "rejected", "pending"],
        message: "{VALUE} is not supported",
      },
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.StallRequest ||
  mongoose.model("StallRequest", StallRequestSchema);
