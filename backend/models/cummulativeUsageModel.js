import mongoose from "mongoose";
const cumulativeUsageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  activeUsers: { type: Number, default: 0 },
  storageUsage: { type: Number, default: 0 },
  // Add other relevant cumulative usage metrics
});

const CumulativeUsage = mongoose.model('CumulativeUsage', cumulativeUsageSchema);

export default CumulativeUsage;