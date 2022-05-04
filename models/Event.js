import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

const eventStallSchema = new Schema({
  name: String,
  price: String,
  category: String,
});

module.exports =
  mongoose.models.EventStall || mongoose.model('EventStall', eventStallSchema);

const EventSchema = new Schema(
  {
    name: String,
    date: Date,
    attendance: Number,
    description: String,
    images: [String],
    category: [String],
    organizerId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    eventStalls: [eventStallSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.models.Event || mongoose.model('Event', EventSchema);
