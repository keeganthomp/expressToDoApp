const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const port = 7500;

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

var toDoArray = [];
var tempArray = [];
var doneArray = [];

app.use("/", express.static("./views"));

app.get("/", function(req, res) {
  res.render("index", { todo: toDoArray, doneArray: doneArray });
});

app.post("/", function(req, res) {
  var todo = req.body;
  if (todo.todo != "") {
    toDoArray.push(todo);
  }
  res.redirect("/");
  // console.log(todo);
});

app.post("/complete", function(req, res) {
  clickedTodo = req.body;
  doneArray.push(clickedTodo);
  var index = toDoArray.indexOf(clickedTodo);
  toDoArray.splice(index, 1);
  res.redirect("/");
});

app.listen(port, function(req, res) {
  console.log("You are up and runnning on", port);
});
