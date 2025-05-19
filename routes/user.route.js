import express from "express"
import {login, registerUser} from "../controllers/userController.js"

const router = express.Router()

router.post("/signup", registerUser)
router.post("/login", login)


export default router