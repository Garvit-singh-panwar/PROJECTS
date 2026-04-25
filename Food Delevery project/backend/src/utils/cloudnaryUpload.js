import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { v4 as uuidv4 } from "uuid";



export const uploadVideo = async (video) => {
    try {
        const extension = path.extname(video.originalname);

        const options = {
            folder: "Food_App",
            resource_type: "video",
            public_id: `${uuidv4()}${extension}`
        };

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                options,
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            ).end(video.buffer);
        });

        return uploadResult;

    } catch (error) {
        console.error("Something happened while storing video in cloudinary", error);
        throw error;
    }
};