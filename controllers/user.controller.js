/** @format */
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const db = require("../db");

module.exports.index = async (req, res) => {
  try {
    const user = await User.find({});
    res.render("users/index", {
      users: user,
    });
  } catch (error) {
    res.json("Error has occurred", err);
  }
};

module.exports.search = async (req, res) => {
  try {
    let query = req.query.query;
    let users = await User.find({});

    let userFiltered = users.filter((user) => {
      return user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    res.render("users/index", { users: userFiltered, query: query }); //pagination this too (feature)
  } catch (error) {
    res.json(error); //pagination this too (feature)
  }
};

module.exports.create = (req, res) => {
  res.render("users/create");
};

module.exports.postCreate = async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    isAdmin: true,
  });

  try {
    await newUser.save();
    res.redirect("/users");
  } catch (error) {
    res.json("/users");
  }
};

module.exports.delete = async (req, res) => {
  try {
    await User.remove({ _id: req.params.id });
    res.redirect("/users");
  } catch (error) {
    res.json(error);
  }
};

module.exports.update = async (req, res) => {
  //const user = db.get("users").find({ id: req.params.id }).value();
  try {
    let user = await User.findById({ _id: req.params.id });
    res.render("users/update", { user: user });
  } catch (error) {
    res.json(error);
  }
};

module.exports.postUpdate = async (req, res) => {
  if (!req.body.name) {
    res.render("users/update", { id: req.body.id, name: req.body.name });
    return;
  }

  try {
    await User.updateOne(
      { _id: req.body.id },
      { $set: { name: req.body.name } }
    );
    console.log("Document is successfully updated.");
    res.redirect("/users");
  } catch (error) {
    console.log(`Error has occurred: ${error}`);
    res.json(error);
  }
};
