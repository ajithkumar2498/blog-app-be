import express from "express"
import {createPost, getAllBlogs, getBlogsByAuthorAndCategory, uploadAuth, deletePost, updatePost, getPostById }from "../controllers/postController.js"
import { protectRoute} from "../middlewares/AuthMiddleware.js"



const router = express.Router()

router.get("/upload-auth", uploadAuth)
router.get("/all-blogs", protectRoute, getAllBlogs)
router.get("/", protectRoute, getBlogsByAuthorAndCategory);
router.get("/blog/:id", protectRoute, getPostById)
router.post("/add-blog", protectRoute, createPost)
router.delete("/:id", protectRoute, deletePost)
router.put("/update/:id", protectRoute, updatePost)



export default router