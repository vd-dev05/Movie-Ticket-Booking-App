import express from "express";
import  connectDB from './database/MongoDB/connectMongoDB.js'
import dotenv from 'dotenv';
import bodyParser from "body-parser";
// import router from "./routes/author.js";
import RootRouter from "./routes/index.js";
import cors from "cors";
const app = express();
app.use(cors ());

dotenv.config();
const PORT_SERVER = 8080;
const URL_KEY = "192.168.1.224"
app.use(express.json());
app.use(bodyParser.json({limit: "50mb"}));



app.get("/", (req, res) => {
  
  res.send("Hello, World!");
});

app.use('/api', RootRouter )
// app.use()

app.listen(PORT_SERVER,URL_KEY,() => {
  connectDB()
  console.log(`Server running at http://${URL_KEY}:${PORT_SERVER}`);
});