import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

const StallPaymentSchema = new Schema(
  {
    vendorId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    stallId: String, // not sure which this should be
    amount: String,
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.StallPayment ||
  mongoose.model('StallPayment', StallPaymentSchema);
