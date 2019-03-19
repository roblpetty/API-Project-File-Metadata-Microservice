'use strict';

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const URLHandler = require('./controller/urlHandler.js');

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
   res.sendFile(process.cwd() + '/views/index.html');
});

const upload = multer();

app.post("/api/fileanalyse", upload.single('upfile'), (req, res) => {
    if(req.file) {
    res.json({
      "name": req.file.originalname, 
      "type": req.file.mimetype, 
      "size": req.file.size
    });          
  } else {
  res.send('file must be selected');}
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
