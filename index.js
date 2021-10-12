const express = require('express')
const multer  = require('multer')
const dotenv = require('dotenv')
const upload = multer({ dest: 'uploads/' })
const bodyParser = require('body-parser')
const cloudinary = require('cloudinary')
let port = process.env.PORT || 8080;
const app = express()

app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json())

app.get('/', (req, res) =>{
    res.send("<h1> Hello Rafa! </h1>");
})

app.post('/image', upload.single('image'), function (req, res, next) {
  console.log('We got the file')
  
  cloudinary.v2.uploader.upload(req.file.path,
    { public_id:  req.file.originalname, version: 1234567890}, //req.file.originalname
    function(error, result, version) { console.log(result) } //res.json({image: result.url })
  );

  cloudinary.v2.uploader.upload(`https://res.cloudinary.com/daxjqq0jt/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/${req.file.originalname}.jpg`,
    { public_id:  `${req.file.originalname} Edited`}, //req.file.originalname
    function(error, result) { res.json({image: result, error: error }) } //res.json({image: result.url })
  );

})


// Listen server
app.listen(port, ()=>{
    console.log("Server running on port "+port);
})

dotenv.config()
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});