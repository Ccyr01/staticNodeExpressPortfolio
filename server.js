const express = require("express");
const data = require("./data.json");
const path = require("path");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static("public"));
app.use(express.json());
//import route module
const indexRouter = require("./routes/index");
//use route module
app.use("/", indexRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// 404 middleware
app.use((req, res, next) => {
  // Regex to detect requests for static assets
  const staticFilePattern =
    /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|map)$/i;

  if (!staticFilePattern.test(req.path)) {
    console.error(`404 Not Found: ${req.method} ${req.path}`);
  }

  res.status(404).render("page-not-found");
});

app.use((err, req, res, next) => {
  if (!err.status) {
    err.status = 500;
    err.message = "Something went wrong with server";
  }
  res.status(err.status);
  res.render("error", { error: err });
});

module.exports = app;
