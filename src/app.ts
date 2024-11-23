import express, { Request,Response } from "express";
import categoryRouter from "./routes/category";
import letterRouter from "./routes/letter";
import multer from 'multer';
// 2

// 3

const app = express();  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3001;

app.get('/',(req,res)=>{
    res.send("mama mia ! lezato")
})


app.use("/api/category",categoryRouter)
app.use("/api/letter",letterRouter)

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './images');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

var upload = multer({ storage: storage }).single('file');



// const upload = multer({ dest: 'images/' })

app.post('/api/images', upload, (req:Request, res:Response) => {
  const imageName = req.file!.filename


  console.log( imageName)
  res.send({ imageName})
})


app.listen(PORT,()=>{
    console.log(`running at port ${PORT}`)
})