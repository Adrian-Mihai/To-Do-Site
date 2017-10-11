const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const path = require("path");
const usefulFunction = require("./method/function");

const port = process.env.PORT || 8080;

const users = require("./routes/user");
const projects = require("./routes/project");
const tasks = require("./routes/task");

const app = express();

app.use(cookieParser("secret"));
app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/api", users);
app.use("/api", projects);
app.use("/api", tasks);

app.use(express.static(__dirname + "./user_profile_photo"));

http.createServer(app).listen(port);
