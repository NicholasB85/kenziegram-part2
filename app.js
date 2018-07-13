const express = require("express");
const multer = require("multer");
const fs = require('fs');
const publicPath = "public/";
const port = 3000;
const app = express();
const uploadPath = "public/uploads/"
const pug = require("pug")

app.set('view engine', 'pug')
app.set("views", "./public/views")

app.use(express.static(publicPath));
app.use(express.static(uploadPath));
const upload = multer({
  dest: uploadPath
})

const uploadedFiles = [];


app.get('/', function (req, res) {
  const path = './public/uploads';
  
  fs.readdir(path, function (err, items) {
    console.log(items);
    
    // res.send(`${headerTemplate} <ul>${getPictures(items)} </ul> ` );
    res.render('index.pug',{
      images: items,

    })
    
  });
});

// function getPictures(items){
//   let result = "";
//   for (item of items){
//     result += `<li><img src="/uploads/${item}"</li>`

//   } 
//   return result
// }

app.post('/uploads', upload.single('myFile'), function (request, res, next) {
  // request.file is the `myFile` file
  // request.body will hold the text fields, if there were any
  console.log("Uploaded: " + request.file.filename);
  uploadedFiles.push(request.file.filename);
  res.render('upload.pug',{

  })
  // response.end(returnPage);
})

app.listen(port);

// const headerTemplate = `
// <html lang="en">

// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta http-equiv="X-UA-Compatible" content="ie=edge">
//     <link rel="stylesheet" href="/main.css">
//     <title>KenzieGram</title>
// </head>

// <body>
//     <h1>KenzieGram</h1>
//     <div>
//         <form action="/uploads" method="post" enctype="multipart/form-data">
//             <input class="btn" type="file" name="myFile" id="myFile">
//             <div class="uploadButton">
//             <button class="btn" type="submit">upload file</button>
//             </div>
//         </form>
//     </div>


// </body>

// </html>`

// const returnPage = `
// <html lang="en">

// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta http-equiv="X-UA-Compatible" content="ie=edge">
//     <link rel="stylesheet" href="/main.css">
//     <title>KenzieGram</title>
// </head>

// <body>
//     <h1>KenzieGram</h1>
//     <div>
//     <p>File Uploaded</p>
//             <a href="/"><button class="btn" type="submit">Back</button></a>
//             </div>
//     </div>

// </body>

// </html>`