import CumulativeUsage from "../models/cummulativeUsageModel.js";
import Invoice from "../models/invoiceModel.js";
import UsageDetails from "../models/usageDetailsModel.js";

const calculateTotalAmount = (usageDetails) => {
    const userAmount = 30 * usageDetails.activeUsers;
    const storageAmount = 70 * usageDetails.storageUsage;
    const totalAmount = userAmount + storageAmount;
    return totalAmount;
}

const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);


const generateInvoices = async () => {
    try {
        console.log('Generating');
        const usersToInvoice = await UsageDetails.find({
            timestamp: { $lt: oneMonthAgo },
            invoiceGenerated: false,
        }).populate('userId');

        for (const userDetail of usersToInvoice) {
            const totalAmount = calculateTotalAmount(userDetail);

            const invoice = new Invoice({
                invoiceId: 435331,
                userId: userDetail.userId._id,
                billingCycleStart: userDetail.timestamp,
                billingCycleEnd: oneMonthAgo,
                items: [
                    { description: 'Active Users', quantity: userDetail.activeUsers, unitPrice: 30 },
                    { description: 'Storage Usage', quantity: userDetail.storageUsage, unitPrice: 70 },
                    // Add other relevant items
                ],
                totalAmount,
            });

            await invoice.save();

            //Adding to Cummulative Usage
            // const cumulativeUsage = await CumulativeUsage.findOne({ userId: userDetail.userId._id });
            // cumulativeUsage.activeUsers += userDetail.activeUsers;
            // cumulativeUsage.storageUsage += userDetail.storageUsage;
            // await cumulativeUsage.save();

            userDetail.invoiceGenerated = true;
            await userDetail.save();

            const newUsageDetails = new UsageDetails({
                userId: userDetail.userId._id,
                // Initialize with default or initial values
            });

            await newUsageDetails.save();
        }
    }
    catch (err) {
        console.error(err);
    }
}

const getAllInvoices = async (req, res) => {
    try {
        const { userId } = req.params;
        const allInvoices = await Invoice.find({ userId: userId});
        if(!allInvoices){
            res.status(400).json({ error: "Invoice not found"})
        }

        res.status(200).json({ allInvoices })
    }
    catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
}


const getInvoiceDetails = async (req, res) => {
    try {
        const { invoiceId } = req.params;

        const InvoiceDetails = await Invoice.findOne({ invoiceId: invoiceId });
        if (!InvoiceDetails) {
            return res.status(400).json({ error: "Invoice not found" });
        }
        res.status(200).json({ InvoiceDetails });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export {
    generateInvoices,
    getAllInvoices,
    getInvoiceDetails
}