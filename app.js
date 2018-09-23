var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var fileUpload = require('express-fileupload');
var app = express();
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

var server = app.listen(3001, function () {
    console.log("app running on port.", server.address().port);
});