const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const handleSuccess = require("./utils/handleSuccess");
const handleError = require("./utils/handleError");

//router引入
const postsRouter = require("./routes/post");
const usersRouter = require("./routes/user");
//mongodb引入
require("./connections");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.use((err, req, res, next) => {
  handleError(res, err.message || "內部服務器錯誤");
});

module.exports = app;
