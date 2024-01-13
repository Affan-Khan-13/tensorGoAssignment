import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import UserModel from "../models/userModel.js";
import CumulativeUsage from "../models/cummulativeUsageModel.js"
import UsageDetails from "../models/usageDetailsModel.js"


//google login and registration
try {
    passport.use(
        new GoogleStrategy(
            {
                clientID: "440909725992-mj0e0r3dfgns47tt7qp6n7i6dieqomjo.apps.googleusercontent.com",
                clientSecret: "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",
                callbackURL: "http://localhost:3001/api/v1/users/auth/google/callback",
            },
            async (accessToken, refreshToken, profile, cb) => {
                try {
                    let user = await UserModel.findOne({ socialId: profile.id });
                    if (user) {
                        const id = user._id;
                        const latestUsageDetails = await UsageDetails.findOne({ userId: id }).sort({ timestamp: -1 });
                        latestUsageDetails.activeUsers = latestUsageDetails.activeUsers + 10;
                        latestUsageDetails.storageUsage = latestUsageDetails.storageUsage + 3;
                        await latestUsageDetails.save();

                        const cummulativeUsage = await CumulativeUsage.findOne({ userId: user._id })
                        if (cummulativeUsage) {
                            cummulativeUsage.activeUsers = cummulativeUsage.activeUsers + 10;
                            cummulativeUsage.storageUsage = cummulativeUsage.storageUsage + 3;

                            await cummulativeUsage.save();
                        }
                        else {
                            const newCummulativeUsage = new CumulativeUsage({
                                userId: user._id,
                                activeUsers: 3,
                                storageUsage: 10
                            })

                            newCummulativeUsage.save();
                        }
                    }
                    else {
                        user = new UserModel({
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            socialId: profile.id,
                        });

                        await user.save();

                        const newUsageDetails = new UsageDetails({
                            userId: user._id,
                            storageUsage: 15,
                            activeUsers: 30
                        })

                        await newUsageDetails.save();

                        const cummulativeUsage = await CumulativeUsage.findOne({ userId: user._id })
                        if (cummulativeUsage) {
                            cummulativeUsage.activeUsers = cummulativeUsage.activeUsers + 30;
                            cummulativeUsage.storageUsage = cummulativeUsage.storageUsage + 15;

                            await cummulativeUsage.save();
                        }
                        else {
                            const newCummulativeUsage = new CumulativeUsage({
                                userId: user._id,
                                activeUsers: 30,
                                storageUsage: 15
                            })

                            newCummulativeUsage.save();
                        }
                    }

                    // Call the callback function with a successful result
                    return cb(null, user);
                } catch (error) {
                    console.log(error, "erooooooooooooooooooooooooooooor");
                    // Call the callback function with an error
                    return cb(error);
                }
            }
        )
    );
}
catch (error) {
    console.log(error, "errrrrrrrrrrpppr");
}

passport.serializeUser((user, done) => {
    // console.log(user, "serialize");
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});


export default passport;