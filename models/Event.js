import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

const EventSchema = new Schema(
  {
    eventName: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    expectedAttendance: { type: Number, required: true },
    description: { type: String, required: true },
    images: { type: [String], default: undefined, required: true },
    eventCategory: { type: [String], default: undefined, required: true },
    organizerId: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    eventStalls: {
      type: [
        {
          stallId: { type: String, required: true, unique: true },
          category: { type: String, required: true },
          available: { type: Number, required: true },
          price: { type: Number, required: true },
        },
      ],
      default: undefined,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Event || mongoose.model('Event', EventSchema);
