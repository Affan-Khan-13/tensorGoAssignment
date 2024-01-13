import express from 'express';
import { getAllInvoices, getInvoiceDetails } from '../controllers/InvoiceController.js';
const router = express.Router();

router.route('/getAll/:userId').get(getAllInvoices);
router.route('/getInvoice/:invoiceId').get(getInvoiceDetails);

export default router;