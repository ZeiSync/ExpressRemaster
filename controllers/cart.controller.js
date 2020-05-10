/** @format */
const db = require("../db");

module.exports.addToCart = (req, res, next) => {
  let bookId = req.params.id;
  let sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect("/books");
    return;
  }

  let amout = db
    .get("sessions")
    .find({ id: sessionId })
    .get("cart." + bookId, 0);

  db.get("sessions")
    .find({ id: sessionId })
    .set("cart." + bookId, amout + 1)
    .write();

  res.redirect("/books");
};
