const mongoose = require("mongoose");
const Todo = require("../models/todo.js");

// Get all Todo:
const getAllTodo = async (req, res, next) => {
  let todos;
  try {
    todos = await Todo.find().sort({ createdAt: -1 });
  } catch (error) {
    return console.log(error);
  }

  if (!todos) {
    return res
      .status(500)
      .json({ message: "Cannot fetch the todo's from database." });
  }

  return res.status(200).json(todos);
};

// Creating Todo:
const createTodo = async (req, res, next) => {
  const { todo, todoType } = req.body;

  if (!todo || !todoType) {
    return res.status(422).json({ message: "All fields are required." });
  }

  if (todo.trim() === "" || todoType.trim() === "") {
    return res.status(422).json({ message: "Please provide valid data." });
  }

  let existingTodo;
  try {
    existingTodo = await Todo.find({ todo: todo });
  } catch (error) {
    return console.log(error);
  }

  if (existingTodo.length > 0) {
    return res.status(500).json({ message: "Todo already exist." });
  }

  let newTodo;
  try {
    newTodo = new Todo({
      todo: todo,
      todoType: todoType,
    });

    newTodo = await newTodo.save();
  } catch (error) {
    return console.log(error);
  }

  if (!newTodo) {
    return res.status(500).json({ message: "Cannnot create the todo's." });
  }

  return res.status(201).json(newTodo);
};

// Updating Todo:
const updateTodo = async (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    return res.status(422).json({ message: "Please send the id of todo." });
  }

  const { todo, todoType } = req.body;

  if (!todo || !todoType) {
    return res.status(422).json({ message: "All fields are required." });
  }

  if (todo.trim() === "" || todoType.trim() === "") {
    return res.status(422).json({ message: "Please provide valid data." });
  }

  let updatedTodo;

  try {
    updatedTodo = await Todo.findByIdAndUpdate(id, {
      todo: todo,
      todoType: todoType,
    });
  } catch (error) {
    return console.log(error);
  }

  if (!updatedTodo) {
    return res.status(500).json({ message: "Unable to update the todo." });
  }

  return res.status(200).json({ message: "Updated successfully." });
};

// Deleting Todo:
const deleteTodo = async (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    return res.status(422).json({ message: "Please send the id of todo." });
  }

  let removeTodo;
  try {
    removeTodo = await Todo.findByIdAndRemove(id);
  } catch (error) {
    return console.log(error);
  }

  if (!removeTodo) {
    return res.status(500).json({ message: "Unable to delete todo." });
  }

  return res.status(200).json({ message: "Deleted successfully." });
};

// Getting a todo details:
const getSingleTodo = async (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    return res.status(422).json({ message: "Please send the id of todo." });
  }

  let todo;
  try {
    todo = await Todo.findById(id);
  } catch (error) {
    return console.log(error);
  }

  if (!todo) {
    return res.status(404).json({ message: "No todo found." });
  }

  return res.status(200).json({ todo });
};

module.exports = {
  createTodo,
  updateTodo,
  getAllTodo,
  deleteTodo,
  getSingleTodo,
};
