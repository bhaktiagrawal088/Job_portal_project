import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connetDB from "./utilis/db.js";
import userRoute  from "./routes/user.routes.js"
import companyRoute from "./routes/company.routes.js"
import jobRoute from "./routes/job.routes.js"
import applicationRoute from './routes/application.routes.js'
import path from 'path'

dotenv.config({})
const app = express();

const _dirname = path.resolve()

app.get("/home", (req, res) => {
  return res.status(200).json({
    message: "I am coming from backend",
    success: true,
  });
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOption = {
  origin: "https://job-portal-zdkb.onrender.com/",  
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};

app.use(cors(corsOption));
app.options("*", cors(corsOption));

const PORT = process.env.PORT || 3000;

//api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(_dirname, "/client/dist")))
app.get("*" , (_,res) => {
  res.sendFile(path.resolve(_dirname,"client", "dist", "index.html"))
});

app.listen(PORT, () => {
    connetDB();
    console.log(`Server running at port  ${PORT}`);
});

