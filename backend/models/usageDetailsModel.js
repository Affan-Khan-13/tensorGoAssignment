import mongoose from "mongoose";
const usageDetailsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  activeUsers: { type: Number, default: 0 },
  storageUsage: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
  invoiceGenerated: { type: Boolean, default: false }
});

const UsageDetails = mongoose.model('UsageDetails', usageDetailsSchema);

export default UsageDetails;