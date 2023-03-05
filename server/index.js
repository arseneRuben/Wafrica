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

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

import { verifyToken } from "./middleware/auth.js";

import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";

import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";
import cookieSession from 'cookie-session';
import passport from 'passport';


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
app.use(cors({
    origin: "http://localhost:3000",
    methodes: "GET, POST, PUT, DELETE",
    credentials: true,
}
));
app.use('/assets', express.static(path.join(__dirname, 'public/assets' )));


/* COOKIE SESSION */
app.use (cookieSession({ name : "session", keys: ["ruben"], maxAge : 24*60*60*100 }));
app.use(passport.initialize());
app.use(passport.session());
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

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */

const CONNECTION_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`))
      /* ADD DATA ONE TIME */
    //User.insertMany(users);
    //Post.insertMany(posts);
})

    .catch((error) => console.log(`${error} did not connect`));

    //mongoose.set('useFindAndModify', false);