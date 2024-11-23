import { Router } from "express";
import { Request,Response } from "express";

import { createLetter, getAllLetter, getLetter } from "../database/letter";
import { Letter } from "../types/letter";
import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const fileFilter = (req:Request, file:any, cb:any) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only PDF files are allowed!'), false); // Reject the file
  }
};

const upload = multer({ storage: storage,fileFilter:fileFilter }).single('file');
const letterRouter = Router()

letterRouter.post('/',upload, async(req:Request<{},{},Letter>,res:Response)=>{

    const fileName = `/${req.file!.filename}`
    console.log( fileName)
    const category = await createLetter(req.body.nomor_surat,req.body.id_kategori ,req.body.judul,fileName)

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