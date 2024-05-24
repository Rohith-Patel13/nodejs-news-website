const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments");
const { authenticateJwtToken } = require("../middleware/auth");

// Create a new comment
router.post("/create", authenticateJwtToken, CommentsController.createComment);

// Get all comments for an article
router.get("/getAll/:articleId", CommentsController.getAllCommentsForArticle);

// Delete a comment by id
router.delete("/delete/:id", authenticateJwtToken, CommentsController.deleteCommentById);

module.exports = router;
