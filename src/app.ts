import express, { Request,Response } from "express";
import { getCategory } from "./database";

const app = express();  

const PORT = 3001;

app.get('/',(req,res)=>{
    res.send("mama mia ! lezato")
})

app.get('/api/category', async(req:Request,res:Response)=>{
const category = await getCategory(1)
res.send(category)
})

app.listen(PORT,()=>{
    console.log(`running at port ${PORT}`)
})