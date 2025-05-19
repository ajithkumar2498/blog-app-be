import express from"express"
import UserRoutes from "./user.route.js"
import PostRoutes from "./post.route.js"

const router = express.Router()

router.use("/auth", UserRoutes)
router.use("/blogs", PostRoutes)

export default router