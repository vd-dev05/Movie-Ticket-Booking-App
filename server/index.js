import express from "express";
import  connectDB from './database/MongoDB/connectMongoDB.js'
import dotenv from 'dotenv';
import bodyParser from "body-parser";
// import router from "./routes/author.js";
import RootRouter from "./routes/index.js";
import cors from "cors";
const app = express();

dotenv.config();
const PORT_SERVER = 8080;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173' 
})); 
app.use(bodyParser.json({limit: "50mb"}));



app.get("/", (req, res) => {
  
  res.send("Hello, World!");
});

app.use('/api', RootRouter )
// app.use()
app.listen(PORT_SERVER, () => {
  connectDB()
  console.log(`Server running at http://localhost:${PORT_SERVER}`);
});