import mongoose from "mongoose";

const gameSchema = mongoose.Schema(
    {
        gameId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        picturePath: {
            type: String,
            required: true,
        },
        modes: {
            type: Array,
            default: []
        }
    },
    {timestamps: true}
);

const Game = mongoose.model("Game", gameSchema);

export default Game;