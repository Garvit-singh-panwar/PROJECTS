import express from "express";

import { loginFoodPartner, loginUser, logoutFoodPartner, logoutUser, registerFoodPartner, registerUser } from "../controllers/auth.controller.js";


const authRouter = express.Router();

// User routes

authRouter.post("/user/register", registerUser);
authRouter.post('/user/login',loginUser );
authRouter.get("/user/logout",logoutUser);


// Food partner routes
authRouter.post("/foodPartner/register" , registerFoodPartner);
authRouter.post("/foodPartner/login" , loginFoodPartner);
authRouter.get("/foodPartner/logout", logoutFoodPartner);
export default authRouter;