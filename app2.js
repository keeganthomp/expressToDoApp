const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const models = require("./models");
const port = 7500;

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

var toDoArray = [];
var doneArray = [];

app.use("/", express.static("./views"));

app.get("/", function(req, res) {
  models.todos
    .findAll()
    .then(function(todoList) {
      res.render("index", { todo: todoList });
      // console.log("todoList:", todoList);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});

app.post("/", function(req, res) {
  var myToDo = req.body.todo;
  console.log("req body:", req.body);
  console.log("myToDo:", myToDo);
  toDoArray.push(myToDo);
  var newTodo = models.todos.build({ title: myToDo });
  newTodo.save().then(function(saved) {
    res.redirect("/");

  });
});

app.post("/complete", function(req, res) {
  var clickedTodo = req.body.completed;
  doneArray.push(clickedTodo);
  var index = toDoArray.indexOf(clickedTodo);
  toDoArray.splice(index, 1);
  res.redirect("/");
});

app.listen(port, function(req, res) {
  console.log("You are up and runnning on", port);
});
