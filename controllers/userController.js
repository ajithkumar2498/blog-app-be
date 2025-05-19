import User from "../models/userModel.js"
import { hashCompare, hashPassword, createJWT, setTokenCookie } from "../utils/index.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
 
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    } else {
     const hashedPassword = await hashPassword(password)
     const user = await User.create({
      name,
      email,
      password: hashedPassword
    });
    res.status(201).send({
             user,
             message:"User Signed up Successful"
            })
    }

  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, message: error.message });
  }
};

export const login = async(req,res)=>{
    try {
        let user = await User.findOne({email:req.body.email})

        if(user)
        {
            if(await hashCompare(req.body.password, user.password))
            {
                let token = createJWT(user._id, user.email)
                res.status(200).send({
                    message:"Login Successful",
                    name:user.name,
                    id:user._id,
                    token,
                    email:user.email
                })
            }
            else
            {
                res.status(400).send({
                    message:"Incorrect Password"
                })
            }
        }
        else
        {
            res.status(400).send({
                message:`User with ${req.body.email} does not exists`
            })
        }
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}