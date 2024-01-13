import CumulativeUsage from "../models/cummulativeUsageModel.js";
import UsageDetails from "../models/usageDetailsModel.js";

const addUsageDetails = async(req, res) =>{
    try{
        const { activeUsers, storageUsage } = req.body;
        const { userId } = req.params;
        const newUsageDetails = new UsageDetails({
            userId: userId,
            storageUsage: storageUsage,
            activeUsers: activeUsers
        })

        await newUsageDetails.save();

        const cummulativeUsage = await CumulativeUsage.findOne({ userId: userId})
        if(cummulativeUsage){
            cummulativeUsage.activeUsers = cummulativeUsage.activeUsers + activeUsers;
            cummulativeUsage.storageUsage = cummulativeUsage.storageUsage + storageUsage;

            await cummulativeUsage.save();
        }
        else{
            const newCummulativeUsage = new CumulativeUsage({
                userId: userId,
                activeUsers: activeUsers,
                storageUsage: storageUsage
            })

            newCummulativeUsage.save();
        }

        res.status(200).json({ usageDetails: newUsageDetails})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
}


const updateUsageDetails = async(req, res) =>{
    try{
        const { activeUsers, storageUsage } = req.body;
        const { userId } = req.params;
        const latestUsageDetails = await UsageDetails.findOne({ userId }).sort({ timestamp: -1 });
        if(!latestUsageDetails){
            return res.status(400).json({ error: "No usageDetails found" });
        }

        latestUsageDetails.activeUsers = latestUsageDetails.activeUsers + activeUsers;
        latestUsageDetails.storageUsage = latestUsageDetails.storageUsage + storageUsage;

        await latestUsageDetails.save();

        const cummulativeUsage = await CumulativeUsage.findOne({ userId: latestUsageDetails.userId });
        if(cummulativeUsage){
            cummulativeUsage.activeUsers = cummulativeUsage.activeUsers + activeUsers;
            cummulativeUsage.storageUsage = cummulativeUsage.storageUsage + storageUsage;

            await cummulativeUsage.save();
        }

        res.status(200).json({ UsageDetails: latestUsageDetails})

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
}


const getLatestUsageDetails = async (req, res) =>{
    try{
        const { userId } = req.params;
        const latestUsageDetails = await UsageDetails.findOne({ userId }).sort({ timestamp: -1 });
        if(!latestUsageDetails){
            return res.status(400).json({ error: "No usageDetails found" });
        }

        res.status(200).json({ latestUsageDetails })
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
}

const getAllUsageDetails = async(req, res) =>{
    try{
        const { userId } = req.params;
        const AllUsageDetails = await UsageDetails.find({ userId: userId });
        if(!AllUsageDetails){
            return res.status(400).json({ error: "No usageDetails found" });
        }

        res.status(200).json({ AllUsageDetails });
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export {
    addUsageDetails,
    updateUsageDetails,
    getLatestUsageDetails, 
    getAllUsageDetails
}