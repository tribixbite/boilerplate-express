var express = require('express');
var app = express();


app.use(function middleware(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

console.log("Hello World");
pubPath = __dirname + "/public";
indexPath = __dirname + "/views/index.html";
app.use("/public", express.static(pubPath));
jsonMessage = "Hello json";

app.get("/now", function(req, res, next){
  req.time = new Date().toString();
  next();
  }, function(req, res){
    res.json({time: req.time});
  });
app.get("/test", function(req, res) {
  //res.send("Hello Express")
  res.sendFile(indexPath);
  if (process.env.MESSAGE_STYLE == "uppercase") {
    jsonMessage = jsonMessage.toUpperCase();
  };
  //res.json({ message: jsonMessage });
});





 module.exports = app;
