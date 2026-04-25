import { app } from "./src/app.js";
import { Cloudnary } from "./src/config/cloudnary.js";
import { connectDB } from "./src/config/connectDB.js";
import { Env } from "./src/utils/Env.js";

const startServer = async()=>{
    try {
        
        await connectDB();

        app.listen(Env.PORT,()=>{
            console.log("server started successfully at port : " , Env.PORT);
        });

        Cloudnary();
    } catch (error) {
        
        console.error("Something went wrong while connecting the server : " ,error);
        process.exit(1);
    }
}

startServer();