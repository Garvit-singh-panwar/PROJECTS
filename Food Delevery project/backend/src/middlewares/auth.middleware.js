import User from "../models/user.model.js";
import FoodPartnerModel from "../models/food-partner.model.js";
import jwt from "jsonwebtoken";
import { Env } from "../utils/Env.js";

export const authFoodPartnerMiddleware = async (req, res, next)=>{

    // taking token from req ki cookie 
    const token = req.cookies.token;

    // if not present send res 
    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        })
    }


    try {

        console.log(token);
        // dwcode cookie check is the foodpartner exist 
        const decoded = jwt.verify(token, Env.JWT_SECRET);

        console.log("tonken decoded");

        const foodPartner = await FoodPartnerModel.findById(decoded.id);
        
        console.log("find food partner");
        req.foodPartner = foodPartner;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token"
        })

    }

}

export const authUserMiddleware = async (req, res, next)=>{

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, Env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        req.user = user;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token"
        })

    }

}

