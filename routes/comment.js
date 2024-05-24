const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comment");
const { authenticateJwtToken } = require("../middlewares/auth");


// Create a new comment
router.post("/createComment", authenticateJwtToken, CommentsController.createComment);

// Get all comments for an article
router.get("/getAllComment/:articleId", CommentsController.getAllCommentsForArticle);

// Delete a comment by id
router.delete("/deleteComment/:id", authenticateJwtToken, CommentsController.deleteCommentById);

module.exports = router;
