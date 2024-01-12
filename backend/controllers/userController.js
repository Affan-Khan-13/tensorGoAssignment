import passport from "passport";
import UserModel from "../models/userModel.js";

//Login and Register Google
const googleLoginReg = passport.authenticate('google', { scope: ['profile', 'https://www.googleapis.com/auth/userinfo.email']});

//Login and Register Google Callback
const handleGoogleCallback = (req, res) => {
    passport.authenticate('google', { failureRedirect: '/login-failure' })(req, res, (err) => {
        // If authentication failed, redirect to the failure route
        if (err || !req.user) {
            return res.redirect('/login-failure');
        }

        // Authentication successful, redirect to the success route
        res.redirect(process.env.Success_Url_Login + req.user._id);
    });
};

const getUserById = async(req, res) =>{
    try{
        const { id } = req.params;
        const user = await UserModel.findOne({ _id: id});
        if(user){
            return res.status(200).json({ user });

        }
        res.status(400).json({error: "User not found"})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "internal server error"})
    }
}


export {
    googleLoginReg,
    handleGoogleCallback,
    getUserById
}