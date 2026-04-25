import 'dotenv/config';

export const Env = {
    PORT:process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    CLOUDNARY_API_KEY : process.env.CLOUDNARY_API_KEY,
    CLOUDNARY_API_SECRET:process.env.CLOUDNARY_API_SECRET,
    CLOUDNARY_CLOUD_NAME:process.env.CLOUDNARY_CLOUD_NAME,
};

