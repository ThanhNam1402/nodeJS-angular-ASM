import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/connectDB"
import cors from "cors";
import cookieParser from "cookie-parser"
import path from "path"
import 'dotenv/config'
import { corsOptions } from "./config/cors";
import { routerSystem } from "./router/index";

const app = express();


// xu ly cors 
app.use(cors(corsOptions));
app.use(cookieParser())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routerSystem);

connectDB();

// app.use(express.static('./src/upload_files'))

app.use(express.static(path.join(__dirname, 'upload_files')));

app.use("/upload_files", express.static('upload_files'))



let port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log("backend " + port);
});