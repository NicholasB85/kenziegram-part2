const express = require("express");
const multer = require("multer");
const fs = require('fs');
const publicPath = "public/";
const port = 3000;
const app = express();
const uploadPath = "public/uploads/"
const pug = require("pug")
const path = './public/uploads';

app.set('view engine', 'pug')
app.set("views", "./public/views")

app.use(express.static(publicPath));
app.use(express.static(uploadPath));
app.use(express.json())

const upload = multer({
  dest: uploadPath
})

const uploadedFiles = [];


app.get('/', function (req, res) {

  fs.readdir(path, function (err, items) {

    console.log(items);

    res.render('index.pug', {
      images: items,

    })
  });
});

app.post('/latest', function (req, res) {
console.log(req)
  fs.readdir(path, function (err, items) {
    let feed = [];
    let serverTimeStamp = 0;
    for (let i = 0; i < items.length; i++) {
      var modified = fs.statSync(path, items[i]).mtimeMs;
      if (modified > req.body.after){
        feed.push(items[i])
      }
      if (modified > serverTimeStamp){
        serverTimeStamp = modified;
      }
      let latestResponse = {
        images: feed,
        timestamp: serverTimeStamp
      };
      res.send(latestResponse)
    };
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
  res.render('upload.pug', {

  })
  // response.end(returnPage);
})

app.listen(port);