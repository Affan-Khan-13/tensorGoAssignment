import express from "express";
import { getCummulativeUsage } from "../controllers/cummulativeUsageController.js";
const router = express.Router();

router.route('/get/:userId').get(getCummulativeUsage);

export default router;