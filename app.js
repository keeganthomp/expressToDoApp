const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const port = 7500;

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.listen(port, function(req, res){
    console.log("You are up and runnning on", port);
});

app.use("/", express.static("./views"));
