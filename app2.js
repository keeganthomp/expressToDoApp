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

app.use("/", express.static("./views"));

var toDoArray = [];
var doneArray = [];



app.get("/", function(req, res) {
  models.todos
    .findAll()
    .then(function(todoList) {
      res.render("index", { todo: todoList});
      // console.log("todoList:", todoList);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});



app.post("/", function(req, res) {
  var myToDo = req.body.todo;
  toDoArray.push(myToDo);
  var newTodo = models.todos.build({ title: myToDo });
  newTodo.save().then(function(saved) {
    res.redirect("/");
  });
});



app.post("/complete", function(req, res) {
  var clickedTodo = req.body.completed;
  var newCompletedTask = models.completed.build({ title: clickedTodo });
  newCompletedTask.save().then(function(completed) {
    res.redirect("/");
  });
  models.todos
    .destroy({ where: { title: clickedTodo } })
    .then(function() {
      res.redirect("/");
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
  var index = toDoArray.indexOf(clickedTodo);
  toDoArray.splice(index, 1);
});



app.listen(port, function(req, res) {
  console.log("You are up and runnning on", port);
});
