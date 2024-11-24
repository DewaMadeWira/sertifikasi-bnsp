import { Router } from "express";
import { Request,Response } from "express";
import path from 'path';
import { createLetter, getAllLetter, getLetter } from "../database/letter";
import { Letter } from "../types/letter";
import multer from 'multer';

const letterRouter = Router()
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

letterRouter.post('/',upload, async(req:Request<{},{},Letter>,res:Response)=>{

    const filePath = path.join(__dirname,'..',`..`, 'uploads', `${req.file!.filename}`); 
    console.log(filePath)
    const letter = await createLetter(req.body.nomor_surat,req.body.id_kategori ,req.body.judul,filePath)

    res.send(letter)
})

letterRouter.get('/', async(req:Request<{},{},Letter>,res:Response)=>{
    const letter = await getAllLetter()
    res.send(letter)
})
letterRouter.get('/pdf/:id', async(req:Request<{id:number}>,res:Response)=>{
    // res.send("ok")

    const letter = await getLetter(req.params.id)
    const filePath = letter.file_pdf; 
    const fileName = filePath.split('\\').pop();
    console.log(fileName)
     res.setHeader('Content-Type', 'application/pdf');

    res.sendFile(filePath,{headers: { 'Content-Disposition': `attachment; filename="${fileName}"` }} ,(err) => {
        if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Failed to serve file');
        }
    });
    //  res.download(filePath, fileName?.toString);
})
letterRouter.get('/:id', async(req:Request<{id:number}>,res:Response)=>{
    const letter = await getLetter(req.params.id)
    res.send(letter)
})

export default letterRouter