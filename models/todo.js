const mongoose = require("mongoose");

const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    todo: {
      type: String,
      required: true,
    },
    todoType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema, "todos");
