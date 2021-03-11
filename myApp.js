var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonMessage = "Hello json";
var pubPath = __dirname + "/public";
var indexPath = __dirname + "/views/index.html";

app.use("/public", express.static(pubPath));
app.use(bodyParser.urlencoded({extended: false}));
app.use(function middleware(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

console.log("Hello World");



app.route('/name')
  .get(function(req,res){
    var { first: firstName, last: lastName } = req.query;
    res.json({name: `${firstName} ${lastName}`});
  })
  .post(function(req,res){
    //console.log(req.body);
    console.log('test');
    var names = req.body.first + " " + req.body.last;
    res.json({ name: names });
    //var { first: firstName, last: lastName } = req.body;
    //res.json({name: `${firstName} ${lastName}`});
  });

app.get("/:word/echo", function(req, res, next){
  res.json({echo: req.params.word});
});

app.get("/now", function(req, res, next){
  req.time = new Date().toString();
  next();
  }, function(req, res){
    res.json({time: req.time});
  });
app.get("/", function(req, res) {
  //res.send("Hello Express")
  console.log("hello");
  res.sendFile(indexPath);
  if (process.env.MESSAGE_STYLE == "uppercase") {
    jsonMessage = jsonMessage.toUpperCase();
  };
  //res.json({ message: jsonMessage });
});





 module.exports = app;
