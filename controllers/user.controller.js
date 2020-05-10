/** @format */
const shortid = require("shortid");
const bcrypt = require("bcrypt");

const db = require("../db");

module.exports.index = (req, res) => {
  res.render("users/index", {
    data: res.paginatedResults,
  });
};

module.exports.search = (req, res) => {
  let query = req.query.q;
  let users = db.get("users").value();

  let userFilter = {};
  userFilter.results = users.filter((user) => {
    return user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  });

  console.log(userFilter);
  res.render("users/index", { data: userFilter, q: query }); //pagination this too (feature)
};

module.exports.create = (req, res) => {
  res.render("users/create");
};

module.exports.postCreate = (req, res) => {
  let data = {
    id: shortid.generate(),
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  };

  db.get("users").push(data).write();
  res.redirect("/users");
};

module.exports.delete = (req, res) => {
  let id = req.params.id;
  db.get("users").remove({ id: id }).write();
  res.redirect("/users");
};

module.exports.update = (req, res) => {
  const user = db.get("users").find({ id: req.params.id }).value();
  res.render("users/update", { user: user });
};

module.exports.postUpdate = (req, res) => {
  if (!req.body.name) {
    res.render("users/update", { id: req.body.id, name: req.body.name });
    return;
  }
  db.get("users")
    .find({ id: req.body.id })
    .assign({ name: req.body.name })
    .write();
  res.redirect("/users");
};
