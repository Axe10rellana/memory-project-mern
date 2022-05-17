//router
import { Router } from "express";

//controllers
import {
  getPosts,
  getPost,
  getPostsBySearch,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
  getPostsByCreator,
} from "../controllers/posts.controllers.js";

//middlewares
import auth from "../middlewares/auth.middlewares.js";

//variables
const router = Router();

//rutas
router.get("/creator", getPostsByCreator);
router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/:id", getPost);

router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", commentPost);

//exports
export default router;
