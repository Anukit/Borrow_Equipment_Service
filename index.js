const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();

var server = app.listen(3000, function () {
  console.log("Ready on port %d", server.address().port);
});

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//require routes
var CheckAPI = require("./routers/CheckAPI");
var Register = require("./routers/Register");
var UploadFiles = require("./routers/UploadFiles");
var Login = require("./routers/Login");
var EditData = require("./routers/EditData");
var DeleteData = require("./routers/DeleteData");
var GetData = require("./routers/GetData");
var Borrowing = require("./routers/Borrowing");
var Reverting = require("./routers/Reverting");
var Search = require("./routers/Search");

//use routes
app.use("/", CheckAPI);
app.use("/Register", Register);
app.use("/UploadFiles", UploadFiles);
app.use("/Login", Login);
app.use("/EditData", EditData);
app.use("/DeleteData", DeleteData);
app.use("/GetData", GetData);
app.use("/Borrowing", Borrowing);
app.use("/Reverting", Reverting);
app.use("/Search", Search);

app.use(express.static("uploads")); //สำหรับโชว์รูปภาพใน service
