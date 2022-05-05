import * as mongoose from "mongoose";
import { Schema } from "mongoose";

const eventStallSchema = new Schema({
  name: String,
  price: String,
  category: String,
});

module.exports =
  mongoose.models.EventStall || mongoose.model("EventStall", eventStallSchema);

const EventSchema = new Schema(
  {
    name: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    expectedAttendance: { type: Number, required: true },
    description: { type: String, required: true },
    images: { type: [String], default: undefined, required: true },
    eventCategory: { type: [String], default: undefined, required: true },
    organizerId: { type: String, required: true },
    eventStalls: { type: [eventStallSchema], default: undefined },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Event || mongoose.model("Event", EventSchema);
