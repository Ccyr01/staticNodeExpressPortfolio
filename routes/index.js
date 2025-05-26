const express = require("express");
const router = express.Router();
const data = require("../data.json");

console.log(data);

router.get("/", function (req, res, next) {
  res.render("index", { projects: data.projects });
});
// router.get('/', (req, res) => {
//   console.log('Root route hit!');
//   res.send('Hello from root!');
// });

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/projects/:id", function (req, res, next) {
  const projectId = req.params.id;
  const project = data.projects.find(({ id }) => id === +projectId);
  console.log("project id" + projectId);
  if (project) {
    res.render("project", { project });
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
