//dependencies
import mongoose from 'mongoose'
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from './constant';

const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
//create connection
let connectDB = () => {
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false } );

    //see if connection was successful or throw error
    let db = mongoose.connection;
    db.on('error', (err) => {
        console.error(err);
    })
    db.once('open', () => {
        console.log(`Connection to mongoDB successful.... `);
    })
}

//export connection 
export { connectDB };
