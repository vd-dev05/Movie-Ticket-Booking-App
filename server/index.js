import express from "express";
import  connectDB from './database/MongoDB/connectMongoDB.js'
import dotenv from 'dotenv';
import bodyParser from "body-parser";
// import router from "./routes/author.js";
import RootRouter from "./routes/index.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173' 
})); 
app.use(bodyParser.json({limit: "50mb"}));

const POST = process.env.PORT || 8080;

app.get("/", (req, res) => {
  
  res.send("Hello, World!");
});
connectDB()
app.use('/api', RootRouter )
// app.use()
app.listen(POST, () => {
  
  console.log(`Server running at http://localhost:${POST}`);
});