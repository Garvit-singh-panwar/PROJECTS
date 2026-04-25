import path from 'path';


export const isRightExt = (requiredExt,video)=>{

    const videoExt = path.extname(video.originalname);

    return requiredExt.includes(videoExt);

}