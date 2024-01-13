import CumulativeUsage from "../models/cummulativeUsageModel.js";

const getCummulativeUsage = async (req, res) => {
    try {
        const { userId } = req.params;
        const cummulativeUsage = await CumulativeUsage.findOne({ userId: userId })
        if (!cummulativeUsage) {
            return res.status(400).json({ error: 'User not found' });
        }

        res.status(200).json({ cummulativeUsage });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export {
    getCummulativeUsage
}