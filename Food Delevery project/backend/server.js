import { app } from "./src/app";
import { connectDB } from "./src/config/connectDB";
import { Env } from "./src/utils/Env";

const startServer = async()=>{
    try {
        
        await connectDB();

        app.listen(Env.PORT,()=>{
            console.log("server started successfully at port : " , Env.PORT);
        });

    } catch (error) {
        
        console.error("Something went wrong while connecting the server : " ,error);
        process.exit(1);
    }
}

startServer();