import express from "express";
import { getFeedPosts, getUserPosts, likePost, getPost} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:id", verifyToken, getPost);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

export default router;