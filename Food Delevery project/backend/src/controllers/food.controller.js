import foodModel from "../models/food.model.js";
import { isRightExt } from "../utils/checkExt.js";
import { uploadVideo } from "../utils/cloudnaryUpload.js";


export const createFood = async(req,res)=>{

    try {
        
        const foodPartner = req.foodPartner;
        const {name,description} = req.body;
        const video = req.file;

        if(!name || !description || !video){
            return res.status(400).json(
                {
                    success:false,
                    message: "required all fields"
                }
            );
        }

        const allowedExt = [".mp4", ".webm" , ".mov"];

        isRightExt(allowedExt,video);
        if(!isRightExt){
            return res.status(400).json(
                {
                    success:false,
                    message:"only mp4 webm or mov formats are allowed"
                }
            )
        }
        const response = await uploadVideo(video);
        
        const food = await  foodModel.create(
            {
                name,
                video: response.secure_url,
                description,
                foodPartner: foodPartner._id,

            }
        );

        res.status(201).json(
            {
                success:true,
                foodItem: food,
                message: "added successfully",
            }
        )




    } catch (error) {
        
        console.error(error);
        res.status(500).json(
            {
                success:false,
                error: error.message,
                message: "Internal server error"
            }
        )

    }

};


export const getFoodItems = async(req,res)=>{
    try {
        
        
        const foodItem = await foodModel.find({});
        res.status(200).json(
            {
                success:true,
                foodItems: foodItem,
                message: "successfully fetched food items",

            }
        );

    } catch (error) {
        
        console.error("Error while fetching all the fooditems " , error);
        res.status(500).json(
            {
                success:false,
                error: error.message,
                message:"Internal server error",
            }
        );

    }
}