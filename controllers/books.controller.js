/** @format */
const shortid = require("shortid");
const db = require("../db");

let books = db.get("books").value();

module.exports.index = (req, res) => {
  let user = { isAdmin: false };
  if (req.signedCookies.userId) {
    user = db.get("users").find({ id: req.signedCookies.userId }).value();
  }
  let quantity = req.signedCookies.quantity;
  res.render("books/index", {
    user: user,
    books: books,
    quantity: quantity,
  });
};

module.exports.search = (req, res) => {
  let q = req.query.q;
  let books = db.get("books").value();
  let bookFiltered = books.filter((book) => {
    return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });

  res.render("books/index", { books: bookFiltered, q: q });
};

module.exports.create = (req, res) => {
  res.render("books/create");
};

module.exports.postCreate = (req, res) => {
  let data = {
    id: shortid.generate(),
    title: req.body.title,
    description: req.body.description,
  };
  db.get("books").push(data).write();
  res.redirect("/books");
};

module.exports.delete = (req, res) => {
  let id = req.params.id;
  db.get("books").remove({ id: id }).write();
  res.redirect("/books");
};

module.exports.update = (req, res) => {
  res.render("books/update", { id: req.params.id });
};

module.exports.postUpdate = (req, res) => {
  if (!req.body.title) {
    res.render("books/update", { id: req.body.id, title: req.body.title });
    return;
  }

  db.get("books")
    .find({ id: req.body.id })
    .assign({ title: req.body.title })
    .write();
  res.render("books/index", { books: db.get("books").value() });
};