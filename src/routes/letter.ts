import { Router } from "express";
import { Request,Response } from "express";

import { createLetter, getAllLetter, getLetter } from "../database/letter";
import { Letter } from "../types/letter";
const letterRouter = Router()

letterRouter.post('/', async(req:Request<{},{},Letter>,res:Response)=>{
    const category = await createLetter(req.body.nomor_surat,req.body.id_kategori ,req.body.judul)
    res.send(category)
})

letterRouter.get('/', async(req:Request<{},{},Letter>,res:Response)=>{
    const category = await getAllLetter()
    res.send(category)
})
letterRouter.get('/:id', async(req:Request<{id:number}>,res:Response)=>{
    const category = await getLetter(req.params.id)
    res.send(category)
})

export default letterRouter