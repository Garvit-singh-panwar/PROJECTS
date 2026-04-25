import { v2 as cloudinary } from 'cloudinary';
import { Env } from '../utils/Env.js';


export const Cloudnary = ()=>{
    try {


        cloudinary.config({ 
            cloud_name: Env.CLOUDNARY_CLOUD_NAME, 
            api_key: Env.CLOUDNARY_API_KEY, 
            api_secret: Env.CLOUDNARY_API_SECRET
        });
            
        console.log("cloudnary connected");

    } catch (error) {
        console.error(error.message);
    }
}  