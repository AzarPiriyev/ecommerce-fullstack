import mongoose from "mongoose";

const UserShema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        default: "User"
    }
})

export const User = mongoose.model("User", UserShema);