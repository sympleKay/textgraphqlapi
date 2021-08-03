import "@babel/polyfill";
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PORT } from './utils/constant'
import { connectDB } from './utils/db.utils';
import userRoute from './routes/user.route';
import smsRoute from './routes/sms.route';

dotenv.config();

const app = express();

// app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({'extended': true}));
app.use(bodyParser.json());                                    
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('dev', { 
    stream: accessLogStream,
    skip: function (req, res) { return res.statusCode < 400 } 
}));

connectDB();

app.use('/user', userRoute);
app.use('/sms', smsRoute);

app.listen(process.env.PORT, () => {
    console.log(`AUTH SERVICE RUNNING ON PORT ${PORT}`);
})

app.get("/", (req, res) => {
    res.json({ message: "Welcome to sendchamp auth service API" });
});

export default app;