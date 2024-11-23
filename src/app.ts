import express, { Request,Response } from "express";
import { createCategory, deleteCategory, getAllCategory, getCategory, updateCategory } from "./database/category";
import { Category } from "./types/category";
import { createLetter, getAllLetter, getLetter } from "./database/letter";
import { Letter } from "./types/letter";
import categoryRouter from "./routes/category";

const app = express();  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3001;

app.get('/',(req,res)=>{
    res.send("mama mia ! lezato")
})


app.use("/api/category",categoryRouter)

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