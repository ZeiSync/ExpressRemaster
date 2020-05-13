/** @format */
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.postLogin = async (req, res) => {
  const user = User.findOne({ email: req.body.email });

  if (!user) {
    res.render("auth/login", {
      errors: ["I cant find you"],
      values: req.body,
    });
    return;
  }

  if (user.wrongLoginCount === 4) {
    res.render("auth/login", {
      errors: [
        "Wrong pass, and i will not check your password again and again ",
      ],
      values: req.body,
    });
    return;
  }
  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match) {
    user.wrongLoginCount += 1;
    res.render("auth/login", {
      errors: ["Wrong pass"],
      values: req.body,
    });
    return;
  }

  res.cookie("userId", user.id, {
    signed: true,
  });
  user.wrongLoginCount = 0;
  res.redirect("/");
};
