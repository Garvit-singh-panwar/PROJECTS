import express from "express";
import { authFoodPartnerMiddleware, authUserMiddleware } from "../middlewares/auth.middleware.js";
import { createFood, getFoodItems } from "../controllers/food.controller.js";
import multer from 'multer';


const foodRouter = express.Router();
const upload  = multer(
    {
        storage: multer.memoryStorage(),
        
    }
)



// protected routes
foodRouter.post('/' , 
    authFoodPartnerMiddleware,
    upload.single("video"),
    createFood
);
foodRouter.get("/",
authUserMiddleware,
getFoodItems

)




export default foodRouter;