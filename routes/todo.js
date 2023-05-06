const express = require("express");

const router = express.Router();

const {
  createTodo,
  deleteTodo,
  updateTodo,
  getAllTodo,
  getSingleTodo,
} = require("../controllers/todo.js");

// GET Request to Get all Todo's:
router.get("/", getAllTodo);

// GET Request to Get single Todo using id:
router.get("/:id", getSingleTodo);

// POST Request to create Todo's:
router.post("/", createTodo);

// PUT Request to update Todo's:
router.put("/:id", updateTodo);

// DELETE Request to delete Todo's:
router.delete("/:id", deleteTodo);

module.exports = router;
