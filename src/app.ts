import express, { Request,Response } from "express";
import { createCategory, deleteCategory, getAllCategory, getCategory, updateCategory } from "./database/category";
import { Category } from "./types/category";
import { createLetter, getAllLetter, getLetter } from "./database/letter";
import { Letter } from "./types/letter";

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
    const category = await createCategory(req.body.nama_kategori)
    res.send(category)
})
app.put('/api/category', async(req:Request<{},{},Category>,res:Response)=>{
    const category = await updateCategory(req.body.nama_kategori,req.body.id)
    res.send(category)
})
app.delete('/api/category', async(req:Request<{},{},Category>,res:Response)=>{
    const category = await deleteCategory(req.body.id)
    res.send(category)
})

app.get('/api/category/:id', async(req:Request<{id:number}>,res:Response)=>{
const category = await getCategory(req.params.id)
res.send(category)
})

app.post('/api/letter', async(req:Request<{},{},Letter>,res:Response)=>{
    const category = await createLetter(req.body.nomor_surat,req.body.id_kategori ,req.body.judul)
    res.send(category)
})

app.get('/api/letter', async(req:Request<{},{},Letter>,res:Response)=>{
    const category = await getAllLetter()
    res.send(category)
})
app.get('/api/letter/:id', async(req:Request<{id:number}>,res:Response)=>{
    const category = await getLetter(req.params.id)
    res.send(category)
})

app.listen(PORT,()=>{
    console.log(`running at port ${PORT}`)
})