import mongoose from "mongoose";

const UserNEWSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email:{
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password:{
            type: String,
            required: true,
            min: 5
        },
        picturePath:{
            type: String,
            default: "",
        },
        bio:{
            type: String
        },
        friends:{
            type: Array,
            default: [],
        },
        games:{
            type: Array,
            default: [],
        },
        discordSocial: {
            type: String,
            default: ""
        },
        steamSocial: {
            type: String,
            default: ""
        },
        rating:{
            type: Number,
            max: 5,
            min: 0,
        },
        location: String,
    }, {timestamps: true});

    const UserNEW = mongoose.model("UserNEW", UserNEWSchema);
    export default UserNEW;