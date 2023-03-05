import express from "express";
import { getFeedPosts, getUserPosts, likePost , createPost} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

// All the routes that have to do with posts
const router = express.Router();

/* READ */

router.get("/", getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
/* CREATE */
router.post("/", createPost);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

export default router;