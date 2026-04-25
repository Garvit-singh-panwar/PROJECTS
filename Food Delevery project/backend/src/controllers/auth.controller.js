import User from '../models/user.model.js';
import FoodPartnerModel from '../models/food-partner.model.js';
import jwt from "jsonwebtoken";
import { Env } from '../utils/Env.js';

export const registerUser = async(req,res)=>{
        try {
            
            // taking from req ki body
            const {fullName , email , password} = req.body;

            // Check present or not
            if(!fullName || !email || !password){
                return res.status(400).json(
                    {
                        success:false,
                        message: "required all the given fields while register",
                    }
                )
            }


            // Check User exist
            const isUserExist = await User.findOne({email:email});

            if(isUserExist){
                return res.status(400).json(
                    {
                        success:false,
                        message: "user already exist for this email id ",
                    }
                );
            }

            
            // create user 
            const user = await User.create({
                fullName,
                email,
                password
            });
            

            // create token  
            const token = jwt.sign({
                id: user._id,
            }, Env.JWT_SECRET)


            // put token in cookie
            res.cookie("token", token)

            
            // success status send
            res.status(201).json({
                success:true,
                message: "User registered successfully",
                user: {
                    _id: user._id,
                    email: user.email,
                    fullName: user.fullName
                }
            })


        } catch (error) {

// Handling error if it fails somehow 

            console.log("Something went wrong while registering user : ",error);
            console.error(error.message);
            res.status(500).json(
                {
                    success:false,
                    error: error.message,
                    message: "Internal server error"
                }
            )
            
        }
}


export const loginUser = async (req, res)=>{
    try {
        
        // taking fileds from req ki body
        const { email, password } = req.body;


        // finding is the user real 
        const user = await User.findOne({
            email
        })

        
        if (!user) {
            return res.status(400).json({
                success:false,
                message: "Invalid email or password"
            })
        }


        // matching is the password correct for that user
        const isMatch = user.verifyPassword(password);

        if(!isMatch){
            return res.status(400).json(
                {
                    success:false,
                    message:"Invalid email or password"
                }
            )
        }

        // creating token 

        const token = jwt.sign({
            id: user._id,
        }, Env.JWT_SECRET)

        // put token in cookie

        res.cookie("token", token)

        // sending success status 
        
        res.status(200).json({
            success:true,
            message: "User logged in successfully",
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName
            }
        })

        // Handling errors if if it fails somehow 
    } catch (error) {
        console.log("Something went wrong while registering user : ",error);
        console.error(error.message);
        res.status(500).json(
            {
                success:false,
                error: error.message,
                message: "Internal server error"
            }
        );
        
    }

}

export const logoutUser = async(req, res)=>{
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully"
    });
}





export const registerFoodPartner = async (req,res)=>{
    try {
        
        const { name, email, password, phone, address, contactName } = req.body;

        // Check all fields 

        if( !name|| !email|| !password|| !phone|| !address|| !contactName ){
            return res.status(400).json(
                {
                    success:false,
                    message : "required all fields for FP registration  "
                }
            )
        }


        // check FoodPartner Exist
        const isAccountAlreadyExists = await FoodPartnerModel.findOne({
            email
        })


        if (isAccountAlreadyExists) {
            return res.status(400).json({
                success:false,
                message: "Food partner account already exists"
            })
        }

        // Creating foodPartner
        const foodPartner = await FoodPartnerModel.create({
            name,
            email,
            password,
            phone,
            address,
            contactName
        });


        // Creating Token
        const token = jwt.sign({
            id: foodPartner._id,
        }, Env.JWT_SECRET)

        // puting token in coookie
        res.cookie("token", token)

        // Sending success status
        res.status(201).json({
            success:true,
            message: "Food partner registered successfully",
            foodPartner: {
                _id: foodPartner._id,
                email: foodPartner.email,
                name: foodPartner.name,
                address: foodPartner.address,
                contactName: foodPartner.contactName,
                phone: foodPartner.phone
            }
        });

// Handling errors 
    } catch (error) {

            console.log("Something went wrong while registering FoodPartner : ",error);
            console.error(error.message);
            res.status(500).json(
                {
                    success:false,
                    error: error.message,
                    message: "Internal server error"
                }
            )
        
    }
}


export const loginFoodPartner  = async (req, res)=> {

    try {
        //  takes fields from req ki body
        const { email, password } = req.body;

        // if not present send bad req in res
        if(!email || !password){
            return res.status(400).json(
                {
                    success:false,
                    message: "required all the credentials"
                }
            );
        }


        // checking User exist or not 
        const foodPartner = await FoodPartnerModel.findOne({
            email
        })

        if (!foodPartner) {
            return res.status(400).json({
                success:false,
                message: "Invalid email or password"
            })
        }


        // checking is the password Valid or not
        const isPasswordValid = foodPartner.verifyPassword(password);

        if (!isPasswordValid) {
            return res.status(400).json({
                success:false,
                message: "Invalid email or password"
            })
        }


        // Creating token 
        const token = jwt.sign({
            id: foodPartner._id,
        }, Env.JWT_SECRET)

        // Puting token in cookie
        res.cookie("token", token)

        // Sending success status
        res.status(200).json({
            succes:true,
            message: "Food partner logged in successfully",
            foodPartner: {
                _id: foodPartner._id,
                email: foodPartner.email,
                name: foodPartner.name
            }
        })

        // Error Handling
    } catch (error) {

            console.log("Something went wrong while login FoodPartner : ",error);
            console.error(error.message);
            res.status(500).json(
                {
                    success:false,
                    error: error.message,
                    message: "Internal server error"
                }
            )
        
        
    }
}   

// logout foodPartner 
export const logoutFoodPartner =  async (req, res)=> {
    res.clearCookie("token");
    res.status(200).json({
        message: "Food partner logged out successfully"
    });
}