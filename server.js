const express = require('express') ;
const connectDB = require('./config/connectDB');
const app = express();
const helmet = require('helmet') ;
const morgan = require('morgan') ;
const multer =require('multer') ;
const path = require("path");
const cors = require("cors");

const port = process.env.Port || 5000 ;

connectDB()

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({storage: storage}) ;
app.post("/api/upload", upload.single("file"), (req, res) =>{
    try {
        return res.status(200).json("File uploaded successfully");

    }catch (error) {
        console.error(error);
    }
})

const authRoute = require('./route/auth');
const userRoute = require('./route/users') ;
const postRoute = require('./route/posts') ;






app.use('/images', express.static(path.join(__dirname, "public/images")));


app.use('/api/auth', authRoute) ;

app.use('/api/users', userRoute) ;

app.use('/api/posts', postRoute) ;

//Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
   //set static folder
   app.use(express.static('client/build'));

   app.get('*', (req, res) => {
       res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   })
}


app.listen(port, (err)=> {
    err ? console.log(err) : console.log(`The server is running on port ${port}`)
}) ;


























































