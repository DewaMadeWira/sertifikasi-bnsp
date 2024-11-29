import { Router } from "express";
import { Request,Response } from "express";

import { createCategory, deleteCategory, getAllCategory, getCategory, updateCategory } from "../database/category";
import { Category } from "../types/category";
const categoryRouter = Router()


categoryRouter.get('/', async(req:Request,res:Response)=>{
const category = await getAllCategory()
res.send(category)
})

categoryRouter.post('/', async(req:Request<{},{},Category>,res:Response)=>{
    try {
    console.log(req.body)
    const category = await createCategory(req.body.nama_kategori, req.body.judul)
        
    res.send(category)
    } catch (error) {
        console.log(error)
    if (error instanceof Error && error.message.includes('Category already exists')) {
        res.status(409).json({ error: 'Category already exists' });
    }
        
    }
    
})
categoryRouter.put('/', async(req:Request<{},{},Category>,res:Response)=>{
    const category = await updateCategory(req.body.nama_kategori,req.body.id, req.body.judul)
    res.send(category)  
     })

// categoryRouter.delete('/', async(req:Request<{},{},Category>,res:Response)=>{
//     const category = await deleteCategory(req.body.id)
//     res.send(category)
// })

categoryRouter.get('/:id', async(req:Request<{id:number}>,res:Response)=>{
const category = await getCategory(req.params.id)
res.send(category)
})
categoryRouter.delete('/:id', async(req:Request<{id:number}>,res:Response)=>{
    try {
    const category = await deleteCategory(req.params.id)
    res.send(category)
        
    } catch (error) {
        console.log(error)
    if (error instanceof Error && error.message.includes('Category still in Relation')) {
        res.status(403).json({ error: 'Category already still in Relation' });
    }
        
    }
})


export default categoryRouter