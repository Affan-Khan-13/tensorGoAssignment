import mongoose from "mongoose";
const invoiceSchema = new mongoose.Schema({
    invoiceId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  billingCycleStart: { type: Date, required: true },
  billingCycleEnd: { type: Date, required: true },
  items: [
    {
      description: { type: String, required: true },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;