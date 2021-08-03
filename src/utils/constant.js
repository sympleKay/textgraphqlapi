import dotenv from 'dotenv';

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    SMS_API_KEY: process.env.SMS_API_KEY,
    SMS_HOST: process.env.SMS_HOST
}