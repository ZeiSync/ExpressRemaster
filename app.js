/** @format */
require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/express-remaster", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`MongoDB Connected…`);
  })
  .catch((err) => console.log(err));

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users.routes");
const authRouter = require("./routes/auth.routes");
const booksRouter = require("./routes/books.routes");
const cartRouter = require("./routes/cart.routes");
const transactionRouter = require("./routes/transaction.routes");

const middleware = require("./middleware/auth.middleware");
const sessionMiddleware = require("./middleware/session.middleware");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json()); //utilizes the body-parser package
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static(path.join(__dirname, "public")));
app.use(sessionMiddleware);

app.use("/", indexRouter);
app.use("/users", middleware.requireAuth, usersRouter);
app.use("/books", booksRouter);
app.use("/cart", cartRouter);
app.use("/transactions", middleware.requireAuth, transactionRouter);

app.use("/auth", authRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.use(express.static("public"));

module.exports = app;
