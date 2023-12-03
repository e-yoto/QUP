import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import UserNEW from "../models/UserNEW.js";

/* REGISTER USER */
export const register = async(req, res) => {
    try {
        const {
            username,
            email,
            password,
            picturePath,
            bio,
            discordSocial,
            steamSocial,
            friends,
            games,
            rating,
            location
        } = req.body;

        

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new UserNEW({
            username,
            email,
            password: passwordHash,
            picturePath,
            bio,
            discordSocial,
            steamSocial,
            friends,
            games,
            rating,
            location
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* LOGGING IN */
export const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await UserNEW.findOne( { email: email});
        if (!user) return res.status(400).json({msg: "User does not exist."});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) res.status(400).json({msg: "Invalid credentials."});

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};