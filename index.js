import express from "express";
import dotenv from "dotenv"
import connectDB from "./Lib/connectDB.js";
import AppRoutes from "./routes/index.js"
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config()

const app = express();

app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use("/api", AppRoutes);

app.get("/test", (req, res) => {
  res.status(200).send({
    message: `server running in ${process.env.PORT}`,
  });
});
 
app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`server is running in the port ${process.env.PORT}`);
});
