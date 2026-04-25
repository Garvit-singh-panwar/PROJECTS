import mongoose from "mongoose";
import { Env } from "../utils/Env.js";


export const connectDB = async()=>{
    mongoose.connect(Env.MONGODB_URL)
    .then(
        ()=>{
            console.log("Database connected successfully ");

        }
    )
    .catch(
        (error)=>{
            console.error("Something went wrong in DB connection" ,error.message);
            process.exit(1);
        }
    );
};