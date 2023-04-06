const mongoose = require("mongoose");

module.export = mongoose.model(
  "User",
  mongoose.Schema({
    name: String,
    username: String,
    password: String,
    created_at: String,
    tel: Number
  }, {
    timestamps: true
  }),
  "users"
);
