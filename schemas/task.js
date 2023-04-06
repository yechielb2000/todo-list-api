const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

module.exports = mongoose.model(
  "Task",
  mongoose.Schema({
    title: String,
    task: String,
    created_at: String,
    start_date: String,
    end_date: String,
    done: Boolean,
    assignees: [ObjectId]
  }, {
    timestamps: true
  }),
  "tasks"
);
