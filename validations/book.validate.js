/** @format */

module.exports.postCreate = (req, res, next) => {
  let errors = [];

  if (!req.body.title) {
    errors.push("Title of book is require");
  }
  if (!req.body.description) {
    errors.push("This book this description too");
  }
  if (errors.length) {
    res.render("books/create", {
      title: req.body.title,
      description: req.body.description,
      errors: errors,
    });
    return;
  }

  next();
};
