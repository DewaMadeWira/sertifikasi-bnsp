import express, { Request,Response } from "express";
import categoryRouter from "./routes/category";
import letterRouter from "./routes/letter";
import multer from 'multer';
 import cors from 'cors';

const app = express();  
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3001;

app.get('/',(req,res)=>{
    res.send("mama mia ! lezato")
})


app.use("/api/category",categoryRouter)
app.use("/api/letter",letterRouter)


app.listen(PORT,()=>{
    console.log(`running at port ${PORT}`)
})