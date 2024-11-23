import express, { Request,Response } from "express";
import { createCategory, getAllCategory, getCategory } from "./database";
import { Category } from "./types/category";

const app = express();  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3001;

app.get('/',(req,res)=>{
    res.send("mama mia ! lezato")
})
app.get('/api/category', async(req:Request,res:Response)=>{
const category = await getAllCategory()
res.send(category)
})

app.post('/api/category', async(req:Request<{},{},Category>,res:Response)=>{
    // res.send(req.body.nama_kategori)
    const category = await createCategory(req.body.nama_kategori)
    res.send(category)
})

app.get('/api/category/:id', async(req:Request<{id:number}>,res:Response)=>{
const category = await getCategory(req.params.id)
res.send(category)
})

app.listen(PORT,()=>{
    console.log(`running at port ${PORT}`)
})