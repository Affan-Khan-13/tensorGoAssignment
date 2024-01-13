import express  from "express";
import { addUsageDetails, getAllUsageDetails, getLatestUsageDetails, updateUsageDetails } from "../controllers/usageDetailsController.js";
const router = express.Router();

router.route('/add/:userId').post(addUsageDetails);
router.route('/update/:userId').post(updateUsageDetails);
router.route('/getLatest/:userId').get(getLatestUsageDetails);
router.route('/getAll/:userId').get(getAllUsageDetails);

export default router;