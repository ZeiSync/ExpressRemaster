/** @format */

const Transaction = require("../../models/transaction.model");
module.exports.index = async (req, res, next) => {
  let transaction = await Transaction.find();
  res.json(transaction);
};
