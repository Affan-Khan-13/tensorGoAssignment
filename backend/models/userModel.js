import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    socialId: {
        type: String
    }
});

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;