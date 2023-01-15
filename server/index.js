import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import {fileURLToPath} from 'url';


/* CONFIGURATIONS */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: './config/.env' });;
const app = express();
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin' }));
app.use(morgan( 'common'));
app.use(bodyParser.json({limit: '30mb', extended:true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended:true}));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets' )));


/* FILE STORAGE */

const storage = multer.diskStorage({
    // Destination of uploaded files
    destination: function(req, file, cb){
       cb(null, 'public/assets' );
    },
    filename: function(req, file, cb){
        cb(null, file.originalname );
     },
});

const upload = multer({storage})

/* MONGOOSE SETUP */

const CONNECTION_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));
