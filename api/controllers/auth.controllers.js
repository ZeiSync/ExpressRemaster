/** @format */

const User = require("../../models/user.model");

module.exports.PostLogin = async (req, res, next) => {
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  res.json(user);
};
