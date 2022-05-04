import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

const StallRequestSchema = new Schema(
  {
    eventId: { type: mongoose.Types.ObjectId, ref: 'Event' },
    vendorId: { type: mongoose.Types.ObjectId, ref: 'User' },
    requestStatus: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.StallRequest ||
  mongoose.model('StallRequest', StallRequestSchema);
