import express from "express";

// importing    parsing middlewares
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js'
import foodRouter from "./routes/food.routes.js";

const app = express();



// parsing middlewares
app.use(express.json());
app.use(cookieParser());


app.get("/" ,(req,res)=>{
    res.send("hello world");
});


app.use("/api/auth" , authRouter);
app.use("/api/food/" ,foodRouter);




export  {app};