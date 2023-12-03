import mongoose from "mongoose";

const postNEWSchema = mongoose.Schema(
    {
        userId: { // hostid
            type: String,
            required: true,
        },
        username: { //host username
            type: String,
            required: true,
        },
        game: {
            type: String,
            required: true,
        },
        description: {
            type: String, 
            required: true,
        },
        mode: {
            type: String, 
            required: true,
        },
        region: {
            type: String, 
            required: true,
        },
        size: Number,
        userPicturePath: String,
        users: { //users that are in the lobby 
            type: Array,
            default: [],
        }
    },
    {timestamps: true}
);

const PostNEW = mongoose.model("PostNEW", postNEWSchema);

export default PostNEW;