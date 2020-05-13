/** @format */

const mongoose = require("mongoose");
let transactionSchema = new mongoose.Schema({
  bookId: String,
  userId: String,
  isComplete: Boolean,
});

let Transaction = mongoose.model(
  "Transaction",
  transactionSchema,
  "transactions"
);

module.exports = Transaction;
